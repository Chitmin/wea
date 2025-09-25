import { NextResponse, NextRequest } from "next/server";
import { encrypt } from "@/lib/utils";
import { checkRateLimit } from "@/lib/ratelimiter";

export interface GetSecureWordResponse {
  issuedAt: number;
  username: string;
  secureWord: string;
}

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
  const response: GetSecureWordResponse = {
    username,
    issuedAt,
    secureWord: encrypt(username, issuedAt.toString()),
  };

  return NextResponse.json(response, { status: 200 });
}
