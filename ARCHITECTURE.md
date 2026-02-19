# Architecture Documentation

## Project Structure

```
saas-ecommerce/
├── .github/              # GitHub workflows and templates
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable React components
│   ├── context/         # React Context providers
│   ├── pages/           # Page components
│   ├── styles/          # Global styles and CSS
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── dist/                # Production build output
└── [config files]       # Various configuration files
```

## Technology Stack

### Core
- **React 19.2.0** - UI library with latest features
- **Vite 8.0** - Next-generation build tool
- **React Router 7.13** - Client-side routing

### UI & Styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **Recharts** - Data visualization

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Build Configuration

### Vite Configuration Highlights

1. **Code Splitting Strategy**
   - React core libraries bundled separately
   - Charts library isolated for lazy loading
   - Admin pages code-split for optimal loading
   - Vendor code separated from application code

2. **Asset Optimization**
   - Images organized in `/assets/images/`
   - Fonts in `/assets/fonts/`
   - Cache-busting with content hashes
   - Inline assets under 4KB

3. **Performance Features**
   - Tree-shaking enabled
   - CSS code splitting
   - Compressed builds (gzip/brotli ready)
   - Source maps for debugging

## Development Workflow

### Getting Started
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run type-check   # Check TypeScript types
npm run lint         # Lint code
npm run format       # Format code
```

### Production Build
```bash
npm run validate     # Run all checks
npm run build        # Build for production
npm run preview      # Preview production build
```

## Code Quality Standards

### TypeScript
- Strict mode enabled
- No implicit any
- Strict null checks
- Unused variables/parameters flagged

### ESLint
- React hooks rules enforced
- React refresh patterns validated
- No warnings allowed in CI

### Prettier
- Consistent code formatting
- 100 character line length
- Single quotes for JS/TS
- Trailing commas (ES5)

## Environment Variables

All environment variables must be prefixed with `VITE_` to be exposed to the client.

See `.env.example` for available configuration options.

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90
- Bundle Size: < 600KB (main chunk)

## Security Considerations

- Content Security Policy (CSP) ready
- XSS protection via React
- CORS configuration for API
- Secure environment variable handling
- No sensitive data in client bundle

## Deployment

The application is configured for deployment to:
- Vercel (primary)
- Netlify (alternative)
- Any static hosting service

See `DEPLOYMENT.md` for detailed deployment instructions.
