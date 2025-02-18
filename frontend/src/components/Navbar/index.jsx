import { NavLink } from "react-router";

import styles from "./Navbar.module.css";
import { useState } from "react";
import NavbarButton from "../NavbarButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen);
  
  const handleLinkClick = () => setIsOpen(false);

  return (
  <header>
    <nav className={styles.nav}>
      <div className={styles.brand}>
      <NavLink to="/">Hello DRF</NavLink>
      </div>
      <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink to="/" className={styles.navLink} onClick={handleLinkClick}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.navLink} onClick={handleLinkClick}>Login</NavLink>
        </li>
      </ul>
      <NavbarButton onToggle={handleClick} isOpen={isOpen}/>
    </nav>
  </header>
);
}
export default Navbar;
