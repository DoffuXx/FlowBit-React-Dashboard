import { NavLink } from "react-router-dom";
import { FaAddressBook, FaBlog, FaHome, FaInbox } from "react-icons/fa";
import { RiFilePaperFill } from "react-icons/ri";

import { MdPermMedia } from "react-icons/md";
const navLinks = [
  { path: "/", icon: FaHome, text: "Tableau de bord" },
  { path: "/articles", icon: FaBlog, text: "Articles" },
  { path: "/discours", icon: RiFilePaperFill, text: "Discours" },
  { path: "/mediatheque", icon: MdPermMedia, text: "Mediatheque" },
  { path: "/coordonnées", icon: FaAddressBook, text: "Coordonnées" },
  { path: "/messages", icon: FaInbox, text: "Boîte de réception" },
];
const SideMenu = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-2 font-medium">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                end={link.path === "/dashboard"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group 
                 hover:scale-105 transform transition duration-500 ease-out 
                "
                style={({ isActive }) => ({
                  borderLeft: isActive
                    ? "2px solid rgba(31, 34, 65, 0.5)"
                    : "none",
                })}
              >
                <link.icon className="mr-2" />
                <span className="flex-1 ms-3 font-light whitespace-nowrap">
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
