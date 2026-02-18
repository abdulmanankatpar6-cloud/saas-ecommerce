import { useState } from 'react';
import Layout from '../components/Layout';
import { User, Bell, Lock, Palette, Globe, Shield, Mail, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useMessages } from '../context/MessageContext';
import toast from 'react-hot-toast';
import './Settings.css';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { addMessage } = useMessages();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    twoFactor: false,
    language: 'en',
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Demo: Simulate receiving a new message
  const handleSendDemoMessage = () => {
    const demoMessages = [
      {
        from: 'Sales Team',
        subject: 'Special offer just for you!',
        message: 'We have an exclusive 30% discount on premium products. Don\'t miss out!',
      },
      {
        from: 'Support Team',
        subject: 'Your ticket has been resolved',
        message: 'Good news! Your support ticket #5678 has been successfully resolved.',
      },
      {
        from: 'Product Updates',
        subject: 'New features available',
        message: 'Check out our latest features including advanced analytics and reporting tools.',
      },
      {
        from: 'Order Confirmation',
        subject: 'Order #9876 confirmed',
        message: 'Your order has been confirmed and will be processed within 24 hours.',
      },
    ];

    const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)];
    addMessage(randomMessage);
    toast.success('New message received! Check your messages.');
  };

  return (
    <Layout>
      <div className="settings-page">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and settings</p>
        </div>

        <div className="settings-grid">
          {/* Account Settings */}
          <div className="settings-card">
            <div className="settings-card-header">
              <User size={20} />
              <h3>Account Settings</h3>
            </div>
            <div className="settings-card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Profile Information</h4>
                  <p>Update your personal information</p>
                </div>
                <button className="btn btn-outline btn-sm">Edit</button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Address</h4>
                  <p>user@example.com</p>
                </div>
                <button className="btn btn-outline btn-sm">Change</button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Bell size={20} />
              <h3>Notifications</h3>
            </div>
            <div className="settings-card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive notifications via email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Push Notifications</h4>
                  <p>Receive push notifications</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={() => handleToggle('pushNotifications')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Order Updates</h4>
                  <p>Get notified about order status</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.orderUpdates}
                    onChange={() => handleToggle('orderUpdates')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Promotions</h4>
                  <p>Receive promotional offers</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.promotions}
                    onChange={() => handleToggle('promotions')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Newsletter</h4>
                  <p>Subscribe to our newsletter</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.newsletter}
                    onChange={() => handleToggle('newsletter')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Lock size={20} />
              <h3>Security</h3>
            </div>
            <div className="settings-card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Password</h4>
                  <p>Change your password</p>
                </div>
                <button className="btn btn-outline btn-sm">Update</button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.twoFactor}
                    onChange={() => handleToggle('twoFactor')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Active Sessions</h4>
                  <p>Manage your active sessions</p>
                </div>
                <button className="btn btn-outline btn-sm">View</button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Palette size={20} />
              <h3>Appearance</h3>
            </div>
            <div className="settings-card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Theme</h4>
                  <p>Choose your preferred theme</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Display Mode</h4>
                  <p>Current: {theme === 'dark' ? 'Dark' : 'Light'} Mode</p>
                </div>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Globe size={20} />
              <h3>Language & Region</h3>
            </div>
            <div className="settings-card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Language</h4>
                  <p>Select your preferred language</p>
                </div>
                <select 
                  className="setting-select"
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Time Zone</h4>
                  <p>UTC-8 (Pacific Time)</p>
                </div>
                <button className="btn btn-outline btn-sm">Change</button>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Shield size={20} />
              <h3>Privacy</h3>
            </div>
            <div className="settings-card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Data & Privacy</h4>
                  <p>Manage your data and privacy settings</p>
                </div>
                <button className="btn btn-outline btn-sm">Manage</button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Download Data</h4>
                  <p>Download a copy of your data</p>
                </div>
                <button className="btn btn-outline btn-sm">Download</button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account</p>
                </div>
                <button className="btn btn-outline btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </div>

          {/* Demo: Test Messages */}
          <div className="settings-card">
            <div className="settings-card-header">
              <Mail size={20} />
              <h3>Test Messages (Demo)</h3>
            </div>
            <div className="settings-card-content">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Simulate New Message</h4>
                  <p>Test the message system by receiving a demo message</p>
                </div>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleSendDemoMessage}
                >
                  <Send size={16} />
                  Send Demo Message
                </button>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>How it works</h4>
                  <p>Click the button to receive a random message. The badge count will increase automatically.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn btn-primary">Save Changes</button>
          <button className="btn btn-outline">Cancel</button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
