import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";

// 商品データ型
type ReceiptItem = {
  item_name: string;
  item_price: number;
  item_category: string;
};

// リクエストボディ型
type ReceiptRequest = {
  user_id?: number;
  address: string;
  total_price: number;
  items: ReceiptItem[];
  category: string; // レシート全体のカテゴリ
};

export async function POST(req: Request) {
  const body = (await req.json()) as ReceiptRequest;

  const {
    user_id = 1,
    address,
    total_price,
    items,
    category, // ← ここが必要！
  } = body;

  try {
    // 1. レシート本体を保存
    const [receiptResult] = await db.execute<ResultSetHeader>(
      `INSERT INTO receipts (user_id, adress, total_price, category, issued_at)
      VALUES (?, ?, ?, ?, NOW())`,
      [user_id, address, total_price, category]
    );

    const receiptId = receiptResult.insertId;
    const now = new Date();

    // 2. 商品一覧をバルク挿入（商品ごとのカテゴリも保存）
    const values = items.map((item, index) => [
      receiptId,
      index + 1,
      item.item_name,
      item.item_price,
      item.item_category,
      now,
      now,
    ]);

    await db.query(
      `INSERT INTO receipt_items (receipt_id, item_order, item_name, price, item_category, created_at, updated_at)
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
