import { verifyMfa } from "@/stores/credentials";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  "use server";

  try {
    const { username, code } = await request.json();
    const verified = await verifyMfa(username, code);

    return verified
      ? NextResponse.json({ message: "Verified" }, { status: 200 })
      : NextResponse.json({ message: "Code did not match" }, { status: 400 });
  } catch (error) {
    let message = "Server Error";
    const status = 500;

    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status });
  }
}
