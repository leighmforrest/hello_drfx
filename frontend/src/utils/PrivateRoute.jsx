import { Outlet, Navigate } from "react-router";

const PrivateRoute = () => {
  // TODO: tap into AuthContext; destructure user
  const user = 1;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
