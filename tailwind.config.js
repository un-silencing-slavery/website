"use strict";
const colors = require("tailwindcss/colors");
const path = require("path");

const appEntry = path.join(__dirname, "app");
const relevantFilesGlob = "**/*.{html,js,ts,hbs,gjs,gts}";

const content = [path.join(appEntry, relevantFilesGlob)];

const tailwindConfig = {
  content,
  theme: {
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
  },
  plugins: ["@tailwindcss/typography"],
};

module.exports = tailwindConfig;
