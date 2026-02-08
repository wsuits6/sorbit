import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MobileLayout from './components/layout/MobileLayout';
import Hero from './components/layout/Hero';
import Dashboard from './pages/Dashboard';
import NewDashboard from './pages/NewDashboard';
import PostComposer from './pages/PostComposer';
import Accounts from './pages/Accounts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Admin',
  avatar: null,
};

/**
 * App Component - Main Application Router
 * 
 * Routing Strategy:
 * - Public routes: Hero, Login, Register
 * - Desktop routes: Use Layout (with Sidebar + Topbar) for desktop screens
 * - Mobile routes: Use MobileLayout (with Bottom Nav) for mobile screens
 * - Responsive switching handled by CSS and component logic
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* ============================================
            PUBLIC ROUTES
            ============================================ */}
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* ============================================
            DESKTOP ROUTES - Layout with Sidebar + Topbar
            Uses OLD Dashboard (now optimized for desktop)
            ============================================ */}
        <Route element={<Layout user={mockUser} />}>
          <Route path="/desktop/dashboard" element={<Dashboard />} />
          <Route path="/desktop/accounts" element={<Accounts />} />
          <Route path="/desktop/analytics" element={<Analytics />} />
          <Route path="/desktop/settings" element={<Settings />} />
        </Route>

        {/* ============================================
            MOBILE ROUTES - MobileLayout with Bottom Nav
            Uses NEW Dashboard (mobile-first)
            ============================================ */}
        <Route element={<MobileLayout user={mockUser} />}>
          <Route path="/dashboard" element={<NewDashboard />} />
          <Route path="/post" element={<PostComposer />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* ============================================
            RESPONSIVE AUTO-ROUTING
            Redirects based on screen size
            Desktop (>1024px) → /desktop/dashboard
            Mobile (≤1024px) → /dashboard
            ============================================ */}
        <Route 
          path="/app" 
          element={
            <ResponsiveRedirect 
              desktopPath="/desktop/dashboard" 
              mobilePath="/dashboard" 
            />
          } 
        />

        {/* ============================================
            FALLBACK - 404 Redirect
            ============================================ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

/**
 * ResponsiveRedirect Component
 * 
 * Automatically redirects users to desktop or mobile routes
 * based on their screen size
 */
const ResponsiveRedirect = ({ desktopPath, mobilePath }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <Navigate to={isMobile ? mobilePath : desktopPath} replace />;
};

export default App;