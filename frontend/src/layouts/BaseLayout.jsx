import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default BaseLayout;
