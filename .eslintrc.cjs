module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:prettier/recommended",
  ],
  rules: {
    // Use repo Prettier config
    "prettier/prettier": ["error", require("./.prettierrc.js")],

    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/await-thenable": "error",

    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unnecessary-condition": "warn",

    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  ignorePatterns: ["dist", "node_modules", "test-project", ".eslintrc.cjs"],
};
