import React from 'react';
import './StatCard.css';

/**
 * StatCard Component
 * 
 * Reusable stat card for displaying metrics
 * Used in Desktop Dashboard
 * 
 * @param {Object} icon - SVG icon element
 * @param {String} label - Stat label (e.g., "Total Followers")
 * @param {String|Number} value - Main stat value
 * @param {Number} change - Percentage change (positive or negative)
 * @param {String} color - Accent color for the card
 */
const StatCard = ({ icon, label, value, change, color = '#0066F5' }) => {
  const isPositive = change > 0;
  const isNegative = change < 0;

  return (
    <div className="stat-card" style={{ '--stat-color': color }}>
      <div className="stat-card__icon" style={{ background: `${color}15`, color: color }}>
        {icon}
      </div>
      
      <div className="stat-card__content">
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__label">{label}</div>
        
        {change !== null && change !== undefined && (
          <div className={`stat-card__change ${isPositive ? 'stat-card__change--up' : isNegative ? 'stat-card__change--down' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isPositive ? (
                <path d="m18 15-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              ) : isNegative ? (
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
            <span>{Math.abs(change)}%</span>
            <span className="stat-card__change-label">this week</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;