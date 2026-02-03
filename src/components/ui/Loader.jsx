import React from 'react';
import './Loader.css';

/**
 * Loader Component
 * 
 * Animated loading spinner based on the SorBit logo design
 * Features orbital rings animation with green accent dot
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size variant: 'small', 'medium', 'large' (default: 'medium')
 * @param {string} props.text - Optional loading text to display below spinner
 * @param {boolean} props.fullScreen - If true, displays as fullscreen overlay (default: false)
 */
const Loader = ({ size = 'medium', text = '', fullScreen = false }) => {
  const loaderClasses = [
    'loader',
    `loader--${size}`,
    fullScreen && 'loader--fullscreen'
  ].filter(Boolean).join(' ');

  const content = (
    <div className={loaderClasses}>
      <div className="loader__spinner">
        {/* Outer Ring */}
        <div className="loader__ring loader__ring--outer">
          <svg viewBox="0 0 100 100" className="loader__svg">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="70 213"
              className="loader__circle loader__circle--outer"
            />
          </svg>
        </div>

        {/* Middle Ring */}
        <div className="loader__ring loader__ring--middle">
          <svg viewBox="0 0 100 100" className="loader__svg">
            <circle 
              cx="50" 
              cy="50" 
              r="35" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="50 170"
              className="loader__circle loader__circle--middle"
            />
          </svg>
        </div>

        {/* Inner Ring */}
        <div className="loader__ring loader__ring--inner">
          <svg viewBox="0 0 100 100" className="loader__svg">
            <circle 
              cx="50" 
              cy="50" 
              r="25" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="30 127"
              className="loader__circle loader__circle--inner"
            />
          </svg>
        </div>

        {/* Center Blue Circle */}
        <div className="loader__center">
          <svg viewBox="0 0 100 100" className="loader__svg">
            <circle 
              cx="50" 
              cy="50" 
              r="12" 
              fill="currentColor"
              className="loader__center-circle"
            />
          </svg>
        </div>

        {/* Green Accent Dot (orbiting) */}
        <div className="loader__accent-dot">
          <svg viewBox="0 0 100 100" className="loader__svg">
            <circle 
              cx="50" 
              cy="5" 
              r="5" 
              fill="#22C55E"
              className="loader__dot"
            />
          </svg>
        </div>

        {/* Small Blue Square (bottom-left accent) */}
        <div className="loader__square">
          <svg viewBox="0 0 100 100" className="loader__svg">
            <rect 
              x="8" 
              y="70" 
              width="8" 
              height="8" 
              fill="currentColor"
              rx="1"
              className="loader__square-element"
            />
          </svg>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <p className="loader__text">{text}</p>
      )}
    </div>
  );

  return fullScreen ? (
    <div className="loader__overlay">
      {content}
    </div>
  ) : content;
};

export default Loader;