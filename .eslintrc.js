// .eslintrc.js
module.exports = {
    root: true,
    env: {
      node: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    rules: {
      // Add your custom rules here
    },
  };