import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";

// 商品データ型
type ReceiptItem = {
  item_name: string;
  item_price: number;
};

// リクエストボディ型
type ReceiptRequest = {
  user_id?: number;
  address: string;
  total_price: number;
  items: ReceiptItem[];
};

export async function POST(req: Request) {
  const body = (await req.json()) as ReceiptRequest;

  const {
    user_id = 1, // デフォルト: user_id = 1
    address,
    total_price,
    items,
  } = body;

  try {
    // 1. レシート本体の追加
    const [receiptResult] = await db.execute<ResultSetHeader>(
      `INSERT INTO receipts (user_id, adress, total_price, issued_at, created_at, updated_at)
      VALUES (?, ?, ?, NOW(), NOW(), NOW())`,
      [user_id, address, total_price]
    );

    const receiptId = receiptResult.insertId;

    // 2. 商品情報のバルク挿入
    const now = new Date();
    const values = items.map((item, index) => [
      receiptId,
      index + 1,
      item.item_name,
      item.item_price,
      now,
      now,
    ]);

    await db.query(
      `INSERT INTO receipt_items (receipt_id, item_order, item_name, price, created_at, updated_at)
      VALUES ?`,
      [values]
    );

    return NextResponse.json({ success: true, receiptId });
  } catch (error) {
    console.error("❌ DBエラー:", error);
    return NextResponse.json(
      { success: false, error: "DB登録に失敗しました" },
      { status: 500 }
    );
  }
}
