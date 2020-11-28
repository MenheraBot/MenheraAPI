module.exports = {
  env: {
    es2021: true,
    //  es2020: true,
    node: true,
    // browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier',
    // 'plugin:react/recommended',
    // 'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // ecmaFeatures: {
    //   jsx: true,
    // },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', /* 'react' */, 'prettier'],
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
