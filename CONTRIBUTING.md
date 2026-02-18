# Contributing to NextWeb SaaS E-Commerce

Thank you for considering contributing! Here's how to get started.

## Development Workflow

### 1. Fork & Clone
```bash
git clone https://github.com/abdulmanankatpar6-cloud/saas-ecommerce.git
cd saas-ecommerce
npm install
```

### 2. Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### 3. Create a Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### 4. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test thoroughly

### 5. Commit Guidelines
Use conventional commits:
```
feat: add user profile export feature
fix: resolve cart calculation bug
docs: update API documentation
style: format code with prettier
refactor: simplify authentication logic
test: add unit tests for cart
chore: update dependencies
```

### 6. Push & Create PR
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub targeting `develop` branch.

## Code Standards

### JavaScript/React
- Use functional components with hooks
- Implement proper error boundaries
- Keep components small and focused
- Use meaningful variable names
- Add PropTypes or TypeScript types

### CSS
- Use BEM naming convention
- Keep styles scoped to components
- Use CSS variables for theming
- Ensure responsive design

### Performance
- Lazy load components when possible
- Optimize images
- Minimize bundle size
- Use React.memo for expensive components

## Testing
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Update CHANGELOG.md
4. Request review from maintainers
5. Address review feedback
6. Squash commits if requested

## Questions?

Open an issue or reach out to the maintainers.

Thank you for contributing! 🎉
