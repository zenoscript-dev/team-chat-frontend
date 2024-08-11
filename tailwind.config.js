// tailwind.config.js
import tailwindCssAnimatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F243A',    
        secondary: '#444054',
        'primary-foreground': '#ffffff', // White for text on primary background
        'secondary-foreground': '#ffffff', // White for text on secondary background
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.25rem',
        sm: '0.125rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindCssAnimatePlugin],
};
