"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Define menu items outside the component so they can be exported
export const sidebarMenuItems = [
  { href: "/", label: "ホーム画面", icon: "🏠" },
  { href: "/summary", label: "家計簿", icon: "💰" },
  { href: "/scan", label: "レシート記録", icon: "📷" },
  { href: "/neko", label: "〇〇の様子", icon: "🐱" },
  { href: "/settings", label: "設定", icon: "⚙️" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block w-64 min-h-screen bg-white border-r border-gray-200 p-4 fixed top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-text-black">
          でぶ猫のための家計簿
        </h1>
      </div>

      <ul className="space-y-2">
        {sidebarMenuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-gray-200"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
