import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Search, Edit2, Trash2, UserPlus, Mail, Phone, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      phone: '+1 234-567-8900',
      address: '123 Main St, NY',
      orders: 12,
      spent: 1250.5,
      status: 'active',
      joined: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      phone: '+1 234-567-8901',
      address: '456 Oak Ave, CA',
      orders: 8,
      spent: 890.25,
      status: 'active',
      joined: '2024-01-20',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      phone: '+1 234-567-8902',
      address: '789 Pine Rd, TX',
      orders: 15,
      spent: 2100.75,
      status: 'active',
      joined: '2024-01-10',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'user',
      phone: '+1 234-567-8903',
      address: '321 Elm St, FL',
      orders: 5,
      spent: 450.0,
      status: 'inactive',
      joined: '2024-02-01',
    },
    {
      id: 5,
      name: 'Admin User',
      email: 'admin@admin.com',
      role: 'admin',
      phone: '+1 234-567-8904',
      address: 'Admin Office',
      orders: 0,
      spent: 0,
      status: 'active',
      joined: '2024-01-01',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(
    u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    }
  };

  const handleToggleStatus = id => {
    setUsers(
      users.map(u =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
    toast.success('User status updated');
  };

  const stats = [
    { label: 'Total Users', value: users.length, color: '#4F46E5' },
    {
      label: 'Active Users',
      value: users.filter(u => u.status === 'active').length,
      color: '#22C55E',
    },
    { label: 'Admins', value: users.filter(u => u.role === 'admin').length, color: '#EF4444' },
    { label: 'Total Orders', value: users.reduce((sum, u) => sum + u.orders, 0), color: '#FACC15' },
  ];

  return (
    <AdminLayout>
      <div className="admin-users">
        <div className="admin-users-header">
          <div>
            <h1>Users Management</h1>
            <p>Manage all registered users</p>
          </div>
        </div>

        <div className="users-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-box" style={{ borderLeftColor: stat.color }}>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="users-toolbar">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="users-grid">
          {filteredUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=4F46E5&color=fff`}
                  alt={user.name}
                  className="user-avatar"
                />
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </div>
                <span className={`status-dot ${user.status}`} title={user.status}></span>
              </div>

              <div className="user-details">
                <div className="detail-item">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="detail-item">
                  <Phone size={16} />
                  <span>{user.phone}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={16} />
                  <span>{user.address}</span>
                </div>
              </div>

              <div className="user-stats">
                <div className="user-stat">
                  <span className="stat-value">{user.orders}</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="user-stat">
                  <span className="stat-value">${user.spent}</span>
                  <span className="stat-label">Spent</span>
                </div>
                <div className="user-stat">
                  <span className="stat-value">{user.joined}</span>
                  <span className="stat-label">Joined</span>
                </div>
              </div>

              <div className="user-actions">
                <button
                  className="btn-user-action btn-toggle"
                  onClick={() => handleToggleStatus(user.id)}
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="btn-user-action btn-delete"
                  onClick={() => handleDelete(user.id)}
                  disabled={user.role === 'admin'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
