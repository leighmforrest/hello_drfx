const Navbar = () => {
  return <div className="flex items-center justify-between">
    <div className="brand">
        <a href="#">Hello DRFX</a>
    </div>
    <ul className="flex justify-between gap-3">
        <li><a href="#">Home</a></li>
        <li><a href="#">Login</a></li>
    </ul>
  </div>;
};

export default Navbar;
