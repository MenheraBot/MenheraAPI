module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
      typescript: {},
    },
  },
};
