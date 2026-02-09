import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBarChart2,
  FiCalendar,
  FiChevronRight,
  FiGlobe,
  FiHeart,
  FiLink,
  FiMessageCircle,
  FiMessageSquare,
  FiPlus,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import StatCard from '../../../components/cards/StatCard';
import './DashboardDesktop.css';

/**
 * Dashboard Component - Desktop Optimized
 * 
 * Features from NewDashboard but optimized for desktop:
 * - Multi-column grid layout
 * - Larger stat cards
 * - More data visible at once
 * - Desktop-friendly interactions
 * - All mobile features retained
 */
const DashboardDesktop = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [quickStats, setQuickStats] = useState(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalFollowers: 45230,
        followersGrowth: 12.5,
        totalReach: 128400,
        reachGrowth: 8.3,
        engagement: 6.8,
        engagementGrowth: -2.1,
        postsThisWeek: 12,
        postsThisMonth: 48
      });

      setQuickStats({
        scheduledPosts: 8,
        connectedAccounts: 5,
        topPlatform: 'Instagram',
        avgEngagement: 6.8
      });

      setRecentPosts([
        {
          id: 1,
          platform: 'instagram',
          content: 'Check out our latest product launch! 🚀 Amazing features coming your way.',
          time: '2h ago',
          likes: 234,
          comments: 45,
          shares: 12,
          trend: 'up',
          reach: 3400
        },
        {
          id: 2,
          platform: 'facebook',
          content: 'Behind the scenes of our photoshoot today! Stay tuned for more.',
          time: '5h ago',
          likes: 156,
          comments: 23,
          shares: 8,
          trend: 'up',
          reach: 2100
        },
        {
          id: 3,
          platform: 'twitter',
          content: 'Excited to announce our partnership with amazing brands! 🎉',
          time: '1d ago',
          likes: 89,
          comments: 12,
          shares: 34,
          trend: 'down',
          reach: 1800
        },
        {
          id: 4,
          platform: 'linkedin',
          content: 'Our CEO shares insights on digital transformation in 2026',
          time: '1d ago',
          likes: 342,
          comments: 67,
          shares: 89,
          trend: 'up',
          reach: 5600
        }
      ]);

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getPlatformIcon = (platform) => {
    const icons = {
      instagram: <FaInstagram />,
      facebook: <FaFacebookF />,
      twitter: <FaTwitter />,
      linkedin: <FaLinkedinIn />,
    };
    return icons[platform] || icons.instagram;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="dashboard-desktop">
      {/* Welcome Section */}
      <div className="dashboard-desktop__header">
        <div>
          <h1 className="dashboard-desktop__title">Welcome back! 👋</h1>
          <p className="dashboard-desktop__subtitle">Here's what's happening with your social media</p>
        </div>
        <button className="dashboard-desktop__cta-btn" onClick={() => navigate('/post')}>
          <FiPlus />
          <span>Create Post</span>
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="dashboard-desktop__stats-grid">
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="dashboard-desktop__stat-card">
                <div className="skeleton skeleton-circle" style={{ width: '56px', height: '56px' }}></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text" style={{ width: '100%', marginTop: '12px' }}></div>
                  <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <StatCard
              icon={<FiUsers />}
              label="Total Followers"
              value={formatNumber(stats.totalFollowers)}
              change={stats.followersGrowth}
              color="#0066F5"
            />

            <StatCard
              icon={<FiGlobe />}
              label="Total Reach"
              value={formatNumber(stats.totalReach)}
              change={stats.reachGrowth}
              color="#00C853"
            />

            <StatCard
              icon={<FiHeart />}
              label="Engagement Rate"
              value={`${stats.engagement}%`}
              change={stats.engagementGrowth}
              color="#F44336"
            />

            <StatCard
              icon={<FiMessageSquare />}
              label="Posts This Week"
              value={stats.postsThisWeek}
              change={null}
              color="#FF9800"
            />
          </>
        )}
      </div>

      {/* Content Grid - Two Columns */}
      <div className="dashboard-desktop__content-grid">
        {/* Recent Posts */}
        <div className="dashboard-desktop__section">
          <div className="dashboard-desktop__section-header">
            <h2>Recent Posts</h2>
            <button className="dashboard-desktop__view-btn" onClick={() => navigate('/post')}>
              View All <FiChevronRight />
            </button>
          </div>

          <div className="dashboard-desktop__posts-list">
            {loading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="dashboard-desktop__post-card">
                    <div className="skeleton skeleton-circle" style={{ width: '48px', height: '48px' }}></div>
                    <div style={{ flex: 1 }}>
                      <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
                      <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              recentPosts.map((post) => (
                <div key={post.id} className="dashboard-desktop__post-card">
                  <div className={`dashboard-desktop__post-platform dashboard-desktop__post-platform--${post.platform}`}>
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="dashboard-desktop__post-content">
                    <p className="dashboard-desktop__post-text">{post.content}</p>
                    <div className="dashboard-desktop__post-meta">
                      <span className="dashboard-desktop__post-time">{post.time}</span>
                      <span className="dashboard-desktop__post-divider">•</span>
                      <span className="dashboard-desktop__post-reach">{formatNumber(post.reach)} reach</span>
                    </div>
                  </div>
                  <div className="dashboard-desktop__post-stats">
                    <div className="dashboard-desktop__stat-item">
                      <FiHeart />
                      <span>{post.likes}</span>
                    </div>
                    <div className="dashboard-desktop__stat-item">
                      <FiMessageCircle />
                      <span>{post.comments}</span>
                    </div>
                    <div className={`dashboard-desktop__trend dashboard-desktop__trend--${post.trend}`}>
                      {post.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="dashboard-desktop__sidebar">
          {/* Quick Stats */}
          <div className="dashboard-desktop__quick-stats">
            <h3>Quick Stats</h3>
            {loading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="dashboard-desktop__quick-stat">
                    <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="dashboard-desktop__quick-stat">
                  <span className="dashboard-desktop__quick-label">Scheduled Posts</span>
                  <span className="dashboard-desktop__quick-value">{quickStats.scheduledPosts}</span>
                </div>
                <div className="dashboard-desktop__quick-stat">
                  <span className="dashboard-desktop__quick-label">Connected Accounts</span>
                  <span className="dashboard-desktop__quick-value">{quickStats.connectedAccounts}</span>
                </div>
                <div className="dashboard-desktop__quick-stat">
                  <span className="dashboard-desktop__quick-label">Top Platform</span>
                  <span className="dashboard-desktop__quick-value">{quickStats.topPlatform}</span>
                </div>
                <div className="dashboard-desktop__quick-stat">
                  <span className="dashboard-desktop__quick-label">Avg. Engagement</span>
                  <span className="dashboard-desktop__quick-value">{quickStats.avgEngagement}%</span>
                </div>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="dashboard-desktop__quick-actions">
            <h3>Quick Actions</h3>
            <button className="dashboard-desktop__action-item" onClick={() => navigate('/post')}>
              <FiCalendar />
              <span>Schedule Post</span>
            </button>
            <button className="dashboard-desktop__action-item" onClick={() => navigate('/analytics')}>
              <FiBarChart2 />
              <span>View Analytics</span>
            </button>
            <button className="dashboard-desktop__action-item" onClick={() => navigate('/accounts')}>
              <FiLink />
              <span>Connect Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
