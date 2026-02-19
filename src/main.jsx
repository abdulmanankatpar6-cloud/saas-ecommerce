import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/responsive-global.css';
import App from './App.jsx';
import ErrorBoundary from './utils/errorBoundary.jsx';

// Performance monitoring in development
if (import.meta.env.DEV) {
  import('./utils/performance.js').then(({ reportWebVitals, observeLongTasks }) => {
    reportWebVitals(metric => {
      console.log('Web Vital:', metric);
    });
    observeLongTasks();
  });
}

// Service Worker registration for PWA (production only)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found. Make sure index.html has a div with id="root"');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
