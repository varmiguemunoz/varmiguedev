import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import Compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.growthlyfast.com/',
  output: 'server',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport' // Prefetch cuando entra en viewport
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    speedInsights: {
      enabled: true
    }
  }),
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true,
    },
  },
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'material-theme-palenight',
        wrap: true,
      },
      drafts: true,
    }),
    Compress({
      CSS: true,
      HTML: {
        removeAttributeQuotes: false,
        removeComments: true
      },
      Image: false, // Ya lo hacemos con sharp
      JavaScript: true,
      SVG: true
    }),
    sitemap({
      filter: (page) => {
        // Excluir funnels y payment de sitemap
        return !page.includes('/funnel/') &&
               !page.includes('/payment/') &&
               !page.includes('/thank-you/');
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }),
    tailwind({
      applyBaseStyles: false, // Ya tenemos global.css
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/funnel/', '/payment/', '/thank-you/', '/api/']
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/funnel/', '/payment/', '/api/'],
          crawlDelay: 0
        }
      ],
      sitemap: 'https://www.growthlyfast.com/sitemap-index.xml'
    }),
    react(),
  ],
  vite: {
    build: {
      // Code splitting manual
      rollupOptions: {
        output: {
          manualChunks: {
            // React core
            'react-vendor': ['react', 'react-dom'],
            // Three.js separado
            'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
            // Radix UI separado
            'radix-vendor': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-select',
              '@radix-ui/react-tabs'
            ],
            // Form libraries
            'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod']
          }
        }
      },
      // Minificación
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs en producción
          drop_debugger: true
        }
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 500
    },
    // Optimización de dependencias
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['three', '@react-three/fiber', '@react-three/drei']
    }
  }
});
