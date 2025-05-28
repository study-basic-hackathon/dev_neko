"use client";

import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center mt-16">
        <div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center mb-4">
          {/* 仮の猫イラストエリア */}
          <span className="text-7xl">🐱</span>
        </div>
        <div className="text-xl font-bold mb-2">〇〇</div>
        <div className="text-gray-500 mb-8">
          体重：〇〇g
          <br />
          出会ってから：〇日目
        </div>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 mt-8">
        <h2 className="text-lg font-bold mb-4">家計簿サマリー</h2>
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            {/* 仮の円グラフエリア */}
            <span className="text-3xl text-gray-400">グラフ</span>
          </div>
          <div className="flex justify-between w-full mb-4">
            <div>家賃: 2.3K</div>
            <div>交際費: 19.2K</div>
            <div>趣味: 5.5K</div>
            <div>食費: 53K</div>
          </div>
          <button className="btn-primary w-full">詳細を確認する</button>
        </div>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 mt-8">
        <h2 className="text-lg font-bold mb-4">レシート手動記録</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input className="input-field" placeholder="品目名" />
            <input className="input-field" placeholder="カテゴリ" />
            <input className="input-field" placeholder="買い物場所" />
          </div>
          <textarea className="input-field" placeholder="何かメモしたいこと" />
          <div className="flex gap-4">
            <button className="btn-primary flex-1" type="submit">
              レシートを記録
            </button>
            <button className="btn-primary flex-1" type="button">
              カメラで記録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
