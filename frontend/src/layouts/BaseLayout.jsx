import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

import  "./BaseLayout.css"

const BaseLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Gripweed Consulting LLC</p>
      </footer>
    </>
  );
};

export default BaseLayout;
