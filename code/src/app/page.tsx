"use client";

import CircularGraph, {
  ExpenseCategory,
} from "@/components/CircularGraph/CircularGraph";

export default function Home() {
  // サンプルデータ（画像に合わせて調整）
  const categories: ExpenseCategory[] = [
    { id: "1", name: "家賃", amount: 2300, color: "#4169e1" }, // 青
    { id: "2", name: "交際費", amount: 19200, color: "#f5a9a9" }, // ピンク
    { id: "3", name: "趣味", amount: 5500, color: "#f5a142" }, // オレンジ
    { id: "4", name: "食費", amount: 53000, color: "#f5d742" }, // 黄色
  ];

  // 合計金額を計算
  const totalAmount = categories.reduce(
    (sum, category) => sum + category.amount,
    0
  );

  // 金額を単位付きでフォーマットする関数
  const formatAmountWithUnit = (amount: number) => {
    if (amount >= 10000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return `${amount.toLocaleString()}`;
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Cat Section */}
      <div className="bg-lavender-light py-16 px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-8">
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
      <div className="flex-1 bg-white pt-12 px-8 py-18">
        <div className="max-w-4xl mx-auto">
          {/* Summary Section */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">家計簿サマリー</h2>

            {/* Month Navigation */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button className="text-2xl px-2 text-gray-400">‹</button>
              <span className="text-lg font-semibold">2025年 5月</span>
              <button className="text-2xl px-2 text-gray-400">›</button>
            </div>

            {/* Chart and Legend */}
            <div className="flex items-center gap-8 mb-8">
              <CircularGraph
                size={192}
                categories={categories}
                totalAmount={totalAmount}
                date={{ year: 2025, month: 5 }}
              />

              <div className="flex flex-col text-sm flex-auto">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between border-b-1 border-solid border-lavender-light py-4"
                  >
                    <span className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      {category.name}
                    </span>
                    <span>{formatAmountWithUnit(category.amount)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-secondary">詳細を確認する</button>
          </div>

          {/* Manual Entry Section */}
          <div className="max-w-2xl mx-auto top-border">
            <h2 className="text-xl font-bold mb-6 text-center">
              レシート手動記録
            </h2>
            <form className="">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <input
                  className="input-field col-span-2"
                  placeholder="品目名"
                />
                <input className="input-field" placeholder="カテゴリ" />
                <input className="input-field" placeholder="買い物場所" />
                <textarea
                  className="input-field min-h-[100px] col-span-2"
                  placeholder="何かメモしたいこと"
                />
              </div>
              <div className="flex flex-col items-center gap-4">
                <button className="btn-primary" type="submit">
                  レシートを記録
                </button>
                <button className="btn-secondary" type="button">
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
