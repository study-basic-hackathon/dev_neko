'use client';

import { useState } from 'react';

export default function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('');
  const [catName, setCatName] = useState('');

  const submitEmailChange = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // emailだけ送る
    });
    const data = await res.json();
    if (res.ok) {
      alert('メールアドレスを更新しました！');
      setEmail(''); // 入力欄を空にする
    } else {
      alert(`エラー: ${data.message}`);
    }
  };

  return (
    <div className='p-12 pb-24'>
      <h1 className='text-2xl font-bold mb-8'>設定</h1>

      {/* User Settings */}
      <div className='space-y-6 mb-12'>
        <h2 className='text-lg font-bold'>ユーザー設定</h2>

        <div className='space-y-4'>
          <div className='flex items-center gap-4'>
            <label className='w-20 text-sm font-medium'>Email</label>
            <input
              className='input-field flex-1'
              type='email'
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className='btn-submit'
              onClick={submitEmailChange}
            >
              変更
            </button>
          </div>

          <div className='flex items-center gap-4'>
            <label className='w-20 text-sm font-medium'>パスワード</label>
            <input
              className='input-field flex-1'
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className='btn-submit'
              onClick={async () => {
                const res = await fetch('/api/users', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ password }), // passwordだけ送る
                });

                const data = await res.json();

                if (res.ok) {
                  alert('パスワードを更新しました！');
                  setPassword(''); // 入力欄を空にする
                } else {
                  alert(`エラー: ${data.message}`);
                }
              }}
            >
              変更
            </button>
          </div>
        </div>
      </div>

      {/* Savings Goal */}
      <div className='space-y-4 mb-12'>
        <h2 className='text-lg font-bold'>節約目標金額設定</h2>
        <p className='text-sm text-gray-600 leading-relaxed'>
          1ヶ月あたり幾らまで使っても良いかを設定します。
          <br />
          この設定値を超過すると猫がどんどんデブっていきます。
        </p>
        <div className='flex items-center gap-4'>
          <input
            className='input-field flex-1'
            placeholder='〇〇円'
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <button
            className='btn-submit'
            onClick={async () => {
              const res = await fetch('/api/cats', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ money: goal }), // ← goalをmoneyとして送信
              });

              const data = await res.json();

              if (res.ok) {
                alert('節約目標金額を更新しました！');
                setGoal('');
              } else {
                alert(`エラー: ${data.message}`);
              }
            }}
          >
            変更
          </button>
        </div>
      </div>

      {/* Cat Name */}
      <div className='space-y-4'>
        <h2 className='text-lg font-bold'>猫の名前</h2>
        <div className='flex items-center gap-4'>
          <input
            className='input-field flex-1'
            placeholder='でぶネコ'
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <button
            className='btn-submit'
            onClick={async () => {
              const res = await fetch('/api/cats', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ catName }),
              });

              const data = await res.json();

              if (res.ok) {
                alert('猫の名前を更新しました！');
                setCatName('');
              } else {
                alert(`エラー: ${data.message}`);
              }
            }}
          >
            変更
          </button>
        </div>
      </div>
    </div>
  );
}
