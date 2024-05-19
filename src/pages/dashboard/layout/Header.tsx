import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b  border-gray-200 bg-white hover:bg-[#F7F7F7] ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden "
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="/" className="ms-2 flex md:me-24">
              <img
                src="https://ccpmfiguig.ma/assets/A-PRIM-qdR7wAJ4.png"
                className="me-3 h-8"
                alt="Maison Médicale Jubilé"
              />
              <span className="invisible self-center whitespace-nowrap rounded-lg text-sm font-medium   sm:visible sm:text-2xl  ">
                <span className="text-primaryColor">PRIM</span> Tableau de bord
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="transition duration-300 hover:-translate-y-1 hover:scale-110 hover:ease-out">
              <img
                className="h-10 w-10 rounded-full"
                src="https://xsgames.co/randomusers/avatar.php?g=male"
                alt="Rounded avatar"
              />
            </div>
            <button className="transition duration-300 hover:-translate-y-1 hover:scale-110 hover:ease-out">
              <Dropdown
                label=""
                renderTrigger={() => (
                  <svg
                    className="me-2.5 h-3 w-3"
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
                  <span className="block text-sm">Admin</span>
                  <span className="block truncate text-sm font-medium">
                    admin@fcpo.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link to={"/dashboard"}>Tableau de bord</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={"settings"}>Settings</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
