# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for varmiguemunoz (Miguel Angel Munoz), built with Astro 5.x and React. The site showcases work, blog posts, and provides services for agencies looking to ship fast, high-performance digital experiences. Features include a blog, payment integration with Stripe, WhatsApp contact integration, and Mailchimp newsletter subscription.

## Development Commands

### Core Commands
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally

### Code Quality
- `yarn format` - Format code with Prettier
- `yarn lint:eslint` - Lint JavaScript/TypeScript/Astro files

### Content Management
- `yarn newpost` - Generate new blog post using astro-md-generator
- `yarn youtube` - Run YouTube script (located in scripts/youtube.cjs)

## Architecture

### Framework & Build System
- **Astro 5.x** with static output mode (SSG)
- **Vercel adapter** for deployment
- **Prefetch enabled** for improved navigation performance
- **Hybrid rendering**: Static pages + Vercel serverless functions for API routes

### Project Structure

```
src/
├── components/
│   ├── global/        # Site-wide components (navbar, footer, hero, etc.)
│   ├── ui/            # shadcn/ui components (React + Radix UI)
│   └── icons/         # Astro icon components
├── pages/             # Astro file-based routing
│   ├── blog/          # Blog listing and posts
│   ├── payment/       # Stripe payment flows
│   └── *.astro        # Landing pages
├── content/
│   ├── blog/          # Markdown blog posts
│   └── config.ts      # Content collections schema
├── config/            # JSON configuration files
│   ├── config.json    # Site metadata and author info
│   ├── menu.json      # Navigation menu
│   ├── social.json    # Social media links
│   ├── stats.json     # Homepage stats
│   ├── brands.json    # Brand logos
│   ├── projects.json  # Featured projects
│   └── works.json     # Portfolio work
├── layouts/
│   └── Base.astro     # Main layout wrapper
├── hooks/             # React hooks
├── lib/               # Utilities (utils.ts with cn() for class merging)
└── styles/            # Global styles

api/                   # Vercel serverless functions
├── create-checkout-session.ts    # Stripe subscription checkout
├── create-checkout-projects.ts   # Stripe one-time payment
├── send-whatsapp.ts              # WhatsApp message integration
└── subscribe.ts                   # Mailchimp newsletter subscription
```

### Tech Stack Integration

**UI Components:**
- **shadcn/ui components** in `src/components/ui/` - React components built on Radix UI primitives
- **Astro components** in `src/components/global/` - Server-rendered components
- Uses `client:*` directives to hydrate React components as needed

**Styling:**
- **Tailwind CSS** with custom design system via CSS variables
- Custom theme in `tailwind.config.cjs` with HSL color system
- Design tokens: gradients, glows, shadows defined in CSS variables
- Typography and aspect-ratio plugins enabled

**Content:**
- **Astro Content Collections** for type-safe blog management
- Schema defined in `src/content/config.ts` with frontmatter validation
- Blog posts in `src/content/blog/` as Markdown files
- MDX support enabled with syntax highlighting (material-theme-palenight)

**Integrations:**
- **Stripe** - Payment processing for services/subscriptions
- **Twilio** - WhatsApp messaging (via send-whatsapp API)
- **Mailchimp** - Newsletter subscriptions
- **Vercel Analytics & Speed Insights** - Performance monitoring
- **GSAP** - Animation library used in hero components

### API Routes Architecture

The `/api` directory contains Vercel serverless functions (not Astro endpoints):
- TypeScript functions using Vercel Node runtime
- Handle Stripe checkout sessions, WhatsApp messages, and Mailchimp subscriptions
- API keys managed via environment variables (`.env` file exists but not committed)

### Content Collections

Blog posts use Astro's content collections with this schema:
```typescript
{
  title: string
  description: string
  pubDate: Date
  updatedDate?: Date
  image?: string
  category: string (default: 'others')
  tags: string[] (default: ['others'])
  authors: string[] (default: ['varmiguemunoz'])
  draft?: boolean
  readtime?: string
}
```

### Configuration Files

Site-wide settings are centralized in `src/config/*.json`:
- **config.json** - Site metadata, URLs, author bio, page size
- **menu.json** - Navigation structure
- **social.json** - Social media links for footer/contact
- **stats.json** - Homepage statistics display
- These files are imported directly in components

## Important Notes

### Environment Variables
The `.env` file exists and contains sensitive API keys (Stripe, Mailchimp, Twilio). Never commit this file or expose credentials.

### Deployment
- Deployed on Vercel with static generation + serverless functions
- Output mode is `static` but uses Vercel adapter for API routes
- Build artifacts go to `dist/`

### Code Comments in README
The README.md contains extensive code examples for:
- WhatsApp integration implementation
- Mailchimp subscription flow with error handling
- Stripe pricing table setup

These are reference implementations, not active code.

### Linting & Formatting
- ESLint configured for TypeScript, Astro, and JSX accessibility
- Prettier with Astro and Tailwind plugins
- Use `yarn format` before committing

### React Integration
React components are hydrated selectively using Astro's `client:*` directives. Most components use `client:load` or `client:visible` for interactive elements (forms, carousels, navigation).
