import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "../contexts/ThemeProvider";

const DarkModeButton = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <button className="py-2" onClick={toggleDarkMode}>
      {darkMode ? (
        <MdOutlineLightMode size={20} data-testid="light-mode-icon" />
      ) : (
        <MdDarkMode size={20} data-testid="dark-mode-icon" />
      )}
    </button>
  );
};

export default DarkModeButton;
