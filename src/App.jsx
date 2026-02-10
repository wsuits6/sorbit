                    //                %%%%%%                                   
                    //           %%%%%%%%%%%%%%%%%                             
                    //        %%%%%          %%%%%% %%##%                      
                    //      %%%%     %%%%%%%%%%    %#####%                     
                    //    %%%    %%%%%%%%%   %%    %######                     
                    //   %%%  %%%%%%       %%%%     %###%                      
                    //  %%%  %%%%%            %%%%      %%                     
                    //  %% %%%%%     %%%%%%%%   %%%%%  %%%                     
                    //  %% %%%%%    %%%%%%%%%%    %%%%%%%%%                    
                    //  % %%%%%    %%%%%%%%%%%%    %%%%%%%%                    
                    //    %%%%%    %%%%%%%%%%%%    %%%%%%%%                    
                    //    %%%%%%    %%%%%%%%%%      %%%%%%                     
                    //    %%%%%%%     %%%%%%%      %%%%%%%                     
                    //  %%%%% %%%%%              %%%%%%%%                      
                    //  %%%%%@ %%%%%%%%        %%%%%%%%%                       
                    //  %%%%%@%%   %%%%%%  %%%%%%%%%%%                         
                    //         %%%%%%%%%%%%%%%%%%%%%                           
                    //            %%%%%%%%%%%%%%          
                    // 
                    // ================================
                    // SORBIT by the sorbit Team
                                                                            
                                                                            
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ResponsiveLayout from './components/layout/ResponsiveLayout';
import Hero from './components/layout/Hero';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardDesktop from './pages/dashboard/desktop/DashboardDesktop';
import PostComposer from './pages/PostComposer';
import Accounts from './pages/Accounts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

// Mock user data
const mockUser = {
  name: 'Alhassan Ibrahim',
  email: 'alhassan.ibrahim@sorbit.com',
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
          <Route path="/desktop/dashboard" element={<DashboardDesktop />} />
          <Route path="/desktop/accounts" element={<Accounts />} />
          <Route path="/desktop/analytics" element={<Analytics />} />
          <Route path="/desktop/settings" element={<Settings />} />
        </Route>

        {/* ============================================
            RESPONSIVE ROUTES - Auto switch Layout by screen size
            ============================================ */}
        <Route element={<ResponsiveLayout user={mockUser} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<PostComposer />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* ============================================
            RESPONSIVE ENTRY
            ============================================ */}
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />

        {/* ============================================
            FALLBACK - 404 Redirect
            ============================================ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
