/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          900: "#0D1458",
          700: "#3547AC",
          600: "#414fcd",
          500: "#DCE2F4",
          300: "#F8F9FD",
        },
        gray: {
          900: "#5C697C",
          700: "#74788D",
          500: "#848BA2",
          300: "#F8F8FB",
          200: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
