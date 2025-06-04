"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderProps = {
  menuItems: Array<{
    href: string;
    label: string;
    icon: string;
  }>;
};

const Header = ({ menuItems }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="md:hidden bg-white border-b border-gray-200 fixed top-0 w-full z-10">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-text-black">
          でぶ猫のための家計簿
        </h1>

        {/* Hamburger button - only visible on mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-600 my-0.5 transition-transform ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 my-0.5 transition-opacity ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 my-0.5 transition-transform ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile menu - only visible when hamburger is clicked */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="py-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 transition-colors ${
                    pathname === item.href
                      ? "bg-gray-200"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
