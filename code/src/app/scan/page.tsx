"use client";

import { useState } from "react";

export default function Receipts() {
  const [hasImage, setHasImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-12 pb-24">
      <h1 className="text-2xl font-bold">レシート記録</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Camera or Image */}
        <div className="flex-1">
          <div className="bg-gray-50 min-h-[400px] flex flex-col items-center justify-center rounded-lg">
            {!hasImage ? (
              <>
                <div className="w-24 h-24 border-4 border-gray-400 rounded-lg mb-6 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-gray-600 mb-8 text-center">
                  カメラを起動してレシートを読み取ります
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setHasImage(true)}
                >
                  レシートを記録
                </button>
              </>
            ) : (
              <>
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-4 border-gray-300">
                  <div className="text-4xl">🖼️</div>
                </div>
                <button
                  className="btn-primary"
                  onClick={() => setHasImage(false)}
                >
                  レシートを撮り直す
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right side: Receipt content */}
        {hasImage && (
          <div className="flex-1">
            <div className="card min-h-[400px] flex flex-col">
              {!isEdit ? (
                <>
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                      <span className="font-bold">食費</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      <span>〇〇スーパー</span>
                    </div>

                    <div className="">
                      <div className="flex justify-between items-center py-4 border-b-1 border-solid border-lavender-light">
                        <div>
                          <div className="font-medium">スポーツドリンク</div>
                          <div className="text-sm text-gray-500">
                            〇〇コンビニ
                          </div>
                        </div>
                        <div className="font-medium">240円</div>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b-1 border-solid border-lavender-light">
                        <div>
                          <div className="font-medium">ハンバーガー</div>
                          <div className="text-sm text-gray-500">
                            〇〇ファストフード
                          </div>
                        </div>
                        <div className="font-medium">300円</div>
                      </div>
                      <div className="flex justify-between items-center py-4 border-b-1 border-solid border-lavender-light">
                        <div>
                          <div className="font-medium">ハンバーガー</div>
                          <div className="text-sm text-gray-500">
                            〇〇ファストフード
                          </div>
                        </div>
                        <div className="font-medium">300円</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button className="btn-primary flex-1">
                      レシートを記録する
                    </button>
                    <button
                      className="btn-secondary flex-1"
                      onClick={() => setIsEdit(true)}
                    >
                      レシートを修正する →
                    </button>
                  </div>
                </>
              ) : (
                <form className="space-y-6">
                  <div className="">
                    <div className="flex items-center mb-4">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                      <input className="input-field" defaultValue="食費" />
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                      <input
                        className="input-field"
                        defaultValue="〇〇スーパー"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input-field"
                      defaultValue="スポーツドリンク"
                    />
                    <input className="input-field" defaultValue="240円" />
                    <input
                      className="input-field col-span-2"
                      defaultValue="〇〇コンビニ"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input-field"
                      defaultValue="ハンバーガー"
                    />
                    <input className="input-field" defaultValue="300円" />
                    <input
                      className="input-field col-span-2"
                      defaultValue="〇〇ファストフード"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="input-field"
                      defaultValue="ハンバーガー"
                    />
                    <input className="input-field" defaultValue="300円" />
                    <input
                      className="input-field col-span-2"
                      defaultValue="〇〇ファストフード"
                    />
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
                      className="btn-secondary flex-1"
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
        )}
      </div>
    </div>
  );
}
