import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import Navbar from './Navbar';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`admin-main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar onCartClick={() => {}} hideCart={true} />
        <div className="admin-content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
