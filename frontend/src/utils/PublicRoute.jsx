import { Outlet, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return !isAuthenticated  ? <Outlet /> : <Navigate to="/" />;};

export default PublicRoute;

