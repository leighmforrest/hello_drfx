import { NavLink } from 'react-router';

const UserMenuLink = ({ onLinkClick, to, end = false, children }) => (
  <li data-testid="usermenulink">
    <NavLink
      to={to}
      end={end}
      onClick={onLinkClick}
      className={({ isActive }) =>
        `flex items-center justify-center gap-2 hover:text-amber-200 transition-colors ${
          isActive ? 'text-amber-300 font-semibold' : ''
        }`
      }
    >
      {children}
    </NavLink>
  </li>
);

export default UserMenuLink;
