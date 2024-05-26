import { NavLink } from "react-router-dom";
import { navLinks } from "@/pages/dashboard/layout/menu";
const SideMenu = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 ">
        <ul className="space-y-2 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                end={link.path === "/dashboard"}
                className="group flex transform items-center rounded-lg p-2 text-gray-900 
                 transition duration-500 ease-out hover:scale-105 hover:bg-gray-100 
                "
                style={({ isActive }) => ({
                  borderLeft: isActive
                    ? "2px solid rgba(31, 34, 65, 0.5)"
                    : "none",
                })}
              >
                <link.icon className="mr-2" />
                <span className="ms-3 flex-1 whitespace-nowrap font-light">
                  {link.text}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideMenu;
