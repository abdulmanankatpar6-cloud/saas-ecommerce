import { useState } from 'react';
import { Search, ShoppingCart, Bell, Moon, Sun, Mail, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useMessages } from '../context/MessageContext';
import NotificationPanel from './NotificationPanel';
import MessagesPanel from './MessagesPanel';
import './Navbar.css';

const Navbar = ({ onCartClick, onMenuClick, hideCart = false }) => {
  const { isDark, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const { unreadCount: messageUnreadCount } = useMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  return (
    <>
      <nav className="navbar">
        {onMenuClick && (
          <button className="icon-btn menu-btn" onClick={onMenuClick} title="Menu">
            <Menu size={20} />
          </button>
        )}

        <div className="navbar-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search products, orders..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="navbar-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="icon-btn"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>

          <button
            className="icon-btn"
            title="Messages"
            onClick={() => setShowMessages(!showMessages)}
          >
            <Mail size={20} />
            {messageUnreadCount > 0 && <span className="badge">{messageUnreadCount}</span>}
          </button>

          {!hideCart && (
            <button className="icon-btn cart-btn" onClick={onCartClick} title="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          )}

          <div className="user-menu">
            <img src={user?.avatar} alt={user?.name} />
            <span>{user?.name}</span>
          </div>
        </div>
      </nav>

      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      <MessagesPanel isOpen={showMessages} onClose={() => setShowMessages(false)} />
    </>
  );
};

export default Navbar;
