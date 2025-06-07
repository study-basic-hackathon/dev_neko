"use client";

import React from "react";

// 円グラフのデータ型定義
export type ExpenseCategory = {
  id: string;
  name: string;
  amount: number;
  color: string;
};

// コンポーネントのプロップス型定義
interface CircularGraphProps {
  // グラフのサイズ（幅と高さ）
  size?: number;
  // 表示する年月
  date?: {
    year: number;
    month: number;
  };
  // 合計金額
  totalAmount?: number;
  // カテゴリー別データ
  categories?: ExpenseCategory[];
}

export const CircularGraph: React.FC<CircularGraphProps> = ({
  size = 192, // デフォルトサイズは192px (w-48 h-48)
  date = { year: 2025, month: 5 },
  totalAmount = 15683,
  categories = [
    { id: "1", name: "家賃", amount: 2300, color: "#4169e1" }, // 青
    { id: "2", name: "交際費", amount: 19200, color: "#f5a9a9" }, // ピンク
    { id: "3", name: "趣味", amount: 5500, color: "#f5a142" }, // オレンジ
    { id: "4", name: "食費", amount: 53000, color: "#f5d742" }, // 黄色
  ],
}) => {
  // 円グラフの中心座標
  const center = size / 2;
  // 円グラフの半径
  const radius = size * 0.4;
  // 円グラフの線の太さ（細くする）
  const strokeWidth = size * 0.06;
  // セグメント間の隙間（角度）
  const gapAngle = 0.03; // ラジアン単位（約1.7度）

  // 合計金額をフォーマット（3桁ごとにカンマを追加）
  const formattedAmount = totalAmount.toLocaleString();

  // 各カテゴリーの合計を計算
  const total = categories.reduce((sum, category) => sum + category.amount, 0);

  // 円弧を描画するためのSVGパスを生成する関数
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number
  ) => {
    // 内側の円弧の開始点
    const innerStartX = center + innerRadius * Math.cos(startAngle);
    const innerStartY = center + innerRadius * Math.sin(startAngle);

    // 外側の円弧の開始点
    const outerStartX = center + outerRadius * Math.cos(startAngle);
    const outerStartY = center + outerRadius * Math.sin(startAngle);

    // 内側の円弧の終了点
    const innerEndX = center + innerRadius * Math.cos(endAngle);
    const innerEndY = center + innerRadius * Math.sin(endAngle);

    // 外側の円弧の終了点
    const outerEndX = center + outerRadius * Math.cos(endAngle);
    const outerEndY = center + outerRadius * Math.sin(endAngle);

    // 円弧の大きさフラグ（1 = 180度以上の円弧, 0 = 180度未満の円弧）
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    // SVGパスを構築
    return `
      M ${outerStartX} ${outerStartY}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}
      L ${innerEndX} ${innerEndY}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
      Z
    `;
  };

  // 各セグメントの角度を計算
  let currentAngle = -Math.PI / 2; // 12時の位置から開始（-90度）
  const segments = categories.map((category) => {
    // カテゴリーの割合を計算
    const ratio = category.amount / total;
    // セグメントの角度を計算（隙間を考慮）
    const sweepAngle = 2 * Math.PI * ratio - gapAngle;

    // 開始角度を保存
    const startAngle = currentAngle + gapAngle / 2;
    // 終了角度を計算
    const endAngle = startAngle + sweepAngle;

    // 次のセグメントの開始角度を更新
    currentAngle = endAngle + gapAngle / 2;

    // 円弧のパスを生成
    const path = createArcPath(
      startAngle,
      endAngle,
      radius - strokeWidth / 2,
      radius + strokeWidth / 2
    );

    return {
      ...category,
      ratio,
      startAngle,
      endAngle,
      path,
    };
  });

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
    </div>
  );
};

export default CircularGraph;
