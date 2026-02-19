# Development Guide

## Getting Started

### Prerequisites
- Node.js 20.11.0+ (use nvm: `nvm use`)
- npm 9.0.0+
- Git

### Initial Setup
```bash
# Clone repository
git clone <repository-url>
cd saas-ecommerce

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

## Development Workflow

### Daily Development
1. Pull latest changes: `git pull origin main`
2. Install new dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Make changes and test
5. Run quality checks: `npm run validate`
6. Commit and push

### Code Quality Checks
```bash
# Type checking
npm run type-check          # One-time check
npm run type-check:watch    # Watch mode

# Linting
npm run lint                # Check for issues
npm run lint:fix            # Auto-fix issues

# Formatting
npm run format              # Format all files
npm run format:check        # Check formatting

# All checks
npm run validate            # Run everything
```

## Project Structure

### Directory Organization
```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable React components
│   ├── common/     # Shared components
│   ├── layout/     # Layout components
│   └── features/   # Feature-specific components
├── context/         # React Context providers
├── pages/           # Page components (routes)
├── styles/          # Global styles and CSS
├── utils/           # Utility functions
│   ├── api.js      # API utilities
│   ├── helpers.js  # Helper functions
│   └── constants.js # Constants
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

### Component Guidelines

#### Component Structure
```jsx
// ComponentName.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ComponentName.module.css';

/**
 * Component description
 * @param {Object} props - Component props
 */
const ComponentName = ({ prop1, prop2 }) => {
  // Hooks
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div className={styles.container}>
      {/* Component JSX */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

#### Naming Conventions
- Components: PascalCase (`UserProfile.jsx`)
- Utilities: camelCase (`formatDate.js`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- CSS Modules: ComponentName.module.css

### State Management

#### Local State
Use `useState` for component-local state:
```jsx
const [count, setCount] = useState(0);
```

#### Context API
Use Context for shared state:
```jsx
// Create context
const ThemeContext = createContext();

// Provider
<ThemeContext.Provider value={theme}>
  {children}
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);
```

### Styling Guidelines

#### CSS Modules (Preferred)
```jsx
import styles from './Component.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

#### Global Styles
- Use for resets and base styles
- Located in `src/styles/`
- Import in `main.jsx`

#### Responsive Design
```css
/* Mobile first approach */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

## Performance Best Practices

### Code Splitting
```jsx
// Lazy load routes
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

<Suspense fallback={<Loading />}>
  <AdminDashboard />
</Suspense>
```

### Memoization
```jsx
// Memoize expensive components
const MemoizedComponent = memo(ExpensiveComponent);

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Image Optimization
```jsx
// Use lazy loading
<img loading="lazy" src="image.jpg" alt="Description" />

// Use appropriate formats
// - WebP for photos
// - SVG for icons and logos
// - PNG for images with transparency
```

## API Integration

### API Utilities
```javascript
// src/utils/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchData = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error('API Error');
  return response.json();
};
```

### Error Handling
```jsx
try {
  const data = await fetchData('/users');
  setUsers(data);
} catch (error) {
  console.error('Failed to fetch users:', error);
  toast.error('Failed to load users');
}
```

## Testing

### Unit Tests
```javascript
// Component.test.jsx
import { render, screen } from '@testing-library/react';
import Component from './Component';

test('renders component', () => {
  render(<Component />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### Integration Tests
```javascript
// Test user flows
test('user can login', async () => {
  render(<App />);
  // Test login flow
});
```

## Debugging

### Browser DevTools
- React DevTools for component inspection
- Network tab for API calls
- Performance tab for profiling
- Console for logs

### VS Code Debugging
```json
// .vscode/launch.json
{
  "type": "chrome",
  "request": "launch",
  "name": "Launch Chrome",
  "url": "http://localhost:5173",
  "webRoot": "${workspaceFolder}/src"
}
```

## Common Issues

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
```

### Module Not Found
```bash
# Clear cache and reinstall
npm run clean
npm install
```

### Type Errors
```bash
# Check types
npm run type-check

# Fix common issues
# - Add missing type definitions
# - Update tsconfig.json
```

## Git Workflow

### Branch Naming
- Feature: `feature/user-authentication`
- Bug fix: `fix/login-error`
- Hotfix: `hotfix/critical-bug`

### Commit Messages
```
feat: add user authentication
fix: resolve login redirect issue
docs: update API documentation
style: format code with prettier
refactor: simplify user service
test: add login tests
chore: update dependencies
```

### Pull Request Process
1. Create feature branch
2. Make changes
3. Run `npm run validate`
4. Push and create PR
5. Wait for CI checks
6. Request review
7. Merge after approval

## Environment Variables

### Available Variables
```env
# App
VITE_APP_NAME=NextWeb
VITE_APP_ENV=development

# API
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_TRACKING=false
```

### Usage
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
```

## Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [MDN Web Docs](https://developer.mozilla.org)

## Getting Help

- Check documentation first
- Search existing issues
- Ask in team chat
- Create detailed bug reports
