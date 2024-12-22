import pluginJs from "@eslint/js"
import tsParser from "@typescript-eslint/parser"
import eslintConfigPrettier from "eslint-config-prettier"
import prettierPlugin from "eslint-plugin-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
      "typescript-eslint": tseslint,
    },
    rules: {
      "prettier/prettier": "error",

      // TypeScript Rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        { args: "after-used", argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Enforce Arrow Functions
      "no-restricted-syntax": [
        "error",
        {
          selector: "FunctionDeclaration",
          message: "Use arrow functions instead of function declarations.",
        },
      ],

      // General Rules
      "arrow-parens": ["error", "as-needed"],
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Padding between statements
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["block", "block-like"], next: "*" },
        { blankLine: "always", prev: "*", next: ["block", "block-like"] },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "export" },
      ],
    },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
]
