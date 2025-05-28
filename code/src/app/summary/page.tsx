export default function Expenses() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold mb-2">家計簿</h1>
      {/* 月の切り替え */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button className="text-2xl px-2">&#60;</button>
        <span className="text-lg font-semibold">2025年 5月</span>
        <button className="text-2xl px-2">&#62;</button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左側：グラフ・カテゴリ・節約メーター */}
        <div className="flex-1 flex flex-col gap-8">
          {/* 円グラフエリア */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-gray-400">グラフ</span>
            </div>
            <ul className="w-full mt-2">
              <li className="flex justify-between py-1 text-sm text-blue-600">
                家賃 <span>2.3K</span>
              </li>
              <li className="flex justify-between py-1 text-sm text-pink-500">
                交際費 <span>19.2K</span>
              </li>
              <li className="flex justify-between py-1 text-sm text-orange-500">
                趣味 <span>5.5K</span>
              </li>
              <li className="flex justify-between py-1 text-sm text-yellow-500">
                食費 <span>53K</span>
              </li>
            </ul>
          </div>
          {/* 節約メーター */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-4xl text-primary-500">😊</span>
            </div>
            <div className="text-xl font-bold mb-1">15,683円 / 60,000円</div>
            <div className="text-gray-500 text-sm mb-2">
              上手に節約できています！
            </div>
            <button className="btn-primary w-full">節約設定を変更</button>
          </div>
        </div>
        {/* 右側：支出明細リスト */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[600px]">
          <div className="space-y-6">
            {/* 交際費 */}
            <div>
              <div className="flex items-center text-pink-500 font-bold mb-2">
                ● 交際費
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                <div>
                  ハンバーガー
                  <br />
                  〇〇ファストフード
                </div>
                <div>300円</div>
              </div>
            </div>
            {/* 食費 */}
            <div>
              <div className="flex items-center text-yellow-500 font-bold mb-2">
                ● 食費
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                <div>
                  スポーツドリンク
                  <br />
                  〇〇コンビニ
                </div>
                <div>240円</div>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                <div>
                  ハンバーガー
                  <br />
                  〇〇ファストフード
                </div>
                <div>300円</div>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                <div>
                  ハンバーガー
                  <br />
                  〇〇ファストフード
                </div>
                <div>300円</div>
              </div>
            </div>
            {/* 趣味 */}
            <div>
              <div className="flex items-center text-orange-500 font-bold mb-2">
                ● 趣味
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                <div>
                  ハンバーガー
                  <br />
                  〇〇ファストフード
                </div>
                <div>300円</div>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                <div>
                  ハンバーガー
                  <br />
                  〇〇ファストフード
                </div>
                <div>300円</div>
              </div>
              <div className="flex justify-between border-b border-gray-200 py-2 text-sm">
                <div>
                  ハンバーガー
                  <br />
                  〇〇ファストフード
                </div>
                <div>300円</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
