export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white relative">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">アカウントを作成</h2>
        <form className="w-full space-y-4">
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
        <div className="w-full flex items-center my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button
          className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg mb-2"
          disabled
        >
          <span className="mr-2">G</span> Githubで作成
        </button>
        <p className="text-xs text-gray-400 mt-2">
          続行をクリックすると、
          <a href="/terms" className="underline">
            利用規約
          </a>{" "}
          と{" "}
          <a href="/privacy" className="underline">
            プライバシーポリシー
          </a>{" "}
          に同意したことになります。
        </p>
      </div>
      <div className="absolute bottom-8 right-8">
        <span className="text-[120px] text-gray-400">🐱</span>
      </div>
    </div>
  );
}
