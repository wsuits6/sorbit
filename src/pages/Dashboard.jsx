import React, { useState, useEffect } from 'react';
import StatCard from '../components/cards/StatCard';
import './Dashboard.css';

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
const Dashboard = () => {
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
      instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2"/>
        </svg>
      ),
      facebook: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      twitter: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      linkedin: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
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
        <button className="dashboard-desktop__cta-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m-7-7h14" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              label="Total Followers"
              value={formatNumber(stats.totalFollowers)}
              change={stats.followersGrowth}
              color="#0066F5"
            />

            <StatCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  <path d="M2 12h20"/>
                </svg>
              }
              label="Total Reach"
              value={formatNumber(stats.totalReach)}
              change={stats.reachGrowth}
              color="#00C853"
            />

            <StatCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              }
              label="Engagement Rate"
              value={`${stats.engagement}%`}
              change={stats.engagementGrowth}
              color="#F44336"
            />

            <StatCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              }
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
            <button className="dashboard-desktop__view-btn">View All →</button>
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                    <div className="dashboard-desktop__stat-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span>{post.comments}</span>
                    </div>
                    <div className={`dashboard-desktop__trend dashboard-desktop__trend--${post.trend}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {post.trend === 'up' ? (
                          <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : (
                          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                      </svg>
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
            <button className="dashboard-desktop__action-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              </svg>
              <span>Schedule Post</span>
            </button>
            <button className="dashboard-desktop__action-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 17V9m-5 8V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>View Analytics</span>
            </button>
            <button className="dashboard-desktop__action-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>Connect Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;