import { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './Orders.css';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { addNotification } = useNotifications();
  const { addToCart } = useCart();

  const [orders, setOrders] = useState([
    { 
      id: 'ORD-001', 
      date: '2024-02-15', 
      customer: 'John Doe', 
      items: 3, 
      amount: 459.97, 
      status: 'delivered',
      products: [
        { name: 'Smart Watch', price: 179.99, quantity: 1 },
        { name: 'Wireless Earbuds', price: 79.99, quantity: 2 }
      ],
      timeline: [
        { status: 'placed', date: '2024-02-15 10:30 AM', completed: true },
        { status: 'processing', date: '2024-02-15 11:00 AM', completed: true },
        { status: 'shipped', date: '2024-02-16 09:00 AM', completed: true },
        { status: 'delivered', date: '2024-02-18 02:30 PM', completed: true }
      ],
      estimatedDelivery: '2024-02-18',
      trackingNumber: 'TRK123456789'
    },
    { 
      id: 'ORD-002', 
      date: '2024-02-14', 
      customer: 'Jane Smith', 
      items: 1, 
      amount: 179.99, 
      status: 'shipped',
      products: [{ name: 'Smart Watch', price: 179.99, quantity: 1 }],
      timeline: [
        { status: 'placed', date: '2024-02-14 03:20 PM', completed: true },
        { status: 'processing', date: '2024-02-14 04:00 PM', completed: true },
        { status: 'shipped', date: '2024-02-15 10:00 AM', completed: true },
        { status: 'delivered', date: 'Expected: 2024-02-19', completed: false }
      ],
      estimatedDelivery: '2024-02-19',
      trackingNumber: 'TRK987654321'
    },
    { 
      id: 'ORD-003', 
      date: '2024-02-13', 
      customer: 'Mike Johnson', 
      items: 2, 
      amount: 229.98, 
      status: 'processing',
      products: [{ name: 'Mechanical Keyboard', price: 129.99, quantity: 1 }, { name: 'Mouse', price: 99.99, quantity: 1 }],
      timeline: [
        { status: 'placed', date: '2024-02-13 11:45 AM', completed: true },
        { status: 'processing', date: '2024-02-13 12:00 PM', completed: true },
        { status: 'shipped', date: 'Pending', completed: false },
        { status: 'delivered', date: 'Expected: 2024-02-20', completed: false }
      ],
      estimatedDelivery: '2024-02-20',
      trackingNumber: null
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={18} />;
      case 'shipped': return <Truck size={18} />;
      case 'processing': return <Package size={18} />;
      case 'cancelled': return <XCircle size={18} />;
      default: return <Clock size={18} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered': return 'status-delivered';
      case 'shipped': return 'status-shipped';
      case 'processing': return 'status-processing';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const handleReorder = (order) => {
    order.products.forEach(product => {
      addToCart({ 
        id: Math.random(), 
        name: product.name, 
        price: product.price,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
      }, product.quantity);
    });
    
    addNotification({
      type: 'order',
      title: 'Items Added to Cart',
      message: `${order.items} items from order ${order.id} added to cart`,
      icon: '🛒'
    });
    
    toast.success('Items added to cart!');
  };

  const filteredOrders = orders
    .filter(o => statusFilter === 'all' || o.status === statusFilter)
    .filter(o => 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const OrderModal = ({ order, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="order-modal-enhanced" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Order Details</h2>
            <p className="order-id-large">{order.id}</p>
          </div>
          <button onClick={onClose}>×</button>
        </div>
        
        <div className="order-details-enhanced">
          <div className="order-info-grid">
            <div className="info-item">
              <span className="info-label">Order Date</span>
              <span className="info-value">{order.date}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Items</span>
              <span className="info-value">{order.items}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Amount</span>
              <span className="info-value">${order.amount}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className={`status-badge ${getStatusClass(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status}
              </span>
            </div>
          </div>

          {order.trackingNumber && (
            <div className="tracking-info">
              <span className="tracking-label">Tracking Number:</span>
              <span className="tracking-number">{order.trackingNumber}</span>
            </div>
          )}

          <div className="order-timeline-section">
            <h3>Order Timeline</h3>
            <div className="timeline-animated">
              {order.timeline.map((step, index) => (
                <div key={index} className={`timeline-step ${step.completed ? 'completed' : 'pending'}`}>
                  <div className="timeline-dot">
                    {step.completed ? <CheckCircle size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="timeline-content">
                    <h4>{step.status.charAt(0).toUpperCase() + step.status.slice(1)}</h4>
                    <p>{step.date}</p>
                  </div>
                  {index < order.timeline.length - 1 && (
                    <div className={`timeline-line ${step.completed ? 'completed' : ''}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="estimated-delivery">
            <Package size={20} />
            <div>
              <span className="delivery-label">Estimated Delivery</span>
              <span className="delivery-date">{order.estimatedDelivery}</span>
            </div>
          </div>

          <div className="order-products">
            <h3>Products</h3>
            {order.products.map((product, index) => (
              <div key={index} className="product-row">
                <span>{product.name}</span>
                <span>x{product.quantity}</span>
                <span>${(product.price * product.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <button 
            className="btn btn-primary btn-block btn-reorder"
            onClick={() => {
              handleReorder(order);
              onClose();
            }}
          >
            <RotateCcw size={20} />
            Re-order
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="orders-page">
        <div className="orders-header">
          <h1>Order History</h1>
          <p>Track and manage all your orders</p>
        </div>

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
            {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <button
                key={status}
                className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customer}</td>
                  <td>{order.items}</td>
                  <td className="order-amount">${order.amount}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-btn"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye size={18} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </Layout>
  );
};

export default Orders;
