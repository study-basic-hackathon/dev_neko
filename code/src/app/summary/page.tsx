"use client";

import {
  HiLocationMarker,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import CircularGraph, {
  ExpenseCategory,
} from "@/components/CircularGraph/CircularGraph";

export default function Expenses() {
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
    <div className="space-y-8 p-12 pb-24">
      <h1 className="text-2xl font-bold">家計簿</h1>

      {/* Month Navigation */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-center gap-4">
          <button className="text-2xl px-2 text-gray-400">
            <HiChevronLeft />
          </button>
          <span className="text-lg font-semibold">2025年 5月</span>
          <button className="text-2xl px-2 text-gray-400">
            <HiChevronRight />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Charts and Meter */}
        <div className="space-y-8 lg:w-64">
          {/* Pie Chart */}
          <div className="text-center">
            <CircularGraph
              size={192}
              categories={categories}
              totalAmount={totalAmount}
              date={{ year: 2025, month: 5 }}
            />

            <div className="text-sm">
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

          {/* Savings Meter */}
          <div className="text-center">
            <h3 className="font-bold mb-4">節約メーター</h3>
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">😊</span>
            </div>
            <div className="text-xl font-bold mb-2">15,683円 / 60000円</div>
            <div className="text-gray-600 text-sm mb-4">
              上手に節約できています！
            </div>
            <button className="btn-secondary">
              <span className="flex items-center justify-center">
                節約設定を変更 <HiArrowRight className="ml-1" />
              </span>
            </button>
          </div>
        </div>

        {/* Right side: Expense List */}
        <div className="lg:flex-auto">
          <div className="card h-full overflow-y-auto">
            <div className="space-y-8">
              {/* 交際費 */}
              <div className="border-b border-lavender-light pb-6">
                <div className="flex items-center mb-5">
                  <span className="w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
                  <span className="font-bold">交際費</span>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                </div>
              </div>

              {/* 食費 */}
              <div className="border-b border-lavender-light pb-6">
                <div className="flex items-center mb-5">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  <span className="font-bold">食費</span>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">スポーツドリンク</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇コンビニ
                      </div>
                    </div>
                    <div className="font-medium">240円</div>
                  </div>
                  <div className="flex justify-between items-cente">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                  <div className="flex justify-between items-cente">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                </div>
              </div>

              {/* 趣味 */}
              <div className="border-b border-lavender-light pb-6">
                <div className="flex items-center mb-5">
                  <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                  <span className="font-bold">趣味</span>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
