import { NavLink } from "react-router";
import { FaHome, FaSignInAlt } from "react-icons/fa";


const UserMenu = ({ onLinkClick }) => {
  return (
    <>
      <li>
        <NavLink
          to="/"
          end
          onClick={onLinkClick}
          className={({ isActive }) =>
            `flex items-center justify-center gap-2 hover:text-amber-100 transition-colors ${
              isActive ? "text-amber-300 font-semibold" : ""
            }`
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          onClick={onLinkClick}
          className={({ isActive }) =>
            `flex items-center justify-center gap-2 hover:text-amber-100 transition-colors ${
              isActive ? "text-amber-300 font-semibold" : ""
            }`
          }
        >
          <FaSignInAlt /> Login
        </NavLink>
      </li>
    </>
  );
};

export default UserMenu;
