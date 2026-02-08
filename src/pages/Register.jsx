import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Loader from '../components/ui/Loader';
import './Register.css';

/**
 * Register Page Component
 * 
 * Provides user registration interface with:
 * - Full name, email, password registration form
 * - Password strength indicator
 * - Social media registration options (Google, Facebook, Twitter)
 * - Terms and conditions acceptance
 * - Link to login page
 * - Theme toggle support
 * - Form validation
 */
const Register = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const { register } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await register(formData.fullName.trim(), formData.email, formData.password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrors({ submit: error?.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle social registration
  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
    // Implement social registration logic here
  };

  // Get password strength label and color
  const getPasswordStrengthInfo = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { label: 'Weak', color: '#EF4444', width: '20%' };
      case 2:
        return { label: 'Fair', color: '#F59E0B', width: '40%' };
      case 3:
        return { label: 'Good', color: '#3B82F6', width: '60%' };
      case 4:
        return { label: 'Strong', color: '#10B981', width: '80%' };
      case 5:
        return { label: 'Very Strong', color: '#22C55E', width: '100%' };
      default:
        return { label: '', color: '', width: '0%' };
    }
  };

  const strengthInfo = getPasswordStrengthInfo();

  return (
    <div className="register-page" data-theme={theme}>
      {/* Theme Toggle */}
      <button 
        className="register-page__theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72 1.42-1.42" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Background Shapes */}
      <div className="register-page__background">
        <div className="register-page__shape register-page__shape--1"></div>
        <div className="register-page__shape register-page__shape--2"></div>
        <div className="register-page__shape register-page__shape--3"></div>
      </div>

      <div className="register-page__container">
        {/* Left Side - Branding */}
        <div className="register-page__branding">
          <div className="register-page__logo-wrapper">
            <img 
              src="/logo.png" 
              alt="SorBit Logo" 
              className="register-page__logo"
              onClick={() => navigate('/')}
            />
          </div>
          
          <h1 className="register-page__branding-title">
            Join <span className="gradient-text">SorBit</span> Today
          </h1>
          
          <p className="register-page__branding-description">
            Create your account and start managing all your social media platforms 
            from one powerful dashboard. It's free to get started!
          </p>

          <div className="register-page__benefits">
            <div className="register-page__benefit">
              <div className="register-page__benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="register-page__benefit-content">
                <h3>Multi-Platform Support</h3>
                <p>Connect unlimited social media accounts</p>
              </div>
            </div>

            <div className="register-page__benefit">
              <div className="register-page__benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 17V9m-5 8V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="register-page__benefit-content">
                <h3>Advanced Analytics</h3>
                <p>Track performance with detailed insights</p>
              </div>
            </div>

            <div className="register-page__benefit">
              <div className="register-page__benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                </svg>
              </div>
              <div className="register-page__benefit-content">
                <h3>Smart Scheduling</h3>
                <p>Plan and automate your content strategy</p>
              </div>
            </div>
          </div>

          <div className="register-page__stats">
            <div className="register-page__stat">
              <span className="register-page__stat-value">50K+</span>
              <span className="register-page__stat-label">Active Users</span>
            </div>
            <div className="register-page__stat">
              <span className="register-page__stat-value">1M+</span>
              <span className="register-page__stat-label">Posts Managed</span>
            </div>
            <div className="register-page__stat">
              <span className="register-page__stat-value">99.9%</span>
              <span className="register-page__stat-label">Uptime</span>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="register-page__form-container">
          <div className="register-page__form-card">
            <div className="register-page__form-header">
              <h2 className="register-page__form-title">Create Account</h2>
              <p className="register-page__form-subtitle">
                Fill in your details to get started
              </p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="register-page__error-banner">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="register-page__form">
              {/* Full Name Input */}
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                error={errors.fullName}
                autoComplete="name"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                }
                fullWidth
              />

              {/* Email Input */}
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                error={errors.email}
                autoComplete="email"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="m22 6-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
                fullWidth
              />

              {/* Password Input */}
              <div className="register-page__password-field">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.password}
                  autoComplete="new-password"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  fullWidth
                />
                <button
                  type="button"
                  className="register-page__password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="register-page__password-strength">
                    <div className="register-page__strength-bar">
                      <div 
                        className="register-page__strength-fill"
                        style={{ 
                          width: strengthInfo.width, 
                          backgroundColor: strengthInfo.color 
                        }}
                      ></div>
                    </div>
                    <span 
                      className="register-page__strength-label"
                      style={{ color: strengthInfo.color }}
                    >
                      {strengthInfo.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="register-page__password-field">
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  icon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }
                  fullWidth
                />
                <button
                  type="button"
                  className="register-page__password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 1l22 22" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Terms and Conditions */}
              <div className="register-page__terms">
                <label className="register-page__checkbox">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span className="register-page__checkbox-label">
                    I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <span className="register-page__error-text">{errors.agreeToTerms}</span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="large"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <Loader size="small" />
                ) : (
                  <>
                    Create Account
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="register-page__divider">
              <span>Or register with</span>
            </div>

            {/* Social Registration */}
            <div className="register-page__social">
              <button 
                className="register-page__social-btn register-page__social-btn--google"
                onClick={() => handleSocialRegister('Google')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <button 
                className="register-page__social-btn register-page__social-btn--facebook"
                onClick={() => handleSocialRegister('Facebook')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>

              <button 
                className="register-page__social-btn register-page__social-btn--twitter"
                onClick={() => handleSocialRegister('Twitter')}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
            </div>

            {/* Login Link */}
            <div className="register-page__login-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
