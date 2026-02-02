/**
 * Format number with commas as thousand separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format number as currency
 * @param {number} num - The number to format
 * @param {string} currency - Currency symbol (default: '$')
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (num, currency = '$', decimals = 2) => {
  if (num === null || num === undefined) return `${currency}0.00`;
  return `${currency}${parseFloat(num).toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Format number with K, M, B suffix
 * @param {number} num - The number to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted number string with suffix
 */
export const formatCompactNumber = (num, decimals = 1) => {
  if (num === null || num === undefined) return '0';
  
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 1e9) {
    return sign + (absNum / 1e9).toFixed(decimals) + 'B';
  }
  if (absNum >= 1e6) {
    return sign + (absNum / 1e6).toFixed(decimals) + 'M';
  }
  if (absNum >= 1e3) {
    return sign + (absNum / 1e3).toFixed(decimals) + 'K';
  }
  
  return sign + absNum.toString();
};

/**
 * Format percentage
 * @param {number} num - The number to format as percentage
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (num, decimals = 1) => {
  if (num === null || num === undefined) return '0%';
  return `${parseFloat(num).toFixed(decimals)}%`;
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes) return 'N/A';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * Format date to readable string
 * @param {Date|string|number} date - The date to format
 * @param {boolean} includeTime - Whether to include time (default: false)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return d.toLocaleDateString('en-US', options);
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string|number} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};