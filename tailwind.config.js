/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Page surfaces — warm dark grey, very slight brown undertone, brighter than #1f1f1e
        page: '#262422',
        'page-2': '#2c2a27',
        'page-3': '#322f2c',
        hairline: '#3a3631',
        'hairline-strong': '#4a453f',
        // Type
        ink: {
          50: '#f6f1e8',  // primary text, warm off-white
          100: '#ebe5d9',
          200: '#d6cfc1',
          300: '#b8b0a2',
          400: '#9a9285', // muted body
          500: '#7a7368', // subtle
          600: '#5e574e',
          700: '#46413a',
          800: '#322f2c',
          900: '#262422',
          950: '#1c1a18',
        },
        // Party colors — slightly nudged for legibility on warm grey
        dem: {
          50: '#eef4ff',
          100: '#dbe6ff',
          400: '#7aaeff',
          500: '#5b9cf5',
          600: '#3b82f6',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        rep: {
          50: '#fef2f2',
          100: '#fee2e2',
          400: '#fb8a8a',
          500: '#ef5757',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
        // Inactive state on the US map — only slightly above page
        muted: {
          DEFAULT: '#33302c',
          hover: '#403c37',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
