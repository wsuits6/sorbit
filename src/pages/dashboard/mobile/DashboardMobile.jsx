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
  FiPlus,
  FiTrendingDown,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import './DashboardMobile.css';

/**
 * NewDashboard Component - Africa-Optimized
 * 
 * Mobile-first dashboard with:
 * - Key metrics only (no clutter)
 * - Large, readable numbers
 * - One-tap "Create Post" CTA
 * - Simple performance preview
 * - Skeleton loaders (no spinners)
 * 
 * Design Philosophy:
 * - Show what matters most
 * - Hide complexity
 * - Fast loading with progressive enhancement
 */
const DashboardMobile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  // Simulate data loading
  useEffect(() => {
    // Simulate API call with delay
    const timer = setTimeout(() => {
      setStats({
        totalFollowers: 45230,
        followersGrowth: 12.5,
        totalReach: 128400,
        reachGrowth: 8.3,
        engagement: 6.8,
        engagementGrowth: -2.1,
        postsThisWeek: 12
      });

      setRecentPosts([
        {
          id: 1,
          platform: 'instagram',
          content: 'Check out our latest product launch! 🚀',
          time: '2h ago',
          likes: 234,
          comments: 45,
          shares: 12,
          trend: 'up'
        },
        {
          id: 2,
          platform: 'facebook',
          content: 'Behind the scenes of our photoshoot',
          time: '5h ago',
          likes: 156,
          comments: 23,
          shares: 8,
          trend: 'up'
        },
        {
          id: 3,
          platform: 'twitter',
          content: 'Excited to announce our partnership with...',
          time: '1d ago',
          likes: 89,
          comments: 12,
          shares: 34,
          trend: 'down'
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
    };
    return icons[platform] || icons.instagram;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="dashboard">
      {/* Welcome Header */}
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Welcome back! 👋</h1>
          <p className="dashboard__subtitle">Here's what's happening with your accounts</p>
        </div>
      </div>

      {/* Primary CTA - Create Post */}
      <div className="dashboard__cta">
        <button className="dashboard__create-btn" onClick={() => navigate('/post')}>
          <div className="dashboard__create-icon">
            <FiPlus />
          </div>
          <div className="dashboard__create-text">
            <span className="dashboard__create-label">Create New Post</span>
            <span className="dashboard__create-hint">Share to all platforms</span>
          </div>
          <FiChevronRight className="dashboard__create-arrow" />
        </button>
      </div>

      {/* Key Metrics */}
      <div className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Your Stats</h2>
          <button className="dashboard__view-all" onClick={() => navigate('/analytics')}>
            View All
            <FiChevronRight />
          </button>
        </div>

        <div className="dashboard__metrics">
          {loading ? (
            <>
              <div className="dashboard__metric-card">
                <div className="skeleton skeleton-circle" style={{ width: '48px', height: '48px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '100%', marginTop: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
              </div>
              <div className="dashboard__metric-card">
                <div className="skeleton skeleton-circle" style={{ width: '48px', height: '48px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '100%', marginTop: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
              </div>
              <div className="dashboard__metric-card">
                <div className="skeleton skeleton-circle" style={{ width: '48px', height: '48px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '100%', marginTop: '12px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
              </div>
            </>
          ) : (
            <>
              {/* Followers */}
              <div className="dashboard__metric-card">
                <div className="dashboard__metric-icon dashboard__metric-icon--followers">
                  <FiUsers />
                </div>
                <div className="dashboard__metric-content">
                  <div className="dashboard__metric-value">{formatNumber(stats.totalFollowers)}</div>
                  <div className="dashboard__metric-label">Total Followers</div>
                  <div className={`dashboard__metric-change ${stats.followersGrowth > 0 ? 'dashboard__metric-change--up' : 'dashboard__metric-change--down'}`}>
                    {stats.followersGrowth > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                    {Math.abs(stats.followersGrowth)}% this week
                  </div>
                </div>
              </div>

              {/* Reach */}
              <div className="dashboard__metric-card">
                <div className="dashboard__metric-icon dashboard__metric-icon--reach">
                  <FiGlobe />
                </div>
                <div className="dashboard__metric-content">
                  <div className="dashboard__metric-value">{formatNumber(stats.totalReach)}</div>
                  <div className="dashboard__metric-label">Total Reach</div>
                  <div className={`dashboard__metric-change ${stats.reachGrowth > 0 ? 'dashboard__metric-change--up' : 'dashboard__metric-change--down'}`}>
                    {stats.reachGrowth > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                    {Math.abs(stats.reachGrowth)}% this week
                  </div>
                </div>
              </div>

              {/* Engagement */}
              <div className="dashboard__metric-card">
                <div className="dashboard__metric-icon dashboard__metric-icon--engagement">
                  <FiHeart />
                </div>
                <div className="dashboard__metric-content">
                  <div className="dashboard__metric-value">{stats.engagement}%</div>
                  <div className="dashboard__metric-label">Engagement Rate</div>
                  <div className={`dashboard__metric-change ${stats.engagementGrowth > 0 ? 'dashboard__metric-change--up' : 'dashboard__metric-change--down'}`}>
                    {stats.engagementGrowth > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                    {Math.abs(stats.engagementGrowth)}% this week
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recent Posts Performance */}
      <div className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Recent Posts</h2>
          <button className="dashboard__view-all" onClick={() => navigate('/post')}>
            View All
            <FiChevronRight />
          </button>
        </div>

        <div className="dashboard__posts">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="dashboard__post-card">
                  <div className="skeleton skeleton-circle" style={{ width: '40px', height: '40px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="dashboard__post-card">
                <div className={`dashboard__post-platform dashboard__post-platform--${post.platform}`}>
                  {getPlatformIcon(post.platform)}
                </div>
                <div className="dashboard__post-content">
                  <p className="dashboard__post-text">{post.content}</p>
                  <span className="dashboard__post-time">{post.time}</span>
                </div>
                  <div className="dashboard__post-stats">
                    <div className="dashboard__post-stat">
                      <FiHeart />
                      <span>{post.likes}</span>
                    </div>
                    <div className="dashboard__post-stat">
                      <FiMessageCircle />
                      <span>{post.comments}</span>
                    </div>
                    <div className={`dashboard__post-trend ${post.trend === 'up' ? 'dashboard__post-trend--up' : 'dashboard__post-trend--down'}`}>
                      {post.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard__section">
        <h2 className="dashboard__section-title">Quick Actions</h2>
        <div className="dashboard__quick-actions">
          <button className="dashboard__action-btn" onClick={() => navigate('/post')}>
            <div className="dashboard__action-icon">
              <FiCalendar />
            </div>
            <span>Schedule Post</span>
          </button>

          <button className="dashboard__action-btn" onClick={() => navigate('/analytics')}>
            <div className="dashboard__action-icon">
              <FiBarChart2 />
            </div>
            <span>View Analytics</span>
          </button>

          <button className="dashboard__action-btn" onClick={() => navigate('/accounts')}>
            <div className="dashboard__action-icon">
              <FiLink />
            </div>
            <span>Connect Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardMobile;
