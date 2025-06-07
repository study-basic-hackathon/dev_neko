import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ResultSetHeader } from 'mysql2';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 仮ユーザーID（本来はログインユーザーのIDを取得すべき）
    const userId = 1;

    if (email && !password) {
      await db.query('UPDATE users SET email = ? WHERE id = ?', [email, userId]);
      return NextResponse.json({ message: 'メールアドレス更新成功' });
    }

    if (password && !email) {
      await db.query('UPDATE users SET password = ? WHERE id = ?', [password, userId]);
      return NextResponse.json({ message: 'パスワード更新成功' });
    }

    if (email && password) {
      const [result] = await db.query<ResultSetHeader>('INSERT INTO users (email, password) VALUES (?, ?)', [
        email,
        password,
      ]);
      return NextResponse.json({ message: '新規登録成功', id: result.insertId });
    }

    return NextResponse.json({ message: '入力が不正です' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '登録失敗' }, { status: 500 });
  }
}
