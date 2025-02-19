import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    (async () => {
      setAuthStatus(await isAuthenticated());
    })();
  }, [isAuthenticated]);

  if (authStatus === null) return null; // Show nothing (or loading spinner) while checking

  return !authStatus ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
