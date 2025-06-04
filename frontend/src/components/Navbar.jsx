import DarkModeButton from "./DarkModeButton"

const Navbar = () => {
  return <nav className="flex items-center justify-between p-2 text-2xl dark:bg-blue-950 dark:text-amber-50">
    <div className="brand">
        <a href="#">Hello DRFX</a>
    </div>
    <ul className="flex justify-between items-center gap-3">
        <li><a href="#">Home</a></li>
        <li><a href="#">Login</a></li>
        <li><DarkModeButton /></li>
    </ul>
  </nav>;
};

export default Navbar;
