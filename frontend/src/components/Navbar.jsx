import { useState } from "react";
import { Link } from "react-router";
import DarkModeButton from "./DarkModeButton";
import UserMenu from "./UserMenu";
import Hamburger from "./Hamburger";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-blue-300 dark:bg-blue-950 dark:text-white text-gray-600 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center px-4 h-14 max-h-14">
        <Link to="/" className="text-xl font-bold">
          Hello DRFX
        </Link>

        {/* Hamburger: visible only on small screens */}
        <Hamburger onButtonClick={toggleMenu} isOpen={isOpen} />

        {/* Single ul for both mobile and desktop */}
        <ul
          className={`
            flex-col space-y-4
            sm:flex sm:flex-row sm:space-y-0 sm:space-x-6 sm:items-center
            absolute top-14 left-0 w-full bg-blue-300 dark:bg-blue-950 px-4 pt-4 pb-4 shadow-md
            sm:static sm:w-auto sm:bg-transparent sm:px-0 sm:pt-0 sm:pb-0 sm:shadow-none
            transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible sm:opacity-100 sm:translate-y-0 sm:visible"}
          `}
          onClick={closeMenu} // Optional: close menu when clicking a link inside
        >
          <UserMenu />
          <li className="flex justify-center sm:justify-start">
            <DarkModeButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
