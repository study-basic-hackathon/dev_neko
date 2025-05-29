import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import Layout from "@/components/common/Layout/Layout";

export const metadata: Metadata = {
  title: "でぶ猫のための家計簿",
  description: "猫ちゃんの家計簿アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
