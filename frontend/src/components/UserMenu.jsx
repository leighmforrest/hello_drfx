import { useState, useRef, useEffect } from "react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserProvider";

const OwnerMenu = () => {
  const { user, isLoading, logout } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const logoutHandler = () => {
    logout();
    toast("The user has been logged out.");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading)
    return (
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
    );

  return user ? (
    <div className="relative" ref={menuRef}>
      <button
        data-testid="user-menu-button"
        onClick={() => setOpen(!open)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium text-white rounded ${
          isLoading
            ? "bg-gray-600 cursor-wait"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        <FaUserCircle className="w-5 h-5" />
        <span className="hidden sm:inline">{user?.email}</span>
        <FaChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
          <a
            href="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100"
          >
            <FaUserCircle className="mr-2" /> Profile
          </a>
          <a
            href="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100"
          >
            <FaCog className="mr-2" /> Settings
          </a>
          <button
            onClick={logoutHandler}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link to="/login" className="block py-1 hover:text-amber-400 transition">
      Login
    </Link>
  );
};

export default OwnerMenu;
