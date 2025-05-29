"use client";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cat Section */}
      <div className="bg-lavender-light py-16 px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-start gap-8 mb-8">
            <div
              className="cat-silhouette"
              style={{ width: "200px", height: "200px" }}
            ></div>
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2">〇〇</h2>
              <p className="text-gray-600">体重：〇〇g</p>
              <p className="text-gray-600">出会ってから：〇日目</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white py-12 px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Summary Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-8">家計簿サマリー</h2>

            {/* Month Navigation */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button className="text-2xl px-2 text-gray-400">‹</button>
              <span className="text-lg font-semibold">2025年 5月</span>
              <button className="text-2xl px-2 text-gray-400">›</button>
            </div>

            {/* Chart and Legend */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6 relative">
                <div className="text-center">
                  <div className="text-sm text-gray-500">2025年 5月</div>
                  <div className="text-2xl font-bold">15,683円</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    家賃
                  </span>
                  <span>2.3K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
                    交際費
                  </span>
                  <span>19.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                    趣味
                  </span>
                  <span>5.5K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                    食費
                  </span>
                  <span>53K</span>
                </div>
              </div>
            </div>

            <button className="btn-secondary">詳細を確認する</button>
          </div>

          {/* Manual Entry Section */}
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-6">レシート手動記録</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <input className="input-field" placeholder="品目名" />
                <input className="input-field" placeholder="カテゴリ" />
                <input className="input-field" placeholder="買い物場所" />
              </div>
              <textarea
                className="input-field min-h-[100px]"
                placeholder="何かメモしたいこと"
              />
              <div className="flex gap-4">
                <button className="btn-primary flex-1" type="submit">
                  レシートを記録
                </button>
                <button className="btn-secondary flex-1" type="button">
                  カメラで記録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
