/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
        '2xl': '96px',
      },
      fontSize: {
        sm: ['14px', '20px'],
        lg: ['18px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['30px', '40px'],
      },
    },
  },
  plugins: [],
};
