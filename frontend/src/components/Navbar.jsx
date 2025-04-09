import { useState } from "react";
import DarkModeButton from "./DarkModeButton";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-14 bg-gray-900 text-amber-50">
      <nav className="h-14 flex justify-between items-center px-4 relative">
        <a href="#" className="text-xl font-bold">
          Hello DRFX
        </a>

        {/* Hamburger Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div
            className={`w-6 h-0.5 bg-amber-50 mb-2 transition-transform duration-500 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-amber-50 mb-2 transition-opacity duration-500 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <div
            className={`w-6 h-0.5 bg-amber-50 transition-transform duration-500 ${
              isOpen ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </button>

        {/* Responsive Menu with Smooth Transition */}
        <ul
          className={`absolute top-14 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent md:static md:flex items-center gap-x-2 transition-all duration-500 ease-in-out
            ${
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none md:opacity-100 md:scale-100 md:pointer-events-auto"
            }`}
        >
          <li className="py-2 md:py-0 text-center md:text-left">
            <a
              href="#"
              className="block py-1 hover:text-amber-400 transition"
            >
              Home
            </a>
          </li>
          <li className="py-2 md:py-0 text-center md:text-left">
            <a href="#" className="block py-1 hover:text-amber-400 transition">
              About
            </a>
          </li>
          <li className="flex justify-center py-2 md:py-0">
            <UserMenu />
          </li>
          <li className="py-2 md:py-0 text-center md:text-left">
            <DarkModeButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
