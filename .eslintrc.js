module.exports = {
  extends: ["expo", "prettier"],
  ignorePatterns: ['/dist/*'],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-multiple-empty-lines": ["warn", { max: 1 }],
  },
};