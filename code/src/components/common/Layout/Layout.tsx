import { ReactNode } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
