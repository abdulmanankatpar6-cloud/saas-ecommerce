import { useNotifications } from '../context/NotificationContext';
import { X, Check, Trash2 } from 'lucide-react';
import './NotificationPanel.css';

const NotificationPanel = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll, unreadCount } = useNotifications();

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <>
      {isOpen && <div className="notification-overlay" onClick={onClose} />}
      <div className={`notification-panel ${isOpen ? 'open' : ''}`}>
        <div className="notification-header">
          <div>
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} new</span>
            )}
          </div>
          <div className="notification-actions">
            {unreadCount > 0 && (
              <button className="btn-mark-all" onClick={markAllAsRead} title="Mark all as read">
                <Check size={18} />
              </button>
            )}
            {notifications.length > 0 && (
              <button className="btn-clear-all" onClick={clearAll} title="Clear all">
                <Trash2 size={18} />
              </button>
            )}
            <button className="btn-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <span className="empty-icon">🔔</span>
              <p>No notifications</p>
              <span className="empty-text">You're all caught up!</span>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-icon">{notification.icon}</div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <button
                  className="btn-delete-notification"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                >
                  <X size={16} />
                </button>
                {!notification.read && <div className="unread-dot"></div>}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
