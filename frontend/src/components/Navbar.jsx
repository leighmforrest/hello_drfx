import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full h-14 bg-gray-900 text-amber-50">
      <nav className="h-14 flex justify-between items-center px-4">
        <a href="#" className="text-xl font-bold">Hello DRFX</a>
        <ul className="flex items-center md:gap-x-4">
          <li><a href="#" className="hover:text-amber-400 transition">Home</a></li>
          <li><a href="#" className="hover:text-amber-400 transition">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
