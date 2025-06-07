import { useState } from "react";
import { Link } from "react-router";
import DarkModeButton from "./DarkModeButton";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-300 dark:bg-blue-950 dark:text-white text-gray-600 shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Navbar container: flex, height fixed */}
      <div className="flex justify-between items-center px-4 h-14 max-h-14">
        <Link to="/" className="text-xl font-bold">
          Hello DRFX
        </Link>

        {/* Hamburger Button: visible only on small screens */}
        <button
          className="sm:hidden flex flex-col justify-center items-center space-y-2 w-8 h-8"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          type="button"
        >
          <span
            className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </button>

        {/* Desktop Menu: hidden on small screens */}
        <ul className="hidden sm:flex sm:flex-row sm:items-center sm:space-x-6">
          <UserMenu onLinkClick={closeMenu} />
          <li className="flex justify-center">
            <DarkModeButton />
          </li>
        </ul>
      </div>

      {/* Mobile Menu: absolute below navbar, toggle visibility */}
      <ul
        className={`sm:hidden absolute top-14 left-0 w-full bg-blue-300 dark:bg-blue-950 px-4 pt-4 pb-4 space-y-4 shadow-md transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
      >
        <UserMenu onLinkClick={closeMenu} />
        <li className="flex justify-center">
          <DarkModeButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
