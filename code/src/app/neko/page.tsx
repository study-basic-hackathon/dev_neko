"use client";

import { useState } from "react";

export default function Cat() {
  // 仮の状態管理
  const [catName, setCatName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [inputName, setInputName] = useState("");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCatName(inputName);
    setShowNameModal(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-gray-200">
      {/* 名前未設定時のポップアップ */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-80 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">猫の名前</h2>
            <form
              onSubmit={handleNameSubmit}
              className="w-full flex flex-col items-center"
            >
              <input
                className="input-field mb-4"
                placeholder="でぶネコ"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                required
              />
              <button className="btn-primary w-full" type="submit">
                名前を決定
              </button>
            </form>
          </div>
        </div>
      )}
      {/* 猫の様子 */}
      <div className="flex flex-col items-center w-full h-full">
        <div className="mt-16 mb-8 flex flex-col items-center">
          <div className="w-64 h-64 flex items-center justify-center mb-4">
            <span className="text-[200px] text-gray-500">🐱</span>
          </div>
          {/* 吹き出し */}
          <div className="bg-white rounded-lg shadow px-6 py-3 mb-4 text-center">
            <div className="font-bold text-lg mb-1">{catName || "〇〇"}</div>
            <div className="text-sm text-gray-500">
              にゃんにゃんにゃーん
              <br />
              (今日も昼まで寝るにゃん)
            </div>
          </div>
          <div className="text-gray-700 text-lg mt-2">体重：〇〇g</div>
          <div className="text-gray-700 text-lg">出会ってから：〇日目</div>
        </div>
      </div>
    </div>
  );
}
