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

const packageJsonConfig = defineConfig({
  plugins: ["json-format"],
});

/* eslint-disable perfectionist/sort-objects */
module.exports = defineConfig({
  parser: "@typescript-eslint/parser",
  extends: [
    "react-app",
    "prettier",
    "plugin:perfectionist/recommended-natural",
  ],
  plugins: ["prettier", "perfectionist"],
  rules: {
    "prettier/prettier": ["error", prettierConfig, { usePrettierrc: false }],
    "perfectionist/sort-imports": [
      "error",
      {
        groups: [
          "side-effect",
          "type",
          ["builtin", "external"],
          "internal-type",
          "internal",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        "custom-groups": {
          value: {},
          type: {},
        },
        "newlines-between": "always",
        "internal-pattern": ["~/**", "@/**"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.css.js", "*.css.ts"],
      ...vanillaExtractConfig,
    },
    {
      files: ["package.json", "**/package.json"],
      ...packageJsonConfig,
    },
  ],
  ignorePatterns: [
    // Packages
    ".yarn/**/*",
    ".pnp.cjs",
    ".pnp.loader.mjs",
    "package-lock.json",

    // Configuations
    "tsconfig.json",
    "**/tsconfig.json",

    // Build Artifacts
    "**/dist/**/*",
    "**/__generated__/**/*",
  ],
});
