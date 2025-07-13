import { FaHome, FaSignInAlt } from 'react-icons/fa';

import { useUser } from '../contexts/UserProvider';

import Spinner from './Spinner';
import UserMenuLink from './UserMenuLink';
import UserMenuPopover from './UserMenuPopover';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const UserMenu = ({ onLinkClick }) => {
  const { user, loading, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout()
    toast.success("The user has been logged out.")
    navigate("/login")
  }

  if (loading) return <Spinner />;

  return user ? (
    <>
      <UserMenuLink to="/" onClick={onLinkClick} end>
        <FaHome /> Home
      </UserMenuLink>
      <UserMenuLink to="/picture/new" onClick={onLinkClick} end>
        New Picture
      </UserMenuLink>
      <UserMenuPopover user={user} />
      <li className="flex items-center justify-center hover:text-amber-200">
        <button onClick={handleLogout}>Log Out</button>
      </li>
    </>
  ) : (
    <>
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
