import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ReportModal from '../../components/ReportModal';
import { TrendingUp, Package, DollarSign, Users, ShoppingCart, AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [showReportModal, setShowReportModal] = useState(false);
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '$125,430',
      change: '+18.2%',
      color: '#4F46E5',
      trend: 'up',
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: '3,456',
      change: '+12.5%',
      color: '#22C55E',
      trend: 'up',
    },
    {
      icon: Users,
      label: 'Total Customers',
      value: '2,891',
      change: '+8.3%',
      color: '#FACC15',
      trend: 'up',
    },
    {
      icon: Package,
      label: 'Products',
      value: '456',
      change: '+5.1%',
      color: '#EF4444',
      trend: 'up',
    },
  ];

  const salesData = [
    { month: 'Jan', revenue: 12000, orders: 245 },
    { month: 'Feb', revenue: 15000, orders: 298 },
    { month: 'Mar', revenue: 18000, orders: 356 },
    { month: 'Apr', revenue: 16000, orders: 312 },
    { month: 'May', revenue: 22000, orders: 445 },
    { month: 'Jun', revenue: 25000, orders: 512 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#4F46E5' },
    { name: 'Audio', value: 25, color: '#22C55E' },
    { name: 'Computers', value: 20, color: '#FACC15' },
    { name: 'Accessories', value: 10, color: '#EF4444' },
  ];

  const recentOrders = [
    {
      id: 'ORD-1234',
      customer: 'John Doe',
      product: 'Smart Watch',
      amount: 179.99,
      status: 'completed',
      date: '2024-02-18',
    },
    {
      id: 'ORD-1235',
      customer: 'Jane Smith',
      product: 'Wireless Earbuds',
      amount: 79.99,
      status: 'processing',
      date: '2024-02-18',
    },
    {
      id: 'ORD-1236',
      customer: 'Mike Johnson',
      product: 'Gaming Laptop',
      amount: 999.99,
      status: 'pending',
      date: '2024-02-17',
    },
    {
      id: 'ORD-1237',
      customer: 'Sarah Williams',
      product: 'Keyboard',
      amount: 129.99,
      status: 'completed',
      date: '2024-02-17',
    },
  ];

  const topProducts = [
    { name: 'Smart Watch', sales: 245, revenue: '$44,055', trend: '+12%' },
    { name: 'Wireless Earbuds', sales: 189, revenue: '$15,108', trend: '+8%' },
    { name: 'Gaming Laptop', sales: 156, revenue: '$155,984', trend: '+15%' },
    { name: 'Mechanical Keyboard', sales: 134, revenue: '$17,418', trend: '+5%' },
  ];

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="admin-actions">
            <button className="btn btn-outline" onClick={() => setShowReportModal(true)}>
              Download Report
            </button>
            <button className="btn btn-primary">Add Product</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="admin-stat-card">
              <div
                className="stat-icon"
                style={{ background: `${stat.color}15`, color: stat.color }}
              >
                <stat.icon size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className={`stat-change ${stat.trend}`}>
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="admin-charts-grid">
          {/* Revenue Chart */}
          <div className="admin-chart-card">
            <div className="chart-header">
              <h3>Revenue Overview</h3>
              <select className="chart-filter">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Orders Chart */}
          <div className="admin-chart-card">
            <div className="chart-header">
              <h3>Orders Overview</h3>
              <select className="chart-filter">
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>All time</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="admin-bottom-grid">
          {/* Recent Orders */}
          <div className="admin-section-card">
            <div className="section-header">
              <h3>Recent Orders</h3>
              <a href="/admin/orders" className="view-all">
                View All →
              </a>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td className="amount">${order.amount}</td>
                      <td>
                        <span className={`status-badge status-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products & Category Distribution */}
          <div className="admin-side-section">
            {/* Category Distribution */}
            <div className="admin-section-card">
              <h3>Sales by Category</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Top Products */}
            <div className="admin-section-card">
              <h3>Top Products</h3>
              <div className="top-products-list">
                {topProducts.map((product, index) => (
                  <div key={index} className="top-product-item">
                    <div className="product-info">
                      <span className="product-rank">#{index + 1}</span>
                      <div>
                        <h4>{product.name}</h4>
                        <p>{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="product-stats">
                      <span className="product-revenue">{product.revenue}</span>
                      <span className="product-trend">{product.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={{
          stats,
          salesData,
          recentOrders,
          topProducts,
          categoryData,
        }}
        reportType="dashboard"
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
