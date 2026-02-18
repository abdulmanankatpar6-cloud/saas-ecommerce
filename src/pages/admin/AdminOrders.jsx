import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ReportModal from '../../components/ReportModal';
import { Search, Eye, Edit2, Package, Truck, CheckCircle, XCircle, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-1234', customer: 'John Doe', email: 'john@example.com', product: 'Smart Watch', items: 2, amount: 359.98, status: 'pending', date: '2024-02-18' },
    { id: 'ORD-1235', customer: 'Jane Smith', email: 'jane@example.com', product: 'Wireless Earbuds', items: 1, amount: 79.99, status: 'processing', date: '2024-02-18' },
    { id: 'ORD-1236', customer: 'Mike Johnson', email: 'mike@example.com', product: 'Gaming Laptop', items: 1, amount: 999.99, status: 'shipped', date: '2024-02-17' },
    { id: 'ORD-1237', customer: 'Sarah Williams', email: 'sarah@example.com', product: 'Keyboard', items: 3, amount: 389.97, status: 'delivered', date: '2024-02-17' },
    { id: 'ORD-1238', customer: 'Tom Brown', email: 'tom@example.com', product: 'Mouse', items: 2, amount: 99.98, status: 'cancelled', date: '2024-02-16' },
    { id: 'ORD-1239', customer: 'Emily Davis', email: 'emily@example.com', product: 'USB Hub', items: 1, amount: 39.99, status: 'pending', date: '2024-02-16' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: Package, color: '#4F46E5' },
    { value: 'processing', label: 'Processing', icon: Package, color: '#FACC15' },
    { value: 'shipped', label: 'Shipped', icon: Truck, color: '#22C55E' },
    { value: 'delivered', label: 'Delivered', icon: CheckCircle, color: '#10B981' },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: '#EF4444' },
  ];

  const filteredOrders = orders
    .filter(o => statusFilter === 'all' || o.status === statusFilter)
    .filter(o =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast.success(`Order status updated to ${newStatus}`);
    setSelectedOrder(null);
  };

  const getStatusIcon = (status) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? <statusOption.icon size={18} /> : <Package size={18} />;
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : '#6B7280';
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, color: '#4F46E5' },
    { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#4F46E5' },
    { label: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: '#FACC15' },
    { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: '#22C55E' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#10B981' },
    { label: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length, color: '#EF4444' },
  ];

  return (
    <AdminLayout>
      <div className="admin-orders">
        <div className="admin-orders-header">
          <div>
            <h1>Orders Management</h1>
            <p>Manage and track all customer orders</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowReportModal(true)}>
            <Download size={20} />
            Download Report
          </button>
        </div>

        {/* Stats */}
        <div className="orders-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-box" style={{ borderLeftColor: stat.color }}>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="orders-toolbar">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="status-filters">
            <button
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            {statusOptions.map((status) => (
              <button
                key={status.value}
                className={`filter-btn ${statusFilter === status.value ? 'active' : ''}`}
                onClick={() => setStatusFilter(status.value)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Product</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="order-email">{order.email}</td>
                  <td>{order.product}</td>
                  <td>{order.items}</td>
                  <td className="order-amount">${order.amount}</td>
                  <td>{order.date}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        background: `${getStatusColor(order.status)}15`,
                        color: getStatusColor(order.status)
                      }}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-action"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Edit2 size={16} />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Status Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="status-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Update Order Status</h3>
              <div className="order-details">
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                <p><strong>Current Status:</strong> <span style={{ color: getStatusColor(selectedOrder.status) }}>{selectedOrder.status}</span></p>
              </div>

              <div className="status-options">
                <p><strong>Select New Status:</strong></p>
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    className="status-option-btn"
                    style={{
                      background: `${status.color}15`,
                      color: status.color,
                      border: selectedOrder.status === status.value ? `2px solid ${status.color}` : 'none'
                    }}
                    onClick={() => handleStatusChange(selectedOrder.id, status.value)}
                  >
                    <status.icon size={20} />
                    {status.label}
                  </button>
                ))}
              </div>

              <button className="btn btn-outline" onClick={() => setSelectedOrder(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={{ orders: filteredOrders }}
        reportType="orders"
      />
    </AdminLayout>
  );
};

export default AdminOrders;
