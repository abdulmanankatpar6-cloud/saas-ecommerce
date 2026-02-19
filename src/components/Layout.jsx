import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CartPanel from './CartPanel';
import BottomNav from './BottomNav';
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="layout">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar
          onCartClick={() => setIsCartOpen(true)}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main id="main-content" className="content-wrapper">
          {children}
        </main>
      </div>
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BottomNav />
    </div>
  );
};

export default Layout;
