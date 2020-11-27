const eslintConfig = require('@menhera-tools/eslint-config');

module.exports = {
  ...eslintConfig,
  ignorePatterns: [
    'packages/**/node_modules/*',
    'packages/**/dist/*',
    'packages/**/*.js',
  ],
};
