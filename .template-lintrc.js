"use strict";

module.exports = {
  extends: "recommended",
  rules: {
    "no-invalid-role": ["doc-noteref"],
    "no-inline-styles": true,
    "no-whitespace-for-layout": false,
  },
  overrides: [
    {
      files: ["**/components/community-tree/gradients/circle-gradient.hbs"],
      rules: {
        "no-inline-styles": false,
      },
    },
    {
      files: ["**/templates/head.hbs"],
      rules: {
        "no-forbidden-elements": false,
      },
    },
  ],
};
