/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        sideBarItem: "opacity, visibility",
      },
      boxShadow: {
        loader: "0, 10px, 10px, 10px, rgba(0, 0, 0, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            scale: "0.95",
          },
          "100%": {
            opacity: "1",
            scale: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
