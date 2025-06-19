"use client";

import React, { useMemo } from "react";

interface BudgetMeterProps {
  budget?: number; // 月の予算
  spent?: number; // 使用済み金額
  size?: number; // メーターサイズ
}

export const BudgetMeter: React.FC<BudgetMeterProps> = ({
  budget = 60000,
  spent = 15683,
  size = 220,
}) => {
  const safeBudget = typeof budget === "number" && budget > 0 ? budget : 1;
  const safeSpent = typeof spent === "number" && spent >= 0 ? spent : 0;

  const usageRatio = Math.min(safeSpent / safeBudget, 1);

  const { emoji, message, meterColor } = useMemo(() => {
    if (usageRatio < 0.5) {
      return {
        emoji: "😊",
        message: "上手に節約できています！",
        meterColor: "#5D4DB3",
      };
    } else if (usageRatio < 0.8) {
      return {
        emoji: "😐",
        message: "予算内で収まっています",
        meterColor: "#F5D742",
      };
    } else if (usageRatio < 1) {
      return {
        emoji: "😟",
        message: "予算に近づいています",
        meterColor: "#F5A142",
      };
    } else {
      return {
        emoji: "😠",
        message: "予算を超えています！",
        meterColor: "#E53E3E",
      };
    }
  }, [usageRatio]);

  const center = size / 2;
  const radius = size * 0.35;
  const strokeWidth = size * 0.06;
  const startAngle = -135;
  const endAngle = 135;

  const backgroundPath = describeArc(
    center,
    center,
    radius,
    startAngle,
    endAngle
  );

  const progressEndAngle = startAngle + (endAngle - startAngle) * usageRatio;
  const progressPath =
    usageRatio > 0
      ? describeArc(center, center, radius, startAngle, progressEndAngle)
      : "";

  const formattedSpent = safeSpent.toLocaleString();
  const formattedBudget = safeBudget.toLocaleString();

  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <h2 className="text-xl font-bold">節約メーター</h2>

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute top-0 left-0">
          <path
            d={backgroundPath}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>

        <svg width={size} height={size} className="absolute top-0 left-0">
          {progressPath && (
            <path
              d={progressPath}
              fill="none"
              stroke={meterColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          )}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl" style={{ color: meterColor }}>
              {emoji}
            </span>
          </div>
        </div>
      </div>

      <div className="text-2xl font-bold text-center mb-2">
        <span style={{ color: meterColor }}>{formattedSpent}円</span>
        <span className="text-gray-500 text-xl"> / {formattedBudget}円</span>
      </div>

      <p className="text-m mb-6 text-center">{message}</p>

      <button className="bg-gray-100 text-gray-800 px-8 py-4 rounded-full text-xl font-medium flex items-center">
        節約設定を変更 <span className="ml-2">›</span>
      </button>
    </div>
  );
};

// 円弧を描くSVGパスを生成
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  if (
    isNaN(start.x) ||
    isNaN(start.y) ||
    isNaN(end.x) ||
    isNaN(end.y) ||
    isNaN(radius)
  ) {
    return "";
  }

  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";

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

// 極座標 → デカルト座標変換
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
