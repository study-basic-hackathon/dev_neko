'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [catName, setCatName] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatName = async () => {
      try {
        const res = await fetch('/api/cats');
        const data = await res.json();

        if (res.ok && data.length > 0 && data[0].cat_name) {
          setCatName(data[0].cat_name);
        } else {
          alert('猫の名前がまだ設定されていません。設定ページから登録してください。');
        }
      } catch (error) {
        console.error('猫の名前の取得に失敗しました:', error);
        alert('猫の名前の取得に失敗しました。');
      }
    };

    fetchCatName();
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Cat Section */}
      <div className='bg-lavender-light py-16 px-8'>
        <div className='max-w-4xl mx-auto flex flex-col items-center'>
          <div className='flex items-center gap-8'>
            <div className='cat-silhouette' style={{ width: '200px', height: '200px' }}></div>
            <div className='text-left'>
              <h2 className='text-2xl font-bold mb-2'>{catName ? catName : '名前なし'}</h2>
              <p className='text-gray-600'>体重：〇〇g</p>
              <p className='text-gray-600'>出会ってから：〇日目</p>
            </div>
          </div>
        </div>
      </div>

      {/* 以下略 */}
    </div>
  );
}
