import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import Compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.varmiguemunoz.com',
  trailingSlash: 'never',
  output: 'server',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport', // Prefetch cuando entra en viewport
  },
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
  }),
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
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
        removeComments: true,
      },
      Image: false, // Ya lo hacemos con sharp
      JavaScript: true,
      SVG: true,
    }),
    sitemap({
      filter: (page) => {
        // Excluir funnels y payment de sitemap
        return !page.includes('/funnel/') && !page.includes('/payment/') && !page.includes('/thank-you/');
      },
      changefreq: 'weekly',
      priority: 0.7,
    }),
    tailwind({
      applyBaseStyles: false, // Ya tenemos global.css
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/funnel/', '/payment/', '/thank-you/', '/api/', '/forms/'],
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/funnel/', '/payment/', '/api/', '/forms/'],
          crawlDelay: 0,
        },
      ],
      sitemap: 'https://www.varmiguemunoz.com/sitemap-index.xml',
    }),
  ]
});
