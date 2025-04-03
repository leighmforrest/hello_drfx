import { MdDarkMode,  MdOutlineLightMode } from "react-icons/md";

import { useTheme } from "../contexts/ThemeProvider";

const DarkModeButton = () => {
    const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? <MdOutlineLightMode size={20}/> : <MdDarkMode size={20} />
    }</button>
  )
}

export default DarkModeButton