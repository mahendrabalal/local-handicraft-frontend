import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-content">
            <h2>Profile Settings</h2>
            <label>
              Name:
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email:
              <input type="email" placeholder="Your email" />
            </label>
            <button className="save-button">Save Changes</button>
          </div>
        );
      case 'account':
        return (
          <div className="settings-content">
            <h2>Account Settings</h2>
            <label>
              Change Password:
              <input type="password" placeholder="New password" />
            </label>
            <label>
              Confirm Password:
              <input type="password" placeholder="Confirm new password" />
            </label>
            <button className="save-button">Update Password</button>
          </div>
        );
      case 'notifications':
        return (
          <div className="settings-content">
            <h2>Notification Settings</h2>
            <label>
              <input type="checkbox" />
              Email Notifications
            </label>
            <label>
              <input type="checkbox" />
              SMS Notifications
            </label>
            <button className="save-button">Save Preferences</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <ul>
          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </li>
          <li
            className={activeTab === 'account' ? 'active' : ''}
            onClick={() => setActiveTab('account')}
          >
            Account
          </li>
          <li
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </li>
        </ul>
      </div>
      <div className="settings-main">
        {renderContent()}
      </div>
    </div>
  );
}

export default Settings;
