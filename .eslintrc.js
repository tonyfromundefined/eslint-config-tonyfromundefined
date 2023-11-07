const { defineConfig } = require("eslint-define-config");
const { camelCase, pascalCase } = require("change-case");
const cssPropertyGroups = require("./cssPropertyGroups");

const cssPropertyOrderInJs = cssPropertyGroups
  .flatMap((val) => val.properties)
  .map((val) =>
    val.startsWith("-webkit-") || val.startsWith("-moz-")
      ? pascalCase(val)
      : camelCase(val),
  );

const prettierConfig = {
  arrowParens: "always",
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
};

const vanillaExtractConfig = defineConfig({
  plugins: ["sort-keys-custom-order"],
  rules: {
    "perfectionist/sort-objects": "off",
    "sort-keys-custom-order/object-keys": [
      "error",
      { orderedKeys: cssPropertyOrderInJs },
    ],
  },
});

/* eslint-disable perfectionist/sort-objects */
module.exports = defineConfig({
  parser: "@typescript-eslint/parser",
  extends: [
    "react-app",
    "prettier",
    "plugin:perfectionist/recommended-natural",
  ],
  plugins: ["json-format", "prettier", "perfectionist"],
  rules: {
    "prettier/prettier": ["error", prettierConfig, { usePrettierrc: false }],
  },
  overrides: [
    {
      files: ["*.css.js", "*.css.ts"],
      ...vanillaExtractConfig,
    },
  ],
  ignorePatterns: [
    // Yarn Packages
    ".yarn/**/*",
    ".pnp.cjs",
    ".pnp.loader.mjs",

    // Build Artifacts
    "**/dist/**/*",
    "**/__generated__/**/*",
  ],
});
