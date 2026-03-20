import next from "eslint-config-next";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const config = [
  {
    ignores: ["node_modules/**", ".next/**", "playwright-report/**", "public/**"],
  },

  ...next,

  // ✅ your custom rules
  {
    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      // 🧹 Clean code
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // ⚛️ React
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",

      // 🔁 Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 🧠 JS quality
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",

      // 📦 Imports
      "import/no-anonymous-default-export": "warn",

      // 🚀 Next
      "@next/next/no-img-element": "warn",

      // ✨ Prettier
      "prettier/prettier": "warn",
    },
  },

  // disable formatting conflicts
  prettier,
];

export default config;
