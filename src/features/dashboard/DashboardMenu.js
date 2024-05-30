import { MagnifyingGlassIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  ChartPieIcon,
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  HomeModernIcon,
  IdentificationIcon,
  LifebuoyIcon,
  LockClosedIcon,
  ScaleIcon,
  UserGroupIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardMenu = ({ isOverlay, menuOpen, setMenuOpen }) => {
  const menuIconClassName =
    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white";
  const menuItems = [
    {
      id: "menu1",
      name: "Dashboard",
      link: "/dashboard",
      icon: <ChartPieIcon className={menuIconClassName} />,
      submenu: [],
    },
    {
      id: "menu2",
      name: "Account",
      link: "account",
      icon: <IdentificationIcon className={menuIconClassName} />,
      submenu: [
        {
          id: "menu21",
          name: "Profile",
          link: "account/profile",
          icon: "",
        },
        {
          id: "menu22",
          name: "Password",
          link: "account/password",
          icon: "",
        },
        {
          id: "menu23",
          name: "Subscription",
          link: "account/subscription",
          icon: "",
        },
        {
          id: "menu24",
          name: "Notification",
          link: "account/notification",
          icon: "",
        },
      ],
    },{
      id: "menu3",
      name: "Contacts",
      link: "contacts",
      icon: <UserGroupIcon className={menuIconClassName} />,
      submenu: [],
    },
    {
      id: "menu4",
      name: "Use Voice",
      link: "vc",
      icon: <MicrophoneIcon className={menuIconClassName}/>,
      submenu: [],
    },
    {
      id: "menu5",
      name: "SOS",
      link: "sos",
      icon: <LifebuoyIcon className={menuIconClassName} />,
      submenu: [],
    },
  ];
  // const lowerMenuItems = [
  //   {
  //     id: "lMenu1",
  //     name: "Privacy",
  //     link: "privacy",
  //     icon: <LockClosedIcon className={menuIconClassName} />,
  //     submenu: [],
  //   },
  //   {
  //     id: "lmenu2",
  //     name: "Terms & conditions",
  //     link: "termsandconditions",
  //     icon: <DocumentDuplicateIcon className={menuIconClassName} />,
  //     submenu: [],
  //   },
  //   {
  //     id: "lmenu3",
  //     name: "Support",
  //     link: "support",
  //     icon: <LifebuoyIcon className={menuIconClassName} />,
  //     submenu: [],
  //   },
  // ];
  const [stackOpen, setStackOpen] = useState([]);
  return (
    <>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width ${
          isOverlay && !menuOpen && "hidden"
        }`}
        aria-label="Sidebar"
      >
        <div className="relative overflow-auto max-h-screen flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <ul className="pb-2 space-y-2">
                <li>
                  <form action="#" method="GET" className="">
                    <label htmlFor="mobile-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MagnifyingGlassIcon className={menuIconClassName} />
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="mobile-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      aria-controls="dropdown-layouts"
                      data-collapse-toggle="dropdown-layouts"
                      onClick={() => {
                        if (stackOpen.find((i) => i == item.id)) {
                          setStackOpen((prevItems) =>
                            prevItems.filter((p, index) => p != item.id)
                          );
                        } else {
                          setStackOpen((prevItems) => [...prevItems, item.id]);
                        }
                      }}
                    >
                      {item.icon}
                      <span
                        className="flex-1 ml-3 text-left whitespace-nowrap"
                        sidebar-toggle-item=""
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        <Link to={item.link}> {item.name}</Link>
                      </span>
                      {item.submenu.length > 0 && (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </button>
                    {item.submenu.length > 0 && (
                      <ul
                        id="dropdown-layouts"
                        className={
                          stackOpen.includes(item.id)
                            ? "py-2 space-y-2"
                            : "hidden"
                        }
                      >
                        {item.submenu.map((subItem) => (
                          <li
                            key={subItem.id}
                            onClick={() => setMenuOpen(!menuOpen)}
                          >
                            <Link
                              to={subItem.link}
                              className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              {/* External links */}

              {/* <div className="pt-2 space-y-2">
                {lowerMenuItems?.map((litem) => (
                  <Link
                    key={litem.id}
                    to={litem.link}
                    className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {litem.icon}
                    <span className="ml-3" sidebar-toggle-item="">
                      {litem.name}
                    </span>
                  </Link>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </aside>
      {isOverlay && (
        <div
          className={`fixed inset-0 z-10 bg-gray-900/50 dark:bg-gray-900/90 ${
            !menuOpen && "hidden"
          }`}
          id="sidebarBackdrop"
          onClick={() => setMenuOpen(!menuOpen)}
        ></div>
      )}
    </>
  );
};

export default DashboardMenu;
