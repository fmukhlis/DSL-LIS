import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                motiva: ['Motiva Sans', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
              hide: {
                from: { opacity: 1 },
                to: { opacity: 0 },
              },
              slideIn: {
                from: { transform: 'translateY(calc(100% + var(--viewport-padding)))' },
                to: { transform: 'translateY(0)' },
              },
              swipeOut: {
                from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
                to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
              },
              slideDown: {
                from: { height: '0px' },
                to: { height: 'var(--radix-accordion-content-height)' },
              },
              slideUp: {
                from: { height: 'var(--radix-accordion-content-height)' },
                to: { height: '0px' },
              },
            },
            animation: {
              hide: 'hide 100ms ease-in',
              slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
              swipeOut: 'swipeOut 100ms ease-out',
              slideDown: 'slideDown 300ms ease-out',
              slideUp: 'slideUp 300ms ease-in',      
            },
      
        },
    },
    darkMode: 'class',

    plugins: [
        forms({strategy: 'class'}),
        plugin(function({addUtilities}) {
            addUtilities({
                /* Hide scrollbar for Chrome, Safari and Opera */
                '.no-scrollbar::-webkit-scrollbar': {
                    display: 'none'
                },

                /* Hide scrollbar for IE, Edge and Firefox */
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none',  /* IE and Edge */
                    'scrollbar-width': 'none',  /* Firefox */
                }
            })
        })
    ],
};