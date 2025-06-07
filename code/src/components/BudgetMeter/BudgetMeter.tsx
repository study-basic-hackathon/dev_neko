"use client";

import React, { useMemo } from "react";

interface BudgetMeterProps {
  // 月の予算 (後でAPIから取得予定)
  budget?: number;
  // 現在使用した金額
  spent?: number;
  // コンポーネントのサイズ
  size?: number;
}

export const BudgetMeter: React.FC<BudgetMeterProps> = ({
  budget = 60000, // デフォルト予算: 60,000円
  spent = 15683, // デフォルト使用額: 15,683円
  size = 220, // デフォルトサイズ
}) => {
  // 使用率を計算 (0 ~ 1)
  const usageRatio = spent / budget;

  // 使用率に基づいて表示する絵文字とメッセージを決定
  const { emoji, message, meterColor } = useMemo(() => {
    if (usageRatio < 0.5) {
      // 50%未満: 笑顔、青/紫色
      return {
        emoji: "😊",
        message: "上手に節約できています！",
        meterColor: "#5D4DB3", // 紫色
      };
    } else if (usageRatio < 0.8) {
      // 50%~80%: 普通の顔、黄色
      return {
        emoji: "😐",
        message: "予算内で収まっています",
        meterColor: "#F5D742", // 黄色
      };
    } else if (usageRatio < 1) {
      // 80%~100%: 心配顔、オレンジ
      return {
        emoji: "😟",
        message: "予算に近づいています",
        meterColor: "#F5A142", // オレンジ
      };
    } else {
      // 100%以上: 怒り顔、赤
      return {
        emoji: "😠",
        message: "予算を超えています！",
        meterColor: "#E53E3E", // 赤色
      };
    }
  }, [usageRatio]);

  // 円の中心座標
  const center = size / 2;
  // メーターの半径
  const radius = size * 0.35;
  // メーターの線の太さ
  const strokeWidth = size * 0.06;
  // メーターの開始角度 (-135度 = 左上から開始)
  const startAngle = -135 * (Math.PI / 180);
  // メーターの終了角度 (135度 = 右上で終了)
  const endAngle = 135 * (Math.PI / 180);
  // メーターの全体の角度
  const totalAngle = endAngle - startAngle;

  // 背景メーター（グレー）のパス
  const backgroundPath = describeArc(
    center,
    center,
    radius,
    startAngle * (180 / Math.PI),
    endAngle * (180 / Math.PI),
    strokeWidth
  );

  // 進捗メーターのパス（使用率に基づく）
  const progressAngle = startAngle + totalAngle * Math.min(usageRatio, 1);
  const progressPath = describeArc(
    center,
    center,
    radius,
    startAngle * (180 / Math.PI),
    progressAngle * (180 / Math.PI),
    strokeWidth
  );

  // 金額を3桁ごとにカンマ区切りでフォーマット
  const formattedSpent = spent.toLocaleString();
  const formattedBudget = budget.toLocaleString();

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <h2 className="text-xl font-bold">節約メーター</h2>

      <div className="relative" style={{ width: size, height: size }}>
        {/* 背景メーター（グレー） */}
        <svg width={size} height={size} className="absolute top-0 left-0">
          <path
            d={backgroundPath}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>

        {/* 進捗メーター */}
        <svg width={size} height={size} className="absolute top-0 left-0">
          <path
            d={progressPath}
            fill="none"
            stroke={meterColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>

        {/* 中央の絵文字 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl" style={{ color: meterColor }}>
              {emoji}
            </span>
          </div>
        </div>
      </div>

      {/* 金額表示 */}
      <div className="text-2xl font-bold text-center mb-2">
        <span style={{ color: meterColor }}>{formattedSpent}円</span>
        <span className="text-gray-500 text-xl"> / {formattedBudget}円</span>
      </div>

      {/* メッセージ */}
      <p className="text-m mb-6 text-center">{message}</p>

      {/* 設定変更ボタン */}
      <button className="bg-gray-100 text-gray-800 px-8 py-4 rounded-full text-xl font-medium flex items-center">
        節約設定を変更 <span className="ml-2">›</span>
      </button>
    </div>
  );
};

// SVGの円弧を描画するためのヘルパー関数
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  strokeWidth: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
}

// 極座標からデカルト座標への変換
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export default BudgetMeter;
