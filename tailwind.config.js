/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 45px rgba(250, 204, 21, 0.42)",
        glass: "0 24px 80px rgba(15, 23, 42, 0.36)",
      },
    },
  },
  plugins: [],
};
