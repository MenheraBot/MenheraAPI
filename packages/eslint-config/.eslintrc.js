module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.d.ts',
        '.ts',
      ],
    },
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.ts',
        ],
      },
      typescript: {},
    },
  },
};
