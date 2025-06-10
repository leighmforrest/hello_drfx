import { NavLink } from "react-router";
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { useUser } from "../contexts/UserProvider";
import Spinner from "./Spinner";


const UserMenu = ({ onLinkClick }) => {
  const { user, loading, logout } = useUser();

  if (loading) return <Spinner />
  
  return user ? (<><li>{user.email}</li>
  <li><button onClick={logout}>Log Out</button></li>
  </>
  ) : (
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
