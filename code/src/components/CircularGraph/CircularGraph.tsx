"use client";

import React from "react";

// 円グラフのデータ型定義
export type ExpenseCategory = {
  id: string;
  name: string;
  amount: number;
  color: string;
};

// デフォルトのカテゴリーデータ
export const defaultCategories: ExpenseCategory[] = [
  { id: "1", name: "家賃", amount: 0, color: "#4169e1" },
  { id: "2", name: "交際費", amount: 0, color: "#f5a9a9" },
  { id: "3", name: "趣味", amount: 0, color: "#f5a142" },
  { id: "4", name: "食費", amount: 0, color: "#f5d742" },
];

// プロップス定義
interface CircularGraphProps {
  size?: number;
  date?: {
    year: number;
    month: number;
  };
  totalAmount?: number;
  categories?: ExpenseCategory[];
}

export const CircularGraph: React.FC<CircularGraphProps> = ({
  size = 192,
  date = { year: 2025, month: 5 },
  totalAmount = 0,
  categories = defaultCategories,
}) => {
  const center = size / 2;
  const radius = size * 0.4;
  const strokeWidth = size * 0.06;
  const gapAngle = 0.03; // 約1.7度

  const formattedAmount = totalAmount.toLocaleString();
  const total = categories.reduce(
    (sum, category) => sum + (category.amount || 0),
    0
  );

  // 円弧のSVGパスを生成する関数
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number
  ) => {
    const innerStartX = center + innerRadius * Math.cos(startAngle);
    const innerStartY = center + innerRadius * Math.sin(startAngle);
    const outerStartX = center + outerRadius * Math.cos(startAngle);
    const outerStartY = center + outerRadius * Math.sin(startAngle);
    const innerEndX = center + innerRadius * Math.cos(endAngle);
    const innerEndY = center + innerRadius * Math.sin(endAngle);
    const outerEndX = center + outerRadius * Math.cos(endAngle);
    const outerEndY = center + outerRadius * Math.sin(endAngle);
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return `
      M ${outerStartX} ${outerStartY}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
      L ${innerEndX} ${innerEndY}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
      Z
    `;
  };

  // 各セグメントを生成（totalが0の場合 NaN 回避）
  let currentAngle = -Math.PI / 2;
  const segments =
    total > 0
      ? categories.map((category) => {
          const safeAmount = Number(category.amount) || 0;
          const ratio = safeAmount / total;
          const sweepAngle = 2 * Math.PI * ratio - gapAngle;
          const startAngle = currentAngle + gapAngle / 2;
          const endAngle = startAngle + sweepAngle;
          currentAngle = endAngle + gapAngle / 2;

          const path = createArcPath(
            startAngle,
            endAngle,
            radius - strokeWidth / 2,
            radius + strokeWidth / 2
          );

          return {
            ...category,
            path,
          };
        })
      : [];

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center rounded-full bg-white"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((segment) => (
            <path
              key={segment.id}
              d={segment.path}
              fill={segment.color}
              stroke="none"
            />
          ))}
        </svg>

        <div className="absolute text-center">
          <div className="text-sm text-gray-500">
            {date.year}年 {date.month}月
          </div>
          <div className="text-2xl font-bold">{formattedAmount}円</div>
        </div>
      </div>

      {total === 0 && (
        <p className="text-xs text-gray-400 mt-2">支出データがありません</p>
      )}
    </div>
  );
};

export default CircularGraph;
