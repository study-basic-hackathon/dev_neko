import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { catName, money } = body;
    const userId = 1; // 仮ユーザー

    if (catName) {
      await db.query('UPDATE cats SET cat_name = ? WHERE user_id = ?', [catName, userId]);
    }

    if (money) {
      await db.query('UPDATE cats SET money = ? WHERE user_id = ?', [money, userId]);
    }

    return NextResponse.json({ message: '更新完了！' });
  } catch (error) {
    console.error('🐱 エラー:', error);
    return NextResponse.json({ message: '更新失敗' }, { status: 500 });
  }
}
