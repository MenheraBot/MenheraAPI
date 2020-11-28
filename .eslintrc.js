const eslintConfig = require('@menhera-tools/eslint-config');

module.exports = {
  ...eslintConfig,
  ignorePatterns: ['*.js', 'packages/**/node_modules/*', 'packages/**/dist/*', 'packages/**/*.js'],
};
