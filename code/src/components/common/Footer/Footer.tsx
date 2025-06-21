import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-lavender-light mt-auto md:ml-64">
      <div className="flex items-center justify-end py-6 px-8">
        {/* Cat Silhouette */}
        <div className="relative w-[80px] h-[80px]">
          <Image
            src={"/default.png"}
            alt="Cat"
            fill
            className="object-contain"
            sizes="80px"
          />
        </div>
      </div>
      <div className="flex space-x-6 bg-white py-1 px-4 justify-end">
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
    </footer>
  );
};

export default Footer;
