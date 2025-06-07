import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { catName } = body;

    if (!catName) {
      return NextResponse.json({ message: '猫の名前が未入力です' }, { status: 400 });
    }

    const userId = 1; // 仮のユーザーID

    await db.query('UPDATE cats SET cat_name = ? WHERE user_id = ?', [catName, userId]);

    return NextResponse.json({ message: '猫の名前を更新しました！' });
  } catch (error) {
    console.error('🐱 エラー:', error);
    return NextResponse.json({ message: '更新失敗' }, { status: 500 });
  }
}
