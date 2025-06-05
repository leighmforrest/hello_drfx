import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import DarkModeButton from "./DarkModeButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-300 dark:bg-blue-950 dark:text-white text-gray-600 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <a className="text-xl font-bold">Hello DRFX</a>

        {/* Hamburger Button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center space-y-1 w-8 h-8"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-transform duration-500 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-opacity duration-500 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-transform duration-500 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* Menu */}
        <ul
          className={`text-center flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 absolute sm:static top-full left-0 w-full sm:w-auto bg-blue-300 dark:bg-blue-950 px-4 sm:px-0 pt-4 sm:pt-0 pb-4 sm:pb-0 shadow-md sm:shadow-none transition-all duration-300 ease-in-out transform ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 sm:translate-y-0 sm:opacity-100 sm:flex hidden"
          }`}
        >
          <li>
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 hover:text-amber-100 transition-colors ${
                  isActive ? "text-amber-300 font-semibold" : ""
                }`
              }
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 hover:text-amber-100 transition-colors ${
                  isActive ? "text-amber-300 font-semibold" : ""
                }`
              }
            >
              <FaSignInAlt /> Login
            </NavLink>
          </li>
          <li className="flex justify-center">
            <DarkModeButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
