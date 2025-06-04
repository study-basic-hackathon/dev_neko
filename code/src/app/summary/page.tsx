"use client";

import {
  HiLocationMarker,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

export default function Expenses() {
  return (
    <div className="space-y-8 p-12 pb-24">
      <h1 className="text-2xl font-bold">家計簿</h1>

      {/* Month Navigation */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-center gap-4">
          <button className="text-2xl px-2 text-gray-400">
            <HiChevronLeft />
          </button>
          <span className="text-lg font-semibold">2025年 5月</span>
          <button className="text-2xl px-2 text-gray-400">
            <HiChevronRight />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side: Charts and Meter */}
        <div className="space-y-8 lg:w-64">
          {/* Pie Chart */}
          <div className="text-center">
            <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <div className="text-center">
                <div className="text-sm text-gray-500">2025年 5月</div>
                <div className="text-2xl font-bold">15,683円</div>
              </div>
            </div>

            <div className="text-sm">
              <div className="flex items-center justify-between border-b-1 border-solid border-lavender-light py-4">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  家賃
                </span>
                <span>2.3K</span>
              </div>
              <div className="flex items-center justify-between border-b-1 border-solid border-lavender-light py-4">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
                  交際費
                </span>
                <span>19.2K</span>
              </div>
              <div className="flex items-center justify-between border-b-1 border-solid border-lavender-light py-4">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                  趣味
                </span>
                <span>5.5K</span>
              </div>
              <div className="flex items-center justify-between border-b-1 border-solid border-lavender-light py-4">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  食費
                </span>
                <span>53K</span>
              </div>
            </div>
          </div>

          {/* Savings Meter */}
          <div className="text-center">
            <h3 className="font-bold mb-4">節約メーター</h3>
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">😊</span>
            </div>
            <div className="text-xl font-bold mb-2">15,683円 / 60000円</div>
            <div className="text-gray-600 text-sm mb-4">
              上手に節約できています！
            </div>
            <button className="btn-secondary">
              <span className="flex items-center justify-center">
                節約設定を変更 <HiArrowRight className="ml-1" />
              </span>
            </button>
          </div>
        </div>

        {/* Right side: Expense List */}
        <div className="lg:flex-auto">
          <div className="card h-full overflow-y-auto">
            <div className="space-y-8">
              {/* 交際費 */}
              <div className="border-b border-lavender-light pb-6">
                <div className="flex items-center mb-5">
                  <span className="w-3 h-3 bg-pink-400 rounded-full mr-2"></span>
                  <span className="font-bold">交際費</span>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                </div>
              </div>

              {/* 食費 */}
              <div className="border-b border-lavender-light pb-6">
                <div className="flex items-center mb-5">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                  <span className="font-bold">食費</span>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">スポーツドリンク</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇コンビニ
                      </div>
                    </div>
                    <div className="font-medium">240円</div>
                  </div>
                  <div className="flex justify-between items-cente">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                  <div className="flex justify-between items-cente">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                </div>
              </div>

              {/* 趣味 */}
              <div className="border-b border-lavender-light pb-6">
                <div className="flex items-center mb-5">
                  <span className="w-3 h-3 bg-orange-400 rounded-full mr-2"></span>
                  <span className="font-bold">趣味</span>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">ハンバーガー</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <HiLocationMarker className="text-gray-500 mr-1" />
                        〇〇ファストフード
                      </div>
                    </div>
                    <div className="font-medium">300円</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
