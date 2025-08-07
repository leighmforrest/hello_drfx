import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import DarkModeButton from './DarkModeButton';
import UserMenu from './UserMenu';
import Hamburger from './Hamburger';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 720);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="w-full h-14" data-testid="navbar">
      <nav className="bg-blue-300 dark:bg-blue-950 dark:text-white text-gray-600 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center px-4 h-14 max-h-14">
          <Link to="/" className="text-xl font-bold">
            Hello DRFX
          </Link>

          {isMobile && <Hamburger onButtonClick={toggleMenu} isOpen={isOpen} />}

          <ul
            ref={navbarRef}
            className={`
    ${
      isMobile
        ? 'flex flex-col space-y-4 absolute top-14 left-0 w-full bg-blue-300 dark:bg-blue-950 px-4 pt-4 pb-4 shadow-md transition-all duration-300 ease-in-out'
        : 'flex flex-row space-x-6 items-center static w-auto bg-transparent px-0 pt-0 pb-0 shadow-none'
    }

    ${
      isOpen || !isMobile
        ? 'opacity-100 visible translate-y-0'
        : 'opacity-0 invisible -translate-y-2'
    }
  `}
          >
            <UserMenu />
            <li className="flex justify-center sm:justify-start">
              <DarkModeButton />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
