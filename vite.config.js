import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  
  return {
    plugins: [
      react({
        // Enable Fast Refresh for development
        fastRefresh: isDevelopment,
      }),
    ],

    // Path aliases
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@context': resolve(__dirname, './src/context'),
        '@utils': resolve(__dirname, './src/utils'),
        '@styles': resolve(__dirname, './src/styles'),
        '@assets': resolve(__dirname, './src/assets'),
      },
    },

    // Build optimization
    build: {
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: isDevelopment ? true : 'hidden',
      minify: isProduction ? 'esbuild' : false,
      cssMinify: isProduction ? 'lightningcss' : false,
      
      // Rollup options for advanced optimization
      rollupOptions: {
        output: {
          // Intelligent code splitting
          manualChunks: (id) => {
            // Core React libraries
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-core';
            }
            // Router
            if (id.includes('node_modules/react-router')) {
              return 'react-router';
            }
            // Charts library
            if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) {
              return 'charts';
            }
            // UI libraries
            if (id.includes('node_modules/framer-motion') || 
                id.includes('node_modules/lucide-react') || 
                id.includes('node_modules/react-hot-toast')) {
              return 'ui-libs';
            }
            // PDF generation
            if (id.includes('node_modules/jspdf') || 
                id.includes('node_modules/html2canvas')) {
              return 'pdf-libs';
            }
            // Admin pages (lazy loaded)
            if (id.includes('/src/pages/admin/')) {
              return 'admin';
            }
            // Other vendor code
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          
          // Professional asset naming with cache busting
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `assets/js/${chunkInfo.name}-[hash].js`;
          },
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/${ext}/[name]-[hash][extname]`;
          },
        },
        
        // Tree-shaking optimization
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: false,
        },
      },
      
      // Performance optimization
      chunkSizeWarningLimit: 600,
      reportCompressedSize: isProduction,
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Asset inlining threshold
      assetsInlineLimit: 4096,
    },

    // Development server
    server: {
      port: 5173,
      host: 'localhost',
      open: false,
      strictPort: false,
      cors: true,
      
      // HMR configuration
      hmr: {
        overlay: true,
        clientPort: parseInt(env.VITE_PORT) || 5173,
      },
      
      // Proxy API requests in development
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response:', proxyRes.statusCode, req.url);
            });
          },
        },
      },
      
      // Watch options for better performance
      watch: {
        usePolling: false,
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
      },
    },

    // Preview server
    preview: {
      port: 4173,
      host: 'localhost',
      open: true,
    },

    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-dom',
        'react-dom/client',
        'react-router-dom',
        'recharts',
        'framer-motion',
        'lucide-react',
        'react-hot-toast',
      ],
      exclude: ['@vite/client', '@vite/env'],
    },

    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __DEV__: JSON.stringify(isDevelopment),
      __PROD__: JSON.stringify(isProduction),
      // Prevent global undefined errors
      'process.env.NODE_ENV': JSON.stringify(mode),
    },

    // CSS configuration
    css: {
      devSourcemap: isDevelopment,
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
        generateScopedName: isProduction 
          ? '[hash:base64:8]' 
          : '[name]__[local]__[hash:base64:5]',
      },
      preprocessorOptions: {
        css: {
          charset: false,
        },
      },
    },
    
    // JSON optimization
    json: {
      stringify: true,
      namedExports: true,
    },
  };
});
