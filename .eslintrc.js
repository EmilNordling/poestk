/* eslint-disable */
// @ts-ignore

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended', // Basic config
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // ↓ ↓ ↓
    // Allows the namespace usage
    '@typescript-eslint/no-namespace': 0,

    // Allows blocked-scoped functions (as in namespaces)
    'no-inner-declarations': 0,

    // TypeScript's compiler already checks for duplicate function implementations
    'no-dupe-class-members': 0,

    // Allows unused declarations but flags them with error
    'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],

    // Ensures consistencies with blank lines
    'padding-line-between-statements': [
      'error',
      // Ensures returns have a blank line before them
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    // TypeScript should warn about globals
    'no-undef': 0,

    // No need to explicity type callbacks
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],

    // Allow function hoisting
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 0,

    // Allows empty interfaces
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
  },
};
