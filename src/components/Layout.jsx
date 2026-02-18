import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CartPanel from './CartPanel';
import BottomNav from './BottomNav';
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default Layout;
