import { NavLink } from "react-router";

import styles from "./Navbar.module.css";
import { useState } from "react";
import NavbarButton from "../NavbarButton";
import NavbarLinkButton from "../NavbarLinkButton";
import NavbarLink from "../NavbarLink";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  const handleClick = () => setIsOpen(!isOpen);

  const handleLinkClick = () => setIsOpen(false);

  const handleLogoutClick = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch {
      console.log("Logout failed.");
    }
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <NavLink to="/">Hello DRF</NavLink>
        </div>
        <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
          {user ? (
            loading ? (
              <p>Loading...</p>
            ) : (
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
                <li>
                  <NavbarLinkButton
                    text="Log Out"
                    onButtonClick={handleLogoutClick}
                  />
                </li>
              </>
            )
          ) : (
            <>
              <li>
                <NavbarLink
                  route="/login"
                  onLinkClick={handleLinkClick}
                  text="Login"
                />
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
