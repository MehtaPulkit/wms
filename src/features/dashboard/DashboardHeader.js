import React, { useState } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import { backendURL } from "../../config/connection";
import { BellIcon } from "@heroicons/react/16/solid";
import { MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/w-logo.svg";
import { BellSlashIcon } from "@heroicons/react/24/outline";

const DashboardHeader = ({ menuOpen, setMenuOpen }) => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const navigate = useNavigate();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const { firstname, lastname, email, profilePicture } = useAuth();

  return (
    <header>
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex lg:gap-16 items-center justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded="true"
                aria-controls="sidebar"
                className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={toggleMenu}
              >
                {menuOpen ? (
                  <XMarkIcon width={24} />
                ) : (
                  <Bars3CenterLeftIcon width={24} />
                )}
              </button>
              <Link to="/dashboard" className="flex ml-2 md:mr-24">
                <img src={logo} alt="logo" className="w-8 h-8 rounded mr-2" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  WMS
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="hidden mr-3 -mb-1 sm:block">
                <span></span>
              </div>
              <Link
                to="/dashboard/sos"
                className="bg-red-600 rounded-full text-white cursor-pointer p-2 w-16 text-center"
              >
                SOS
              </Link>
              <button
                type="button"
                data-dropdown-toggle="notification-dropdown"
                className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <span className="sr-only">View notifications</span>

                <BellIcon width={20} height={20} title="Notifications" />
              </button>

              <div
                className={`${
                  !notificationOpen && "hidden"
                } absolute notifyModal z-50 max-w-xs md:max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:divide-gray-600 dark:bg-gray-700`}
                id="notification-dropdown"
                data-popper-placement="bottom"
              >
                <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  Notifications
                </div>

                <div>
                  <a
                    href="#"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex-shrink-0">
                      <BellSlashIcon className="w-6 h-6 " />
                    </div>
                    <div className="w-full pl-3">No new notifications</div>
                  </a>
                </div>
                <a
                  href="#"
                  className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
                >
                  <div className="inline-flex items-center ">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    View all
                  </div>
                </a>
              </div>

              <button
                id="theme-toggle"
                data-tooltip-target="tooltip-toggle"
                type="button"
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                onClick={() => toggleDarkMode()}
              >
                {colorTheme == "dark" ? (
                  <MoonIcon width={20} />
                ) : (
                  <SunIcon width={20} />
                )}
              </button>
              <div
                id="tooltip-toggle"
                role="tooltip"
                className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip opacity-0 invisible"
                data-popper-placement="bottom"
              >
                Toggle dark mode
                <div className="tooltip-arrow" data-popper-arrow=""></div>
              </div>

              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 border-gray-600 dark:border-slate-600  focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button-2"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-2"
                    onClick={() => setUserModalOpen(!userModalOpen)}
                  >
                    <span className="sr-only">Open user menu</span>

                    {!profilePicture ? (
                      <div
                        className="bg-gray-100 w-8 h-8 text-gray-600 dark:bg-gray-700 rounded-full dark:text-gray-400 text-sm 
                      flex justify-center items-center 
                      "
                      >
                        {firstname?.split("")[0]} {lastname?.split("")[0]}
                      </div>
                    ) : (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`${backendURL}/users/profilePicture/${profilePicture}`}
                        alt="user photo"
                      />
                    )}
                  </button>
                </div>

                <div
                  className={`z-50 ${
                    !userModalOpen && "hidden"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow userModal dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-2"
                  data-popper-placement="bottom"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      {firstname} {lastname}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      {email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Account
                      </Link>
                    </li>

                    <li
                      onClick={() => {
                        sendLogout();
                        navigate("/auth/login");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
