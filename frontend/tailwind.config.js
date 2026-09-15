/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8",
        primaryDark: "#0f56b8",
      },
    },
  },
  plugins: [],
};
