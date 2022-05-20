module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/models",
    "src/services",
    "src/controllers"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/test/**",
    "**/__tests__/**",
    "**/__mocks__/**",
    "**/__fixtures__/**",
    "index.ts",
  ],
}
