import { NavLink } from "react-router";

const NavbarLink = ({ route, text, onLinkClick }) => {
  return (
    <NavLink to={route} onClick={onLinkClick}>
      {text}
    </NavLink>
  );
};

export default NavbarLink;
