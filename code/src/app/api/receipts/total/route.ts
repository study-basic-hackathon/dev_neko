// app/api/receipts/total/route.ts
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type TotalRow = { total: number | null };

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT SUM(total_price) AS total FROM receipts"
    );
    const total = (rows as TotalRow[])[0]?.total ?? 0;

    return NextResponse.json({ total });
  } catch (error) {
    console.error("合計取得エラー:", error);
    return NextResponse.json({ total: 0 }, { status: 500 });
  }
}
