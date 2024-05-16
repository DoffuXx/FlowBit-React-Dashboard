import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./sideMenu";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="py-16 p-8  sm:ml-64">
        <Outlet />
      </main>
      <SideMenu />
    </div>
  );
};

export default Layout;
