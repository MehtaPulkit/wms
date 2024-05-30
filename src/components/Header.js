import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/w-logo.svg";
const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pages = [
    { pageTitle: "Home", pageUrl: "/" },
    { pageTitle: "About us", pageUrl: "/about-us" },
    { pageTitle: "Services", pageUrl: "/services" },
    { pageTitle: "Contact us", pageUrl: "/contact-us" },
  ];

  let location = useLocation().pathname;

  return (
    <header className="p-4">
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-red-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} alt="logo" className="w-8 h-8 rounded" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-800">
              WMS
            </span>
          </Link>

          <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg lg:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600`}
              aria-controls="navbar-cta"
              aria-expanded="false"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between ${
              openMenu ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:order-2`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg  lg:bg-white lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 ">
              {pages.map((page, i) => (
                <li key={i}>
                  <Link
                    to={page.pageUrl}
                    className={`block py-2 px-3 text-gray-800 rounded ${
                      location.includes(page.pageUrl) && "text-red-800"
                    } lg:bg-transparent hover:bg-gray-200  hover:text-blue-700 lg:p-0 md:hover:bg-transparent lg:dark:text-blue-500 mb-2`}
                    aria-current="page"
                  >
                    {page.pageTitle}
                  </Link>
                </li>
              ))}
              <li>
                <div className="flex lg:hidden">
                  <Link
                    to="/dashboard"
                    className="inline-flex justify-center items-center py-3 px-5 text-base mr-4 font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                  >
                    Login
                    <svg
                      className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70"
                  >
                    Sign up
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-start sm:space-y-0 hidden lg:flex  md:order-2">
            <Link
              to="/auth/login"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Login
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <Link
              to="/auth/signup"
              className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
