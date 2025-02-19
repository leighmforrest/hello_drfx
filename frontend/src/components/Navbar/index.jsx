import { NavLink } from "react-router";

import styles from "./Navbar.module.css";
import { useState } from "react";
import NavbarButton from "../NavbarButton";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleClick = () => setIsOpen(!isOpen);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <NavLink to="/">Hello DRF</NavLink>
        </div>
        <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
          {user ? (
            <>
              <li>
                <NavLink
                  to="/"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  Home
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={styles.navLink}
                  onClick={handleLinkClick}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/password/reset/"
                  className={styles.smallNavLink}
                  onClick={handleLinkClick}
                >
                  password reset
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <NavbarButton onToggle={handleClick} isOpen={isOpen} />
      </nav>
    </header>
  );
};
export default Navbar;
