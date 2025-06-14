import { Outlet } from "react-router";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const BaseLayout = () => {
  return (
    <>
        <Navbar />
      <main className="flex-1 bg-blue-200 dark:bg-blue-900 dark:text-white">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;