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
        float: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        fadeInWithoutScale: "fadeInWithoutScale 0.3s ease-in-out",
        "slide-in-left-to-right": "slideInLeftToRight 0.5s ease-in-out",
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
        fadeInWithoutScale: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideInLeftToRight: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
      lineHeight: {
        1: "0.25rem",
        2: "0.5rem",
      },
    },
  },
  plugins: [],
};
