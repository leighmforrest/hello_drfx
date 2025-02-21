import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";

const BaseLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>&copy; Gripweed Consulting LLC</footer>
    </>
  );
};

export default BaseLayout;
