# SorBit Setup Guide

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Logo
Place your logo file as `logo.png` in the `public` folder:
```
public/
  └── logo.png
```

**Logo Requirements:**
- Format: PNG (with transparency recommended)
- Recommended size: 500x500px or similar square dimensions
- The logo will be automatically resized in different contexts

### 3. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Features Overview

### ✅ Completed Features

1. **Hero Section**
   - Beautiful landing page with animated backgrounds
   - "Get Started" button navigates to dashboard
   - "Watch Demo" button (placeholder - customize as needed)
   - Social media platform showcase
   - Fully responsive

2. **Dashboard**
   - Welcome section with user greeting
   - Stats cards with animations
   - Connected accounts overview
   - Recent posts performance
   - Quick actions panel
   - Back to home button in topbar

3. **Theme Toggle**
   - Light/Dark mode switcher in topbar
   - Persists across sessions
   - Smooth transitions

4. **Navigation**
   - Hero → Dashboard (Get Started button)
   - Dashboard → Hero (Back button in topbar)
   - Sidebar navigation between pages
   - Mobile-responsive menu

5. **Pages**
   - Dashboard: Overview and quick actions
   - Accounts: Social media connections
   - Analytics: Performance metrics
   - Settings: User preferences

## Navigation Flow
```
Hero (Landing Page)
  ↓ [Get Started Button]
Dashboard
  ↓ [Sidebar Navigation]
├── Accounts
├── Analytics
└── Settings
  ↑ [Back Button in Topbar]
Hero (Landing Page)
```

## Customization

### Change Colors
Edit `src/styles/theme.css`:
```css
:root {
  --primary: #1877F2;    /* Your brand color */
  --accent: #22C55E;     /* Secondary color */
}
```

### Update User Info
Edit `src/App.jsx`:
```javascript
const mockUser = {
  name: 'Your Name',
  email: 'your@email.com',
  role: 'Your Role',
  avatar: null, // or URL to avatar image
};
```

### Add Demo Video
Edit `src/components/layout/Hero.jsx`:
```javascript
const handleWatchDemo = () => {
  // Open modal with video
  // Or navigate to demo page
  window.open('YOUR_DEMO_VIDEO_URL', '_blank');
};
```

## Build for Production
```bash
npm run build
```

Output will be in the `dist` folder, ready to deploy.

## Troubleshooting

### Logo not showing?
- Ensure `logo.png` is in the `public` folder
- Check browser console for 404 errors
- Clear browser cache and refresh

### Theme not persisting?
- Check browser localStorage is enabled
- Try in incognito mode to test

### Navigation not working?
- Ensure all routes in `App.jsx` match
- Check browser console for errors

## Next Steps

1. Connect real social media APIs
2. Add authentication system
3. Implement actual analytics data
4. Add post scheduling feature
5. Create notification system

## Support

For issues or questions, check the README.md or create an issue on GitHub.

---

Made with ❤️ by SorBit Team