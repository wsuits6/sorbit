import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useTheme } from '../../hooks/useTheme';
import './Layout.css';

const Layout = ({ navigationItems, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose}
        navigationItems={navigationItems}
      />
      
      <div className="layout__main">
        <Topbar 
          onMenuClick={handleMenuClick}
          onThemeToggle={toggleTheme}
          isDarkMode={isDark}
          user={user}
        />
        
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;