import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BaseLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-blue-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
