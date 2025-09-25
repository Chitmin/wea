import { NextResponse, NextRequest } from "next/server";
import { encrypt } from "@/lib/utils";
import { checkRateLimit } from "@/lib/ratelimiter";
import { type Auth, save } from "@/stores/credentials";

export async function POST(request: NextRequest) {
  "use server";

  const { username } = await request.json();

  if (!checkRateLimit(username)) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const issuedAt = Date.now();
  const response: Auth = {
    username,
    issuedAt,
    secureWord: encrypt(username, issuedAt.toString()),
  };

  await save(response);

  return NextResponse.json(response, { status: 200 });
}
