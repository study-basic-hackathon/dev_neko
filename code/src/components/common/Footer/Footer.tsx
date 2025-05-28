import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 px-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            href="/terms"
            className="text-gray-500 hover:text-primary-500 transition-colors"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="text-gray-500 hover:text-primary-500 transition-colors"
          >
            プライバシーポリシー
          </Link>
        </div>

        {/* 猫のイラストは後で差し替え */}
        <div className="w-16 h-16 relative">
          <Image
            src="/images/cat-silhouette.png"
            alt="猫のシルエット"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
