import { NextResponse } from "next/server";

export async function GET() {
  "use server";

  const transactions = [
    { date: "24 Aug 2003", id: 123, to: "John", type: "DuItNow", amount: 1000 },
    { date: "14 Aug 2003", id: 223, to: "Jane", type: "DuItNow", amount: 2000 },
    {
      date: "04 Aug 2003",
      id: 323,
      to: "Jones",
      type: "DuItNow",
      amount: 3000,
    },
  ];

  return NextResponse.json(transactions, { status: 200 });
}
