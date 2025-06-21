"use client";

import { useEffect, useState } from "react";
import CircularGraph, {
  defaultCategories,
} from "@/components/CircularGraph/CircularGraph";

export default function Home() {
  const [catName, setCatName] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0); // DBの合計金額
  const [loading, setLoading] = useState<boolean>(true);

  // 猫の名前取得
  useEffect(() => {
    const fetchCatName = async () => {
      try {
        const res = await fetch("/api/cats");
        const data = await res.json();

        if (res.ok && data.length > 0 && data[0].cat_name) {
          setCatName(data[0].cat_name);
        } else {
          alert(
            "猫の名前がまだ設定されていません。設定ページから登録してください。"
          );
        }
      } catch (error) {
        console.error("猫の名前の取得に失敗しました:", error);
        alert("猫の名前の取得に失敗しました。");
      }
    };
    fetchCatName();
  }, []);

  // 合計金額取得（全レシート）
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch("/api/receipts/total");
        const data = await res.json();
        console.log("🎯 data from API:", data);

        const totalNum = Number(data.total); // ← ここで string → number に変換！
        if (res.ok && !isNaN(totalNum)) {
          setTotalPrice(totalNum); // ← 正しく反映される
        }
      } catch (error) {
        console.error("合計金額の取得エラー:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotal();
  }, []);

  // カテゴリー作成（食費にのみ反映）
  const expenseCategories = defaultCategories.map((category) =>
    category.name === "食費"
      ? { ...category, amount: totalPrice }
      : { ...category, amount: 0 }
  );

  const totalAmount = totalPrice;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cat Section */}
      <div className="bg-lavender-light py-16 px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-8">
            <img
              src={
                totalPrice >= 10000
                  ? "/cat2.png"
                  : totalPrice >= 5000
                  ? "/cat1.png"
                  : "/default.png"
              }
              alt="猫の画像"
              className="w-[200px] h-[200px] object-contain"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2">
                {catName ? catName : "名前なし"}
              </h2>
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
              {!loading && (
                <>
                  <CircularGraph
                    size={192}
                    categories={expenseCategories}
                    totalAmount={totalAmount}
                    date={{ year: 2025, month: 5 }}
                  />

                  <div className="flex flex-col text-sm flex-auto">
                    {expenseCategories.map((category) => (
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
                        <span>{category.amount.toLocaleString()}円</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
