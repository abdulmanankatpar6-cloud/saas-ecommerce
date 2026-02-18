import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        type: 'order',
        title: 'Order Shipped',
        message: 'Your order #ORD-1234 has been shipped',
        time: '2 hours ago',
        read: false,
        icon: '📦'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Successful',
        message: 'Payment of $179.99 received',
        time: '5 hours ago',
        read: false,
        icon: '💳'
      },
      {
        id: 3,
        type: 'discount',
        title: 'Special Discount',
        message: '20% off on all electronics',
        time: '1 day ago',
        read: false,
        icon: '🎉'
      },
      {
        id: 4,
        type: 'stock',
        title: 'Back in Stock',
        message: 'Wireless Earbuds Pro is now available',
        time: '2 days ago',
        read: true,
        icon: '✨'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      time: 'Just now',
      read: false
    };
    setNotifications([newNotification, ...notifications]);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        unreadCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
