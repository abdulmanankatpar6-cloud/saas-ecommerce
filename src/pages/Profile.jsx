import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Edit2, Mail, Phone, MapPin, Calendar, Package, TrendingUp, Clock, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
  });

  const stats = [
    { icon: Package, label: 'Total Orders', value: '120', color: '#4F46E5' },
    { icon: TrendingUp, label: 'Delivered', value: '85', color: '#22C55E' },
    { icon: Clock, label: 'Pending', value: '25', color: '#FACC15' },
    { icon: XCircle, label: 'Cancelled', value: '10', color: '#EF4444' },
  ];

  const orderData = [
    { name: 'Delivered', value: 85, color: '#22C55E' },
    { name: 'Pending', value: 25, color: '#FACC15' },
    { name: 'Cancelled', value: 10, color: '#EF4444' },
  ];

  const recentOrders = [
    { id: 'ORD-001', date: '2024-02-15', product: 'Smart Watch', amount: 179.99, status: 'delivered' },
    { id: 'ORD-002', date: '2024-02-14', product: 'Wireless Earbuds', amount: 79.99, status: 'shipped' },
    { id: 'ORD-003', date: '2024-02-13', product: 'Gaming Laptop', amount: 999.99, status: 'processing' },
  ];

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information and orders</p>
        </div>

        <div className="profile-grid">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2>Profile Information</h2>
              <button 
                className="btn-edit"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 size={18} />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="profile-avatar-section">
              <img src={user?.avatar} alt={user?.name} className="profile-avatar" />
              {isEditing && (
                <button className="btn-change-avatar">Change Photo</button>
              )}
            </div>

            <div className="profile-form">
              <div className="form-field">
                <label>
                  <Mail size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-field">
                <label>
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-field">
                <label>
                  <Phone size={18} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-field">
                <label>
                  <MapPin size={18} />
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <button className="btn btn-primary btn-block" onClick={handleSave}>
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="profile-stats">
            <h2>Order Statistics</h2>
            <div className="stats-cards">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                    <stat.icon size={24} />
                  </div>
                  <div className="stat-info">
                    <p>{stat.label}</p>
                    <h3>{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="chart-container">
              <h3>Order Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={orderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="recent-orders-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <a href="/orders" className="view-all">View All →</a>
          </div>

          <div className="orders-list">
            {recentOrders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-info">
                  <h4>{order.product}</h4>
                  <p className="order-id">{order.id}</p>
                  <p className="order-date">
                    <Calendar size={14} />
                    {order.date}
                  </p>
                </div>
                <div className="order-details">
                  <p className="order-amount">${order.amount}</p>
                  <span className={`order-status status-${order.status}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
