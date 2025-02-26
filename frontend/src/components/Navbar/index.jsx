import { NavLink } from "react-router"

import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav>
        <div className={styles.brand}>
            Blog
        </div>
        <ul className={styles.menu}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><a href="#">Register</a></li>
        </ul>
    </nav>
  )
}

export default Navbar