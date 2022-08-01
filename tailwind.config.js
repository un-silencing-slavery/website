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
      sans: ["Junction", "ui-sans-serif", "Helvetica", "sans-serif"],
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

      "rh-gold": "#ddc55a",
      "rh-red": "#cc0000",
      "rh-black": "#404040",
      black: "#000",
      white: "#fff",
      columbiaBlue: "#b9d9eb",
      slate: colors.slate,
      "rh-green": {
        50: "rgb(255, 255, 255)",
        100: "rgb(247, 252, 247)",
        200: "rgb(196, 240, 202)",
        300: "rgb(94, 230, 123)",
        400: "rgb(14, 194, 66)",
        500: "rgb(0, 157, 58)",
        600: "rgb(9, 126, 43)",
        700: "rgb(17, 112, 38)",
        800: "rgb(23, 92, 33)",
        900: "rgb(27, 74, 30)",
      },
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
      category: {
        0: "#7fc97f",
        1: "#beaed4",
        2: "#fdc086",
        3: "#ffff99",
        4: "#386cb0",
        5: "#f0027f",
        6: "#bf5b17",
        7: "#666666",
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
