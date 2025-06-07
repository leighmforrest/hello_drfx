import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const BaseLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full h-14">
        <Navbar />
      </header>
      <main className="flex-1 bg-blue-200 dark:bg-blue-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
