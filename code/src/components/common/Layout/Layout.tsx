import type { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
