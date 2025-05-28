"use client";

import { useState } from "react";

export default function Receipts() {
  // 仮の状態管理（本来はstoreやAPI連携で管理）
  const [hasImage, setHasImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">レシート記録</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左側：カメラ or 画像 */}
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 min-h-[320px]">
          {!hasImage ? (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-[100px] text-gray-400 mb-4">📷</span>
                <div className="text-gray-500 mb-8">
                  カメラを起動してレシートを読み取ります
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setHasImage(true)}
                >
                  レシートを記録
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  {/* 仮の画像エリア */}
                  <span className="text-5xl">🖼️</span>
                </div>
                <button
                  className="btn-primary mb-2"
                  onClick={() => setHasImage(false)}
                >
                  レシートを撮り直す
                </button>
              </div>
            </>
          )}
        </div>
        {/* 右側：レシート内容リスト or 編集フォーム */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-8 flex flex-col justify-between">
          {!isEdit ? (
            <>
              <div>
                <div className="text-lg font-bold mb-4">食費</div>
                <div className="mb-2 text-gray-500">〇〇スーパー</div>
                <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                  <div>
                    スポーツドリンク
                    <br />
                    〇〇コンビニ
                  </div>
                  <div>240円</div>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                  <div>
                    ハンバーガー
                    <br />
                    〇〇ファストフード
                  </div>
                  <div>300円</div>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                  <div>
                    ハンバーガー
                    <br />
                    〇〇ファストフード
                  </div>
                  <div>300円</div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button className="btn-primary flex-1">
                  レシートを記録する
                </button>
                <button
                  className="bg-gray-200 text-gray-500 py-2 px-4 rounded-lg flex-1"
                  onClick={() => setIsEdit(true)}
                >
                  レシートを修正する
                </button>
              </div>
            </>
          ) : (
            <form className="space-y-4">
              <div className="flex gap-2">
                <input
                  className="input-field"
                  defaultValue="スポーツドリンク"
                />
                <input className="input-field" defaultValue="240円" />
              </div>
              <div className="flex gap-2">
                <input className="input-field" defaultValue="ハンバーガー" />
                <input className="input-field" defaultValue="300円" />
              </div>
              <div className="flex gap-2">
                <input className="input-field" defaultValue="ハンバーガー" />
                <input className="input-field" defaultValue="300円" />
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  className="btn-primary flex-1"
                  type="submit"
                  onClick={() => setIsEdit(false)}
                >
                  保存
                </button>
                <button
                  className="bg-gray-200 text-gray-500 py-2 px-4 rounded-lg flex-1"
                  type="button"
                  onClick={() => setIsEdit(false)}
                >
                  キャンセル
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
