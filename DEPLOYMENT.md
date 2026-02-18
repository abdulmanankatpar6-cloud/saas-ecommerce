# 🚀 Deployment Guide

## Build for Production

### 1. Create Production Build
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Preview Production Build Locally
```bash
npm run preview
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts
4. Your site will be live at: `https://your-project.vercel.app`

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel auto-detects Vite
4. Click "Deploy"

---

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Your site is live!

---

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/saas-ecommerce",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/saas-ecommerce/',
  plugins: [react()],
})
```

4. Deploy:
```bash
npm run deploy
```

---

### Option 4: Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

4. Configure:
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub auto-deploy: `No`

5. Build and deploy:
```bash
npm run build
firebase deploy
```

---

### Option 5: AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket
3. Enable static website hosting
4. Upload `dist` folder contents
5. Set bucket policy for public access
6. (Optional) Set up CloudFront for CDN

---

### Option 6: Docker

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create `.dockerignore`:
```
node_modules
dist
.git
```

3. Build image:
```bash
docker build -t saas-ecommerce .
```

4. Run container:
```bash
docker run -p 80:80 saas-ecommerce
```

---

## Environment Variables

If you need environment variables, create `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=NextWeb
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Performance Optimization

### 1. Enable Gzip Compression
Most hosting providers enable this by default.

### 2. Add CDN
Use CloudFlare, AWS CloudFront, or similar.

### 3. Optimize Images
- Use WebP format
- Lazy load images
- Use responsive images

### 4. Code Splitting
Already configured with Vite!

### 5. Caching
Configure cache headers on your hosting provider.

---

## Post-Deployment Checklist

- ✅ Test all pages
- ✅ Test authentication flow
- ✅ Test shopping cart
- ✅ Test checkout process
- ✅ Test responsive design
- ✅ Test dark/light mode
- ✅ Check console for errors
- ✅ Test on different browsers
- ✅ Test on mobile devices
- ✅ Check loading speed
- ✅ Verify SEO meta tags
- ✅ Test accessibility

---

## Custom Domain

### Vercel
1. Go to project settings
2. Add custom domain
3. Update DNS records

### Netlify
1. Go to domain settings
2. Add custom domain
3. Update DNS records

### Others
Follow your hosting provider's documentation.

---

## SSL Certificate

Most modern hosting providers (Vercel, Netlify, Firebase) provide free SSL certificates automatically.

---

## Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior

---

## Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Support

For deployment issues:
1. Check hosting provider documentation
2. Review build logs
3. Test production build locally first
4. Check browser console for errors

---

Your SaaS e-commerce platform is ready for production! 🎉
