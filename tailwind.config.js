import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        dark: colors.black,
        light: colors.white,
        ...colors,
      },
      fontFamily: {
        sans: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
