import styles from "./NavbarButton.module.css";

const NavbarButton = ({ onToggle, isOpen }) => {
  return (
    <button
      className={`${styles.button} ${isOpen ? styles.open : ""}`}
      onClick={onToggle}
      aria-label="Toggle navigation menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default NavbarButton;
