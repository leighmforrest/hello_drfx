import React from 'react';

const Hamburger = ({ onButtonClick, isOpen }) => {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center space-y-2 w-8 h-8"
      onClick={onButtonClick}
      aria-label="Toggle menu"
      type="button"
    >
      <span
        className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-transform duration-300 ${
          isOpen ? 'rotate-45 translate-y-1.5' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-gray-600 dark:bg-amber-50 transition-transform duration-300 ${
          isOpen ? '-rotate-45 -translate-y-3.5' : ''
        }`}
      />
    </button>
  );
};

export default Hamburger;
