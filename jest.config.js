/* eslint-disable */

module.exports = {
  preset: 'ts-jest',
  // Allows jest to go into node_modules
  transformIgnorePatterns: [],
  transform: {
    '.js': 'jest-esm-transformer',
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  setupFiles: ['<rootDir>/scripts/jest_setup.js'],
};
