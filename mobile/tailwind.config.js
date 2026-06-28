/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind v4 — content paths
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    // Full custom theme — no Tailwind defaults bleeding through
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Accent — burnt terracotta
      accent: {
        DEFAULT: '#C1440E',
        hover: '#A3380B',
        muted: '#E8B49A',
        subtle: '#FDF1EC',
      },

      // Backgrounds
      bg: {
        DEFAULT: '#F5F0EB',
        surface: '#EDEAE5',
        elevated: '#E6E1DB',
        inverse: '#1A1614',
      },

      // Text
      text: {
        DEFAULT: '#1A1614',
        secondary: '#6B5E58',
        tertiary: '#9E9189',
        inverse: '#F5F0EB',
        accent: '#C1440E',
      },

      // Borders
      border: {
        DEFAULT: '#D9D3CC',
        strong: '#B5ADA5',
        subtle: '#E9E5DF',
      },

      // Semantic
      error: '#D93025',
      success: '#1E7E4A',
      warning: '#C47C0A',

      // Absolute
      white: '#FFFFFF',
      black: '#000000',
    },

    fontFamily: {
      display: ['SpaceGrotesk', 'system-ui', 'sans-serif'],
      body: ['Sora', 'system-ui', 'sans-serif'],
    },

    fontSize: {
      '2xs': ['10px', { lineHeight: '14px' }],
      xs:   ['12px', { lineHeight: '16px' }],
      sm:   ['14px', { lineHeight: '20px' }],
      base: ['16px', { lineHeight: '24px' }],
      lg:   ['18px', { lineHeight: '26px' }],
      xl:   ['20px', { lineHeight: '28px' }],
      '2xl':['24px', { lineHeight: '30px' }],
      '3xl':['30px', { lineHeight: '36px' }],
      '4xl':['36px', { lineHeight: '40px' }],
    },

    borderRadius: {
      none: '0px',
      sm:   '4px',
      DEFAULT: '8px',
      md:   '10px',
      lg:   '14px',
      xl:   '20px',
      '2xl':'28px',
      full: '9999px',
    },

    extend: {},
  },
  plugins: [],
}
