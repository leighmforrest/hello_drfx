import { useUser } from '../contexts/UserProvider';
import { Navigate, Outlet } from 'react-router';

import Spinner from './Spinner';

const PrivateRoute = () => {
  const { user, loading } = useUser();

  if (loading) return <Spinner />;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
