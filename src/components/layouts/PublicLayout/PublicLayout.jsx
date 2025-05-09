import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
