import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { getUserSettings, updateUserSettings } from '../services/api';
import { useTheme } from '../hooks/useTheme';
import './Settings.css';

const Settings = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: '',
      email: '',
      company: '',
      role: '',
    },
    preferences: {
      notifications: true,
      emailAlerts: true,
      currency: 'USD',
      language: 'en',
    },
    security: {
      twoFactorEnabled: false,
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getUserSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateUserSettings(settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )},
    { id: 'preferences', label: 'Preferences', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )},
    { id: 'security', label: 'Security', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
    { id: 'billing', label: 'Billing', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="14" x="2" y="5" rx="2"/>
        <path d="M2 10h20" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )},
  ];

  if (loading) {
    return (
      <div className="settings">
        <div className="settings__loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="settings">
      {/* Header */}
      <div className="settings__header">
        <div>
          <h1 className="settings__title">Settings</h1>
          <p className="settings__subtitle">Manage your account and preferences</p>
        </div>
        <Button variant="primary" onClick={handleSave} loading={saving}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 21v-8H7v8M7 3v5h8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Save Changes
        </Button>
      </div>

      <div className="settings__container">
        {/* Tabs */}
        <div className="settings__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings__tab ${activeTab === tab.id ? 'settings__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="settings__tab-icon">{tab.icon}</span>
              <span className="settings__tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="settings__content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card title="Profile Information" subtitle="Update your personal information">
              <div className="settings__form">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={settings.profile.name}
                  onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={settings.profile.email}
                  onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                />
                <Input
                  label="Company"
                  placeholder="Enter your company name"
                  value={settings.profile.company}
                  onChange={(e) => handleInputChange('profile', 'company', e.target.value)}
                />
                <Input
                  label="Role"
                  placeholder="Enter your role"
                  value={settings.profile.role}
                  onChange={(e) => handleInputChange('profile', 'role', e.target.value)}
                />
              </div>
            </Card>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <>
              <Card title="Appearance" subtitle="Customize your visual preferences">
                <div className="settings__section">
                  <div className="settings__option">
                    <div className="settings__option-info">
                      <h4 className="settings__option-title">Theme</h4>
                      <p className="settings__option-description">
                        Choose between light and dark mode
                      </p>
                    </div>
                    <div className="settings__option-control">
                      <Button
                        variant={!isDark ? 'primary' : 'secondary'}
                        size="small"
                        onClick={() => !isDark || toggleTheme()}
                      >
                        Light
                      </Button>
                      <Button
                        variant={isDark ? 'primary' : 'secondary'}
                        size="small"
                        onClick={() => isDark || toggleTheme()}
                      >
                        Dark
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Notifications" subtitle="Manage your notification preferences">
                <div className="settings__section">
                  <div className="settings__option">
                    <div className="settings__option-info">
                      <h4 className="settings__option-title">Push Notifications</h4>
                      <p className="settings__option-description">
                        Receive notifications about important updates
                      </p>
                    </div>
                    <div className="settings__option-control">
                      <label className="settings__toggle">
                        <input
                          type="checkbox"
                          checked={settings.preferences.notifications}
                          onChange={(e) => handleInputChange('preferences', 'notifications', e.target.checked)}
                        />
                        <span className="settings__toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="settings__option">
                    <div className="settings__option-info">
                      <h4 className="settings__option-title">Email Alerts</h4>
                      <p className="settings__option-description">
                        Get email notifications for campaign updates
                      </p>
                    </div>
                    <div className="settings__option-control">
                      <label className="settings__toggle">
                        <input
                          type="checkbox"
                          checked={settings.preferences.emailAlerts}
                          onChange={(e) => handleInputChange('preferences', 'emailAlerts', e.target.checked)}
                        />
                        <span className="settings__toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Localization" subtitle="Set your language and currency preferences">
                <div className="settings__form">
                  <div className="settings__form-group">
                    <label className="settings__label">Currency</label>
                    <select
                      className="settings__select"
                      value={settings.preferences.currency}
                      onChange={(e) => handleInputChange('preferences', 'currency', e.target.value)}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>

                  <div className="settings__form-group">
                    <label className="settings__label">Language</label>
                    <select
                      className="settings__select"
                      value={settings.preferences.language}
                      onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <>
              <Card title="Password" subtitle="Update your password">
                <div className="settings__form">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                  <Button variant="primary">Update Password</Button>
                </div>
              </Card>

              <Card title="Two-Factor Authentication" subtitle="Add an extra layer of security">
                <div className="settings__section">
                  <div className="settings__option">
                    <div className="settings__option-info">
                      <h4 className="settings__option-title">Two-Factor Authentication</h4>
                      <p className="settings__option-description">
                        Protect your account with 2FA
                        {settings.security.twoFactorEnabled && (
                          <Badge variant="success" size="small" className="settings__badge">Enabled</Badge>
                        )}
                      </p>
                    </div>
                    <div className="settings__option-control">
                      <Button
                        variant={settings.security.twoFactorEnabled ? 'danger' : 'primary'}
                        size="small"
                        onClick={() => handleInputChange('security', 'twoFactorEnabled', !settings.security.twoFactorEnabled)}
                      >
                        {settings.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Sessions" subtitle="Manage your active sessions">
                <div className="settings__sessions">
                  <div className="settings__session">
                    <div className="settings__session-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="settings__session-info">
                      <h4 className="settings__session-device">Chrome on MacOS</h4>
                      <p className="settings__session-location">Accra, Ghana • Current Session</p>
                    </div>
                    <Badge variant="success" dot />
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <>
              <Card title="Current Plan" subtitle="Manage your subscription">
                <div className="settings__plan">
                  <div className="settings__plan-info">
                    <h3 className="settings__plan-name">Professional Plan</h3>
                    <p className="settings__plan-price">$49/month</p>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
              </Card>

              <Card title="Payment Method" subtitle="Manage your payment information">
                <div className="settings__payment">
                  <div className="settings__payment-card">
                    <div className="settings__payment-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="14" x="2" y="5" rx="2"/>
                        <path d="M2 10h20" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="settings__payment-info">
                      <h4 className="settings__payment-type">Visa ending in 4242</h4>
                      <p className="settings__payment-expiry">Expires 12/2026</p>
                    </div>
                    <Button variant="ghost" size="small">Edit</Button>
                  </div>
                  <Button variant="outline">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14m7-7H5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Payment Method
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;