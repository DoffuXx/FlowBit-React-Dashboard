import { Outlet } from "react-router-dom";
import SideMenu from "./sideMenu";
import Header from "./Header";
import { ProgressProvider } from "@/provider/ProgressProvider";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="p-8 py-16  sm:ml-64">
        <ProgressProvider>
          <Outlet />
        </ProgressProvider>
      </main>
      <SideMenu />
    </div>
  );
};

export default Layout;
