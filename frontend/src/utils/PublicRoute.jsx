import { Outlet, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = () => {
  /** Route that is only available to an unauthenticated user. */
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
