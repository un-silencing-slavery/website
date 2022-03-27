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
      green: colors.green,
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
