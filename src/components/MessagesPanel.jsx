import { X, Mail, Reply, Trash2, Star, Clock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMessages } from '../context/MessageContext';
import './MessagesPanel.css';

const MessagesPanel = ({ isOpen, onClose }) => {
  const { messages, markAsRead, toggleStar, deleteMessage, markAllAsRead, unreadCount } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, starred

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'starred') return msg.starred;
    return true;
  });

  const starredCount = messages.filter(m => m.starred).length;

  const handleMessageClick = (message) => {
    // Mark as read when opening
    if (!message.read) {
      markAsRead(message.id);
    }
    setSelectedMessage(message);
  };

  const handleReply = (message) => {
    toast.success(`Reply to ${message.from}`);
    // In real app, open compose modal
  };

  const handleDelete = (message) => {
    deleteMessage(message.id);
    toast.success('Message deleted');
    setSelectedMessage(null);
  };

  const handleStar = (message) => {
    toggleStar(message.id);
    const newStarredState = !message.starred;
    toast.success(newStarredState ? 'Message starred' : 'Star removed');
    // Update selected message if viewing it
    if (selectedMessage && selectedMessage.id === message.id) {
      setSelectedMessage({ ...message, starred: newStarredState });
    }
  };

  const handleMarkAllRead = () => {
    markAllAsRead();
    toast.success('All messages marked as read');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="messages-overlay" onClick={onClose}></div>
      <div className="messages-panel">
        {/* Header */}
        <div className="messages-header">
          <div className="messages-title">
            <Mail size={24} />
            <div>
              <h2>Messages</h2>
              <p>{unreadCount} unread</p>
            </div>
          </div>
          <div className="messages-header-actions">
            {unreadCount > 0 && (
              <button 
                className="btn-mark-all-read" 
                onClick={handleMarkAllRead}
                title="Mark all as read"
              >
                Mark all read
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="messages-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({messages.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button 
            className={`filter-btn ${filter === 'starred' ? 'active' : ''}`}
            onClick={() => setFilter('starred')}
          >
            <Star size={16} />
            Starred ({starredCount})
          </button>
        </div>

        {/* Messages List or Detail View */}
        {selectedMessage ? (
          // Message Detail View
          <div className="message-detail">
            <button className="back-btn" onClick={() => setSelectedMessage(null)}>
              ← Back to messages
            </button>

            <div className="message-detail-header">
              <img src={selectedMessage.avatar} alt={selectedMessage.from} />
              <div className="message-detail-info">
                <h3>{selectedMessage.from}</h3>
                <p className="message-time">
                  <Clock size={14} />
                  {selectedMessage.time}
                </p>
              </div>
              <div className="message-actions">
                <button 
                  className="action-btn"
                  onClick={() => handleStar(selectedMessage)}
                  title={selectedMessage.starred ? "Remove star" : "Star message"}
                >
                  <Star size={18} fill={selectedMessage.starred ? '#FACC15' : 'none'} />
                </button>
                <button 
                  className="action-btn"
                  onClick={() => handleDelete(selectedMessage)}
                  title="Delete message"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="message-subject">
              <h2>{selectedMessage.subject}</h2>
            </div>

            <div className="message-body">
              <p>{selectedMessage.message}</p>
            </div>

            <div className="message-reply">
              <button 
                className="btn btn-primary"
                onClick={() => handleReply(selectedMessage)}
              >
                <Reply size={18} />
                Reply
              </button>
            </div>
          </div>
        ) : (
          // Messages List View
          <div className="messages-list">
            {filteredMessages.length === 0 ? (
              <div className="empty-state">
                <Mail size={48} />
                <p>No messages</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`message-item ${!message.read ? 'unread' : ''}`}
                  onClick={() => handleMessageClick(message)}
                >
                  <img src={message.avatar} alt={message.from} className="message-avatar" />
                  <div className="message-content">
                    <div className="message-header-row">
                      <span className="message-from">{message.from}</span>
                      <span className="message-time">
                        <Clock size={12} />
                        {message.time}
                      </span>
                    </div>
                    <h4 className="message-subject">{message.subject}</h4>
                    <p className="message-preview">{message.preview}</p>
                  </div>
                  {message.starred && (
                    <Star size={16} fill="#FACC15" className="message-star" />
                  )}
                  {!message.read && <div className="unread-dot"></div>}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MessagesPanel;
