"use strict";
const colors = require("tailwindcss/colors");
const path = require("path");

const appEntry = path.join(__dirname, "app");
const relevantFilesGlob = "**/*.{html,js,ts,hbs,gjs,gts}";

const content = [path.join(appEntry, relevantFilesGlob)];

const tailwindConfig = {
  content,
  theme: {
    fontFamily: {
      title: ["Mirza", "sans-serif"],
      serif: ["Hina Mincho", "ui-serif", "Times New Roman", "serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",
      columbiaBlue: "#b9d9eb",
      slate: colors.slate,
      green: {
        100: "#BAD4C0",
        200: "#A2C4AA",
        300: "#89b593",
        400: "#71a67d",
        500: "#5c9369",
        600: "#4d7a57",
        700: "#3d6246",
        800: "#2e4934",
        900: "#1f3123",
      },
    },
    extend: {
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       a: {
      //         color: theme("colors.green.800"),
      //       },
      //     },
      //   },
      // }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

module.exports = tailwindConfig;
