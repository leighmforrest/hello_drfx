import { NavLink } from 'react-router';
import { FaHome, FaSignInAlt } from 'react-icons/fa';

import { useUser } from '../contexts/UserProvider';

import Spinner from './Spinner';
import UserMenuLink from './UserMenuLink';
import UserMenuPopover from './UserMenuPopover';

const UserMenu = ({ onLinkClick }) => {
  const { user, loading, logout } = useUser();

  if (loading) return <Spinner />;

  return user ? (
    <>
      <UserMenuPopover user={user} />
      <li className='flex items-center justify-center hover:text-amber-200'>
        <button onClick={logout}>Log Out</button>
      </li>
    </>
  ) : (
    <>
      <UserMenuLink to="/" onClick={onLinkClick} end>
        <FaHome /> Home
      </UserMenuLink>
      <UserMenuLink to="/login" onClick={onLinkClick}>
        <FaSignInAlt /> Login
      </UserMenuLink>
      <UserMenuLink to="/register" onClick={onLinkClick}>
        Register
      </UserMenuLink>
    </>
  );
};

export default UserMenu;
