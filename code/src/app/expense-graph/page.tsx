"use client";

import React from "react";
import CircularGraph, {
  ExpenseCategory,
} from "@/components/CircularGraph/CircularGraph";

export default function ExpenseGraphPage() {
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
      return `${(amount / 1000).toFixed(1)}円`;
    }
    return `${amount.toLocaleString()}円`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <CircularGraph
            size={240}
            categories={categories}
            totalAmount={totalAmount}
            date={{ year: 2025, month: 5 }}
          />
        </div>

        <div className="md:w-2/3">
          <div className="flex flex-col text-sm flex-auto">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between border-b border-solid border-gray-200 py-4"
              >
                <span className="flex items-center">
                  <span
                    className="w-3 h-3 bg-blue-500 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  ></span>
                  {category.name}
                </span>
                <span>{formatAmountWithUnit(category.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
