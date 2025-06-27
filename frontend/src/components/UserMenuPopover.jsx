import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

const UserMenuPopover = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const togglePopover = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li className="relative inline-block text-left" ref={popoverRef}>
      <span
        onClick={togglePopover}
        className="cursor-pointer flex items-center justify-center gap-2 hover:text-amber-200"
      >
        {user.email}
      </span>

      {isOpen && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-20 mt-2 w-56"
          data-testid="userpopover"
        >
          {/** Popover Caret */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-blue-900 ring-1 ring-black dark:ring-amber-100 ring-opacity-5 z-[-1]"></div>
          {/* Popover Panel */}
          <div className="rounded-md shadow-lg bg-white dark:bg-blue-900 ring-1 ring-black dark:ring-amber-100 ring-opacity-5">
            <div className="py-2 px-4 text-sm text-gray-700 dark:text-amber-400">
              Hello, {user.email}!
            </div>
            <div className="border-t px-4 py-2 text-sm text-gray-600 dark:text-amber-50">
              <Link
                to="/password/change"
                className="block hover:text-amber-200"
              >
                Password Change
              </Link>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default UserMenuPopover;
