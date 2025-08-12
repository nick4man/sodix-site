# Sodix Site - Modern Landing Page

A modern landing page for Sodix construction company, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design** with gradients and animations
- **Full Internationalization** (Russian and English languages)
- **Responsive Design** for all devices
- **Smooth Scrolling** and element animations
- **Dark/Light Theme** with toggle
- **Optimized Performance** with Next.js 15
- **Docker Support** for easy deployment

## 🛠️ Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, CSS Modules
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **UI Components**: Radix UI, Lucide React
- **Build**: Webpack 5, PostCSS

## 📁 Project Structure

```
sodix-site/
├── app/                    # App Router (Next.js 15)
│   ├── [lang]/           # Dynamic routes for languages
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── hero.tsx          # Hero section
│   ├── about.tsx         # About company
│   ├── services.tsx      # Services
│   ├── portfolio.tsx     # Portfolio
│   ├── contacts.tsx      # Contacts
│   └── footer.tsx        # Footer
├── dictionaries/          # i18n dictionaries
│   ├── en.json           # English
│   └── ru.json           # Russian
├── lib/                  # Utilities and helpers
├── public/               # Static files
└── .gemini/              # Tool documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sodix-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

## 🌐 Internationalization

The project supports two languages:
- **Russian**: `/ru`
- **English**: `/en`

Language is automatically determined based on browser headers or can be selected manually.

## 🐳 Docker

### Build image
```bash
npm run docker:build
```

### Run container
```bash
npm run docker:run
```

### Stop container
```bash
npm run docker:stop
```

## 📝 Available Scripts

- `npm run dev` - Run in development mode
- `npm run build` - Build for production
- `npm run start` - Run built application
- `npm run lint` - Code linting
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container

## 🎨 Customization

### Color Scheme
Main colors are defined in `tailwind.config.ts`:
- Primary: Blue (#2563eb)
- Secondary: Indigo (#6366f1)
- Accent: Green (#10b981)

### Fonts
The project uses system fonts with Inter fallback.

### Animations
All animations are implemented using Framer Motion with smooth transitions.

## 📱 Responsiveness

- **Mobile First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface
- **Optimized images** for different screens

## 🔧 Development

### Adding New Sections
1. Create component in `components/`
2. Add translations in `dictionaries/`
3. Import in `app/[lang]/page.tsx`
4. Add section ID for navigation

### Adding New Languages
1. Create dictionary in `dictionaries/`
2. Add language in `i18n.config.ts`
3. Update middleware if necessary

## 📚 Tool Documentation

Tool documentation is located in the `./.gemini/tools/` directory:

- [Git](./.gemini/tools/git.md) - Git workflow
- [Next.js](./.gemini/tools/nextjs.md) - Next.js development
- [Docker](./.gemini/tools/docker.md) - Containerization
- [Google Workspace Integration](./.gemini/GOOGLE_WORKSPACE_INTEGRATION.md) - Google Workspace integration

## 🚀 Deployment

### Vercel (recommended)
1. Connect GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Docker
1. Build image: `npm run docker:build`
2. Run: `npm run docker:run`
3. Open port 3000

### Static Hosting
1. Build project: `npm run build`
2. Export: `npm run export`
3. Upload files to hosting

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Create Pull Request

## 📄 License

This project is owned by Sodix company.

## 📞 Support

For development and support questions, contact:
- Email: dev@sodix.org
- Phone: +7 (495) 123-45-67

---

**Sodix** - Building reliable foundations for future generations 🏗️