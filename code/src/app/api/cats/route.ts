import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM cats WHERE user_id = ?', [1]); // 仮ユーザーID 1
    return NextResponse.json(rows); // rows は cat_name などの情報が含まれる
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { 
        message: '猫情報の取得に失敗しました',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { catName, weight } = body;
    const userId = 1; // 仮ユーザー

    if (!catName && weight === undefined) {
      return NextResponse.json(
        { message: 'catName または weight が必要です' }, 
        { status: 400 }
      );
    }

    if (catName) {
      await db.query('UPDATE cats SET cat_name = ?, accessed_at = NOW() WHERE user_id = ?', [catName, userId]);
    }

    if (weight !== undefined) {
      await db.query('UPDATE cats SET weight = ?, accessed_at = NOW() WHERE user_id = ?', [weight, userId]);
    }

    return NextResponse.json({ message: '更新完了！' });
  } catch (error) {
    console.error('Database update error:', error);
    return NextResponse.json(
      { 
        message: '更新失敗',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      }, 
      { status: 500 }
    );
  }
}
