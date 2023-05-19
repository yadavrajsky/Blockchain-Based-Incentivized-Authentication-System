/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { clearErrorsAndMessages, logoutUser } from "../features/auth/authSlice";
import { showToast } from "./utils/showToast";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(() => {
    return false;
  });
  const [showHamMenu, setHamShowMenu] = useState(() => {
    return false;
  });
  const { user, isAuthenticated, message, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
    setHamShowMenu(false);

  };
  const handleHamMenuToggle = () => {
    setHamShowMenu(!showHamMenu);
  };
  const handleLogout = () => {
    dispatch(logoutUser({ wallet: user }));
    handleMenuToggle();
    setHamShowMenu(false);
  };
  useEffect(() => {
    if (message) {
      showToast(false, message, "Auth");
    } else if (error) showToast(error, false, "Auth");
    dispatch(clearErrorsAndMessages());
  }, [error, message]);
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center">
          <img src="/blockauth.png" className="h-8 mr-3" alt="blockauth Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto"
                onClick={handleHamMenuToggle}
              >
                <FaUserCircle size={20} />
              </button>
              {showHamMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                  <span className="block w-full rounded-t-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out text-center font-extrabold">
                    {user.slice(0, 3)}...{user.slice(-3)}
                  </span>
                  <button
                    className="block px-4 w-full rounded-b-lg py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out text-center font-semibold"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt
                      className="inline-block mr-2 text-red-500"
                      size={16}
                    />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to={"/register"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
              </Link>
              <Link to={"/login"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </Link>
            </>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={handleMenuToggle} // toggle menu visibility on click
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            showMenu ? "flex" : "hidden" // apply conditional rendering to show/hide menu items
          } items-center md:space-x-5 justify-between w-full md:w-auto mt-4 md:mt-0 md:order-1 md:flex flex-col md:flex-row md:justify-end`}
          id="navbar-sticky"
        >
          <Link
            to={"/"}
            className="block w-full text-center py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            aria-current="page"
            onClick={handleMenuToggle}
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="block w-full text-center py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            onClick={handleMenuToggle}
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              to={"/dashboard"}
              className="block w-full text-center py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              onClick={handleMenuToggle}
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
