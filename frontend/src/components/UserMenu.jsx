import { NavLink } from 'react-router';
import { FaHome, FaSignInAlt } from 'react-icons/fa';
import { useUser } from '../contexts/UserProvider';
import Spinner from './Spinner';
import UserMenuLink from './UserMenuLink';

const UserMenu = ({ onLinkClick }) => {
  const { user, loading, logout } = useUser();

  if (loading) return <Spinner />;

  return user ? (
    <>
      <li>{user.email}</li>
      <li>
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
