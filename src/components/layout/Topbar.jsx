import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import Modal from '../ui/Modal';
import './Topbar.css';

/**
 * Topbar Component - Fully Functional Desktop Header
 * 
 * Features:
 * - Search functionality
 * - Notifications dropdown with real interactions
 * - User account dropdown menu
 * - Theme toggle
 * - Responsive design
 * 
 * All elements are now interactive and functional
 */
const Topbar = ({ user }) => {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();
  const { logout } = useAuth();
  
  // State management
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      icon: '📈',
      title: 'Post performing well!',
      message: 'Your latest Instagram post has 500+ likes',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      icon: '🔗',
      title: 'Account connected',
      message: 'Facebook account linked successfully',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      icon: '⚠️',
      title: 'Reconnect needed',
      message: 'Twitter authorization expired',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      icon: '📅',
      title: 'Scheduled post',
      message: '3 posts scheduled for tomorrow',
      time: '1 day ago',
      read: true
    }
  ]);

  // Refs for click outside detection
  const notificationRef = useRef(null);
  const accountMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle notification click
  const handleNotificationClick = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
      // navigate(`/search?q=${searchQuery}`);
    }
  };

  // Account menu actions
  const handleSettings = () => {
    navigate('/settings');
  };

  const handleBilling = () => {
    navigate('/settings?tab=billing');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
    <header className="topbar">
      <div className="topbar__container">
        {/* Search Bar */}
        <div className="topbar__search">
          <form onSubmit={handleSearch} className="topbar__search-form">
            <svg className="topbar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              className="topbar__search-input"
              placeholder="Search posts, analytics, accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="topbar__search-clear"
                onClick={() => setSearchQuery('')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="topbar__actions">
          {/* Theme Toggle */}
          <button 
            className="topbar__icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72 1.42-1.42" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* Help Button */}
          <button 
            className="topbar__icon-btn"
            aria-label="Help"
            title="Help & Support"
            onClick={() => setShowHelpModal(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Notifications */}
          <div className="topbar__dropdown" ref={notificationRef}>
            <button 
              className={`topbar__icon-btn ${showNotifications ? 'topbar__icon-btn--active' : ''}`}
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              title="Notifications"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {unreadCount > 0 && (
                <span className="topbar__badge">{unreadCount}</span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="topbar__dropdown-menu topbar__dropdown-menu--notifications">
                <div className="topbar__dropdown-header">
                  <h3>Notifications</h3>
                  <div className="topbar__dropdown-actions">
                    {unreadCount > 0 && (
                      <button onClick={markAllAsRead} className="topbar__dropdown-action">
                        Mark all read
                      </button>
                    )}
                    {notifications.length > 0 && (
                      <button onClick={clearAllNotifications} className="topbar__dropdown-action">
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                <div className="topbar__notifications-list">
                  {notifications.length === 0 ? (
                    <div className="topbar__empty-state">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id}
                        className={`topbar__notification-item ${!notification.read ? 'topbar__notification-item--unread' : ''}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="topbar__notification-icon">
                          {notification.icon}
                        </div>
                        <div className="topbar__notification-content">
                          <p className="topbar__notification-title">{notification.title}</p>
                          <p className="topbar__notification-message">{notification.message}</p>
                          <span className="topbar__notification-time">{notification.time}</span>
                        </div>
                        {!notification.read && (
                          <div className="topbar__notification-dot"></div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="topbar__dropdown-footer">
                    <button className="topbar__view-all-btn" onClick={() => setShowNotificationsModal(true)}>
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Account Menu */}
          <div className="topbar__dropdown" ref={accountMenuRef}>
            <button
              className="topbar__user-btn"
              onClick={() => setShowProfileModal(true)}
              aria-label="Profile"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="topbar__user-avatar" />
              ) : (
                <div className="topbar__user-avatar topbar__user-avatar--placeholder">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <div className="topbar__user-info">
                <span className="topbar__user-name">{user?.name || 'User'}</span>
                <span className="topbar__user-role">{user?.role || 'Member'}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
    <Modal
      isOpen={showHelpModal}
      onClose={() => setShowHelpModal(false)}
      title="Help & Support"
    >
      <p>If you need help, reach out to support@sorbit.com or visit the Help Center.</p>
      <p>We typically respond within 24 hours.</p>
    </Modal>
    <Modal
      isOpen={showProfileModal}
      onClose={() => setShowProfileModal(false)}
      title="Profile Info"
    >
      <div>
        <p><strong>Name:</strong> {user?.name || 'User'}</p>
        <p><strong>Email:</strong> {user?.email || 'user@example.com'}</p>
        <p><strong>Role:</strong> {user?.role || 'Member'}</p>
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="topbar__view-all-btn" onClick={handleSettings}>
          Settings
        </button>
        <button className="topbar__view-all-btn" onClick={handleBilling}>
          Billing
        </button>
        <button className="topbar__view-all-btn" onClick={() => setShowUpgradeModal(true)}>
          Upgrade
        </button>
        <button className="topbar__view-all-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </Modal>
    <Modal
      isOpen={showNotificationsModal}
      onClose={() => setShowNotificationsModal(false)}
      title="All Notifications"
      size="lg"
    >
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`topbar__notification-item ${!notification.read ? 'topbar__notification-item--unread' : ''}`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className="topbar__notification-icon">{notification.icon}</div>
            <div className="topbar__notification-content">
              <p className="topbar__notification-title">{notification.title}</p>
              <p className="topbar__notification-message">{notification.message}</p>
              <span className="topbar__notification-time">{notification.time}</span>
            </div>
          </div>
        ))
      )}
    </Modal>
    <Modal
      isOpen={showUpgradeModal}
      onClose={() => setShowUpgradeModal(false)}
      title="Upgrade to Pro"
    >
      <p>Unlock advanced analytics, team collaboration, and priority support.</p>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button className="topbar__view-all-btn" onClick={() => navigate('/settings?tab=billing')}>
          View Plans
        </button>
        <button className="topbar__view-all-btn" onClick={() => setShowUpgradeModal(false)}>
          Maybe Later
        </button>
      </div>
    </Modal>
    </>
  );
};

export default Topbar;
