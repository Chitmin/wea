import { NextRequest, NextResponse } from "next/server";
import { find, generateMfaCode } from "@/stores/credentials";
import { encrypt } from "@/lib/utils";

export async function POST(request: NextRequest) {
  "use server";

  const { username, secureWord } = await request.json();

  try {
    const auth = await find(secureWord);
    const token = encrypt(auth.username, auth.secureWord);

    generateMfaCode(username);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    let message = "Server Error";
    let status = 500;

    if (error instanceof Error) {
      message = error.message;
      status = 400;
    }
    return NextResponse.json({ message }, { status });
  }
}
