/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      monasans: ["MonaSans", "sans-serif"],
    },
    extend: {
      colors: {
        "project-neutral": "#E2E2E2",
        "project-neutral-100": "#E8EDFF",
        "project-neutral-400": "#D7DFE9",
        "project-blue-100": "#4A72FF",
        "project-blue-200": "#1B4DFF",
        "project-blue-300": "#94ABFF",
        "project-black-10": "#5E718D",
        "project-black-50": "#E9EFF6",
        "project-black-100": "#AAB3C3",
        "project-black-200": "#8897AE",
        "project-black-300": "#5E677C",
        "project-black-400": "#444D61",
        "project-black-500": "#2B3241",
        "project-red-300": "#BE170C",
        "project-red-400": "#FFC5C1",
        "project-red-500": "#FF3838",
        "project-red-600": "#FF574D",
      },
      transitionProperty: {
        "max-width": "max-width",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
