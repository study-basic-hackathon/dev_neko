"use client";

import type React from "react";

import { useState } from "react";

export default function Cat() {
  const [catName, setCatName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [inputName, setInputName] = useState("");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCatName(inputName);
    setShowNameModal(false);
  };

  return (
    <div className="min-h-screen bg-lavender-light relative">
      {/* Name Modal */}
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

      {/* Cat Display */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        <div className="flex flex-col items-center">
          {/* Speech Bubble */}
          <div className="speech-bubble mb-8 text-center">
            <div className="font-bold text-lg mb-1">{catName || "〇〇"}</div>
            <div className="text-sm text-gray-600">
              にゃんにゃんにゃーん
              <br />
              (今日も昼まで寝るにゃん)
            </div>
          </div>

          {/* Cat Silhouette */}
          <div
            className="cat-silhouette mb-8"
            style={{ width: "300px", height: "300px" }}
          ></div>

          {/* Cat Stats */}
          <div className="text-center text-gray-700 space-y-2">
            <div className="text-lg">体重：〇〇g</div>
            <div className="text-lg">出会ってから：〇日目</div>
          </div>
        </div>
      </div>
    </div>
  );
}
