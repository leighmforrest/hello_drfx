import { Outlet } from 'react-router';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BaseLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default BaseLayout;
