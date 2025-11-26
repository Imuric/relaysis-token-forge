import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. Text Colors (text-*)
      textColor: {
        heading: {
          DEFAULT: 'var(--text-heading)',
          hover: 'var(--text-heading-hover)',
        },
        body: {
          DEFAULT: 'var(--text-body)',
          strong: 'var(--text-body-strong)',
          soft: 'var(--text-body-soft)',
        },
        caption: {
          DEFAULT: 'var(--text-caption)',
          hover: 'var(--text-caption-hover)',
        },
        inverse: {
          DEFAULT: 'var(--text-inverse)',
          soft: 'var(--text-inverse-soft)',
        },
        link: {
          DEFAULT: 'var(--text-link)',
          hover: 'var(--text-link-hover)',
          active: 'var(--text-link-active)',
          visited: 'var(--text-link-visited)',
        },
        action: {
          primary: 'var(--text-action-primary)',
          secondary: 'var(--text-action-secondary)',
          ghost: {
            DEFAULT: 'var(--text-action-ghost)',
            hover: 'var(--text-action-ghost-hover)',
          },
        },
        // Feedback Text
        error: { DEFAULT: 'var(--text-error)', hover: 'var(--text-error-hover)' },
        success: { DEFAULT: 'var(--text-success)', hover: 'var(--text-success-hover)' },
        warning: { DEFAULT: 'var(--text-warning)', hover: 'var(--text-warning-hover)' },
        info: { DEFAULT: 'var(--text-info)', hover: 'var(--text-info-hover)' },
      },

      // 2. Background Colors (bg-*)
      backgroundColor: {
        surface: {
          page: 'var(--surface-page)',
          panel: {
            DEFAULT: 'var(--surface-panel)',
            hover: 'var(--surface-panel-hover)',
          },
          overlay: 'var(--surface-overlay)',
          card: {
            DEFAULT: 'var(--surface-card)',
            hover: 'var(--surface-card-hover)',
            active: 'var(--surface-card-active)',
          },
          primary: {
            DEFAULT: 'var(--surface-primary)',
            hover: 'var(--surface-primary-hover)',
            active: 'var(--surface-primary-active)',
            disabled: 'var(--surface-primary-disabled)',
          },
          secondary: {
            DEFAULT: 'var(--surface-secondary)',
            hover: 'var(--surface-secondary-hover)',
            active: 'var(--surface-secondary-active)',
          },
          ghost: {
            DEFAULT: 'var(--surface-ghost)',
            hover: 'var(--surface-ghost-hover)',
            active: 'var(--surface-ghost-active)',
          },
          input: {
            DEFAULT: 'var(--surface-input)',
            disabled: 'var(--surface-input-disabled)',
          },
          // Feedback Surfaces
          error: { 
            DEFAULT: 'var(--surface-error)', 
            soft: { DEFAULT: 'var(--surface-error-soft)', hover: 'var(--surface-error-soft-hover)' } 
          },
          success: { 
            DEFAULT: 'var(--surface-success)', 
            soft: { DEFAULT: 'var(--surface-success-soft)', hover: 'var(--surface-success-soft-hover)' } 
          },
          warning: { 
            DEFAULT: 'var(--surface-warning)', 
            soft: { DEFAULT: 'var(--surface-warning-soft)', hover: 'var(--surface-warning-soft-hover)' } 
          },
          info: { 
            DEFAULT: 'var(--surface-info)', 
            soft: { DEFAULT: 'var(--surface-info-soft)', hover: 'var(--surface-info-soft-hover)' } 
          },
        },
      },

      // 3. Border Colors (border-*)
      borderColor: {
        base: 'var(--border-base)',
        subtle: 'var(--border-subtle)',
        strong: 'var(--border-strong)',
        inverse: 'var(--border-inverse)',
        input: {
          DEFAULT: 'var(--border-input)',
          hover: 'var(--border-input-hover)',
          focus: 'var(--border-input-focus)',
        },
        primary: 'var(--border-primary)',
        secondary: 'var(--border-secondary)',
        error: { DEFAULT: 'var(--border-error)', focus: 'var(--border-error-focus)' },
        success: 'var(--border-success)',
        warning: 'var(--border-warning)',
        info: 'var(--border-info)',
      },

      // 4. Ring Colors (ring-*) - Used for Focus Rings
      ringColor: {
        focus: 'var(--border-focus-ring)',
      },
    },
  },
  plugins: [],
};

export default config;