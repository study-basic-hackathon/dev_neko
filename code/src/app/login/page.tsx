export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-text-black mb-2">
            でぶ猫のための家計簿
          </h1>
        </div>

        {/* Login Form */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">ログイン</h2>
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
              ログイン
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className=" flex flex-col items-center">
            <button className="btn-secondary w-full mb-4 flex items-center justify-center">
              <span className="mr-2 text-lg">G</span> Githubで作成
            </button>

            <button className="btn-secondary w-full flex items-center justify-center">
              アカウント作成 <span className="ml-2">→</span>
            </button>
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
