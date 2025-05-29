import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-lavender-light py-6 px-8 mt-auto">
      <div className="flex justify-between items-center">
        <div className="flex space-x-6">
          <Link
            href="/terms"
            className="text-gray-600 hover:text-primary-500 transition-colors text-sm"
          >
            利用規約 →
          </Link>
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-primary-500 transition-colors text-sm"
          >
            プライバシーポリシー →
          </Link>
        </div>

        {/* Cat Silhouette */}
        <div
          className="cat-silhouette"
          style={{ width: "80px", height: "80px" }}
        ></div>
      </div>
    </footer>
  );
};

export default Footer;
