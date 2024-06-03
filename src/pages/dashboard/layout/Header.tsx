import { Dropdown } from "flowbite-react";
import { authService } from "@/redux/authService";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks } from "./menu";

const Header: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogOut = () => {
    authService.logout();
    navigate("/login");
  };
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      } else {
        return;
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  const auth = localStorage.getItem("auth") || sessionStorage.getItem("auth");
  const user = JSON.parse(auth!);
  return (
    <nav className="fixed top-0 z-50 w-full border-b  border-gray-200 bg-white hover:bg-[#F7F7F7] ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <nav ref={ref}>
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleMenu}
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden "
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-10 w-10"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {!isMenuOpen ? (
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  ) : (
                    <g transform="translate(-2 -2)">
                      <motion.path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M7 17L16.8995 7.10051 M7 7.00001L16.8995 16.8995"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        stroke="#6B7280"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      />
                    </g>
                  )}
                </svg>
              </button>
              {isMenuOpen && (
                <motion.ul
                  initial={{ x: -100, opacity: 0 }}
                  animate={{
                    x: isMenuOpen ? 0 : -100,
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={
                    "border-radius-2xl absolute left-0  top-full z-50 w-60 border border-gray-200 bg-white p-2 shadow-lg "
                  }
                >
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
                </motion.ul>
              )}
            </nav>
            <a href="/" className="ms-2 flex md:me-24">
              <img
                src="https://ccpmfiguig.ma/assets/A-PRIM-qdR7wAJ4.png"
                className="me-3 h-8                  transition duration-500 ease-out hover:scale-125 
"
                alt="PRIM"
              />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="transition duration-300 hover:-translate-y-1 hover:scale-110 hover:ease-out">
              <img
                className="h-10 w-20 rounded-full"
                src="https://www.akwacommunication.ma/img/logo.PNG"
                alt="Rounded avatar"
              />
            </div>
            <button className="transition duration-300  hover:scale-125 hover:ease-out">
              <Dropdown
                label=""
                renderTrigger={() => (
                  <svg
                    className="me-2.5 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
                    />
                  </svg>
                )}
              >
                <Dropdown.Header>
                  {" "}
                  <div>{user && user.user.username}</div>
                  <div className="truncate font-medium">
                    akwacommunication.ma
                  </div>
                </Dropdown.Header>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Tableau de bord
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    navigate("/settings");
                  }}
                >
                  Paramètres
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogOut}>
                  Se Déconnecter
                </Dropdown.Item>
              </Dropdown>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
