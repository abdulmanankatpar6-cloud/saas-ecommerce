import { createContext, useContext, useState, useEffect } from 'react';

const MessageContext = createContext();

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within MessageProvider');
  }
  return context;
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('messages');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            from: 'Support Team',
            avatar: 'https://ui-avatars.com/api/?name=Support+Team&background=4F46E5&color=fff',
            subject: 'Welcome to NextWeb!',
            preview: 'Thank you for joining us. Here are some tips to get started...',
            message:
              "Welcome to NextWeb! We're excited to have you here. Check out our latest products and exclusive offers.",
            time: '2 hours ago',
            timestamp: Date.now() - 2 * 60 * 60 * 1000,
            read: false,
            starred: false,
          },
          {
            id: 2,
            from: 'Order Updates',
            avatar: 'https://ui-avatars.com/api/?name=Order+Updates&background=22C55E&color=fff',
            subject: 'Your order has been shipped',
            preview: 'Order #1234 is on its way! Track your package...',
            message:
              'Great news! Your order #1234 has been shipped and is on its way to you. Expected delivery: 2-3 business days.',
            time: '5 hours ago',
            timestamp: Date.now() - 5 * 60 * 60 * 1000,
            read: false,
            starred: true,
          },
          {
            id: 3,
            from: 'Marketing Team',
            avatar: 'https://ui-avatars.com/api/?name=Marketing+Team&background=FACC15&color=000',
            subject: 'Exclusive 20% OFF this weekend',
            preview: "Don't miss out on our weekend sale! Use code WEEKEND20...",
            message:
              'This weekend only! Get 20% off on all electronics. Use code: WEEKEND20 at checkout.',
            time: '1 day ago',
            timestamp: Date.now() - 24 * 60 * 60 * 1000,
            read: true,
            starred: false,
          },
          {
            id: 4,
            from: 'Customer Service',
            avatar: 'https://ui-avatars.com/api/?name=Customer+Service&background=EF4444&color=fff',
            subject: 'Your feedback matters',
            preview: "We'd love to hear about your recent purchase...",
            message: 'How was your experience with us? Your feedback helps us improve our service.',
            time: '2 days ago',
            timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
            read: true,
            starred: false,
          },
          {
            id: 5,
            from: 'Product Team',
            avatar: 'https://ui-avatars.com/api/?name=Product+Team&background=8B5CF6&color=fff',
            subject: 'New products just arrived!',
            preview: 'Check out our latest collection of smart devices...',
            message:
              'We just added amazing new products to our store. Be the first to check them out!',
            time: '3 days ago',
            timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
            read: true,
            starred: false,
          },
        ];
  });

  // Save to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  // Add a new message
  const addMessage = messageData => {
    const newMessage = {
      id: Date.now(),
      from: messageData.from || 'System',
      avatar:
        messageData.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(messageData.from || 'System')}&background=4F46E5&color=fff`,
      subject: messageData.subject,
      preview: messageData.preview || messageData.message.substring(0, 50) + '...',
      message: messageData.message,
      time: 'Just now',
      timestamp: Date.now(),
      read: false,
      starred: false,
    };
    setMessages([newMessage, ...messages]);
  };

  // Mark a message as read
  const markAsRead = id => {
    setMessages(messages.map(msg => (msg.id === id ? { ...msg, read: true } : msg)));
  };

  // Mark all messages as read
  const markAllAsRead = () => {
    setMessages(messages.map(msg => ({ ...msg, read: true })));
  };

  // Toggle starred status
  const toggleStar = id => {
    setMessages(messages.map(msg => (msg.id === id ? { ...msg, starred: !msg.starred } : msg)));
  };

  // Delete a message
  const deleteMessage = id => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  // Clear all messages
  const clearAll = () => {
    setMessages([]);
  };

  // Get unread count
  const unreadCount = messages.filter(msg => !msg.read).length;

  // Get starred count
  const starredCount = messages.filter(msg => msg.starred).length;

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        markAsRead,
        markAllAsRead,
        toggleStar,
        deleteMessage,
        clearAll,
        unreadCount,
        starredCount,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
