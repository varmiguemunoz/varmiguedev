/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Night Shift palette. Values live in src/styles/global.css (:root) as RGB channels.
        ops: {
          ink: 'rgb(var(--ops-ink) / <alpha-value>)',
          'ink-2': 'rgb(var(--ops-ink-2) / <alpha-value>)',
          'ink-3': 'rgb(var(--ops-ink-3) / <alpha-value>)',
          night: 'rgb(var(--ops-night) / <alpha-value>)',
          paper: 'rgb(var(--ops-paper) / <alpha-value>)',
          'paper-2': 'rgb(var(--ops-paper-2) / <alpha-value>)',
          line: 'rgb(var(--ops-line) / <alpha-value>)',
          slate: 'rgb(var(--ops-slate) / <alpha-value>)',
          mist: 'rgb(var(--ops-mist) / <alpha-value>)',
          signal: 'rgb(var(--ops-signal) / <alpha-value>)',
          amber: 'rgb(var(--ops-amber) / <alpha-value>)',
          'amber-deep': 'rgb(var(--ops-amber-deep) / <alpha-value>)',
          'amber-bright': 'rgb(var(--ops-amber-bright) / <alpha-value>)',
          live: 'rgb(var(--ops-live) / <alpha-value>)',
          danger: 'rgb(var(--ops-danger) / <alpha-value>)',
        },
      },
      borderColor: {
        DEFAULT: 'rgb(var(--ops-line) / <alpha-value>)',
      },
      transitionTimingFunction: {
        fluid: 'var(--ops-ease-fluid)',
        'out-expo': 'var(--ops-ease-out-expo)',
      },
      borderRadius: {
        lg: '0.75rem',
        md: 'calc(0.75rem - 2px)',
        sm: 'calc(0.75rem - 4px)',
      },
    },
  },

  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio'), require('tailwindcss-animate')],
};
