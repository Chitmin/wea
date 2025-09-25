"use server";

import makeRedis from "@/lib/redis-factory";

export interface Auth {
  issuedAt: number;
  username: string;
  secureWord: string;
}

const redis = makeRedis();
const EXPIRES_IN = 60 * 1000; // 60 seconds

export async function save(auth: Auth) {
  await redis.set(auth.secureWord, JSON.stringify(auth));
}

export async function find(key: string) {
  const found = await redis.get(key);

  if (found === null) {
    throw new Error("Record not found.");
  }

  const auth = JSON.parse(found) as Auth;

  if (isExpires(auth)) {
    throw new Error("Record is expired.");
  }

  return auth;
}

function isExpires(auth: Auth) {
  return auth.issuedAt + EXPIRES_IN < Date.now();
}

export async function generateMfaCode(secret: string) {
  // const code = Math.floor(100000 + Math.random() * 900000);
  const code = "123456";

  await redis.set(
    `mfa-${secret}`,
    JSON.stringify({
      code,
      attempts: 0,
    })
  );

  return code;
}

export async function verifyMfa(username: string, otp: string) {
  const key = `mfa-${username}`;
  const found = await redis.get(key);

  if (!found) {
    throw new Error("MFA code not found.");
  }

  const { code, attempts } = JSON.parse(found) as {
    code: string;
    attempts: number;
  };

  if (attempts === 3) {
    throw new Error("Maximum attempts reached.");
  }

  await redis.set(key, JSON.stringify({ code, attempts: attempts + 1 }));

  return code === otp;
}
