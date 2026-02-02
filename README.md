# SorBit - Social Media Management Dashboard

A modern, beautiful, and mobile-first social media management dashboard built with React and Vite. Manage all your social media accounts in one place with powerful analytics and insights.

## ✨ Features

- 🎨 **Modern 3D Design** - Beautiful glassmorphism UI with smooth animations
- 📱 **Mobile-First** - Fully responsive design optimized for all devices
- 🌓 **Dark Mode** - Seamless light and dark theme support
- 🔗 **Multi-Platform** - Connect Facebook, Instagram, Twitter, LinkedIn, TikTok, YouTube
- 📊 **Analytics Dashboard** - Real-time insights and performance metrics
- 🎯 **Clean UI** - Easy-to-use interface with intuitive navigation
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sorbit.git
cd sorbit
```

2. Install dependencies:
```bash
npm install
```

3. Add your logo:
   - Place your logo file as `logo.png` in the `public` folder
   - The logo will be used in the sidebar, topbar, and hero section

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure
```
sorbit/
├── public/
│   └── logo.png              # Your logo file
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   │       └── logo.png      # Logo copy (optional)
│   ├── components/
│   │   ├── cards/
│   │   │   ├── StatCard.jsx
│   │   │   └── StatCard.css
│   │   ├── layout/
│   │   │   ├── Hero.jsx
│   │   │   ├── Hero.css
│   │   │   ├── Layout.jsx
│   │   │   ├── Layout.css
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Sidebar.css
│   │   │   ├── Topbar.jsx
│   │   │   └── Topbar.css
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── Badge.css
│   │       ├── Button.jsx
│   │       ├── Button.css
│   │       ├── Card.jsx
│   │       ├── Card.css
│   │       ├── Input.jsx
│   │       └── Input.css
│   ├── hooks/
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── Accounts.jsx
│   │   ├── Accounts.css
│   │   ├── Analytics.jsx
│   │   ├── Analytics.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Settings.jsx
│   │   └── Settings.css
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   ├── global.css
│   │   └── theme.css
│   ├── utils/
│   │   └── formatNumber.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Customization

### Theme Colors

Edit `src/styles/theme.css` to customize colors:
```css
:root {
  --primary: #1877F2;        /* Facebook Blue */
  --secondary: #FFFFFF;      /* White */
  --accent: #22C55E;         /* Green */
  /* Add more custom colors */
}
```

### Logo

Replace `public/logo.png` with your own logo. The logo supports transparency and will be automatically styled.

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [React Router](https://reactrouter.com/) - Routing
- CSS3 - Styling with custom properties

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Build for production:
```bash
npm run build
```

The `dist` folder will contain the production-ready files.

### Deploy to:
- **Vercel**: Connect your repository and deploy
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons from various open-source icon libraries
- Inspiration from modern dashboard designs
- Social media platform brand guidelines

## 📞 Support

For support, email support@sorbit.com or open an issue on GitHub.

---

Made with ❤️ by SorBit Team