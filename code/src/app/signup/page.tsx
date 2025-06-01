export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-text-black mb-2">
            でぶ猫のための家計簿
          </h1>
        </div>

        {/* Signup Form */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">
            アカウントを作成
          </h2>
          <form className="space-y-4 flex flex-col items-center">
            <input
              className="input-field"
              type="email"
              placeholder="email@domain.com"
            />
            <input
              className="input-field"
              type="password"
              placeholder="password"
            />
            <button className="btn-primary w-full" type="submit">
              サインアップ
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex flex-col items-center">
            <button className="btn-secondary w-full mb-6 flex items-center justify-center">
              <span className="mr-2 text-lg">G</span> Githubで作成
            </button>

            <p className="text-xs text-gray-500 text-center leading-relaxed">
              続行をクリックすると、
              <a href="/terms" className="text-primary-500 underline">
                利用規約
              </a>{" "}
              と{" "}
              <a href="/privacy" className="text-primary-500 underline">
                プライバシーポリシー
              </a>{" "}
              に同意したことになります。
            </p>
          </div>
        </div>
      </div>

      {/* Cat Silhouette */}
      <div className="absolute bottom-8 right-8">
        <div
          className="cat-silhouette"
          style={{ width: "150px", height: "150px" }}
        ></div>
      </div>
    </div>
  );
}
