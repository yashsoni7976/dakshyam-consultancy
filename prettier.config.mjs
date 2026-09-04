/** @type {import("prettier").Config} */
export default {
  printWidth: 90,
  singleQuote: false,
  trailingComma: "all",
  semi: true,
  arrowParens: "always",
  // Sorts Tailwind classes into the framework's canonical order. Worth it in a
  // codebase this class-heavy: it makes diffs readable and surfaces duplicate
  // or conflicting utilities that are otherwise invisible in a long string.
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./app/globals.css",
};
