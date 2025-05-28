"use client";

import { useState } from "react";

export default function Settings() {
  // 仮の状態管理
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [catName, setCatName] = useState("");

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">設定</h1>
      {/* ユーザー設定 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-4">
        <h2 className="text-lg font-bold mb-4">ユーザー設定</h2>
        <form className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <label className="w-24">Email</label>
            <input
              className="input-field flex-1"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn-primary" type="button">
              Submit
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-24">パスワード</label>
            <input
              className="input-field flex-1"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-primary" type="button">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* 節約目標金額設定 */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-4">
        <h2 className="text-lg font-bold mb-4">節約目標金額設定</h2>
        <p className="text-sm text-gray-500 mb-2">
          1ヶ月あたり幾らまで使っても良いかを設定します。
          <br />
          この設定値を超過すると猫がどんどんデブっていきます。
        </p>
        <form className="flex gap-2 items-center">
          <input
            className="input-field flex-1"
            placeholder="〇〇円"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <button className="btn-primary" type="button">
            Submit
          </button>
        </form>
      </div>
      {/* 猫の名前設定 */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-lg font-bold mb-4">猫の名前</h2>
        <form className="flex gap-2 items-center">
          <input
            className="input-field flex-1"
            placeholder="でぶネコ"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
          />
          <button className="btn-primary" type="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
