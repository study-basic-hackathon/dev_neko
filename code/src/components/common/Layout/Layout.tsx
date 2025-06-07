import type { ReactNode } from "react";
import Sidebar, { sidebarMenuItems } from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header is only visible on mobile screens */}
      <Header menuItems={sidebarMenuItems} />

      <div className="flex flex-1 md:pt-0 pt-16">
        {/* Padding-top only on mobile for the fixed header */}
        {/* Sidebar is hidden on mobile */}
        <Sidebar />
        {/* Main content - adjust margin based on screen size */}
        <main className="flex-1 md:ml-64 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
