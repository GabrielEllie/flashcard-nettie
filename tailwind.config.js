/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loadingBar: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
      },
      animation: {
        loadingBar: "loadingBar var(--loadingBar-duration, 2000ms) linear forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
