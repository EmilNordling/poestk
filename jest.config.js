module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.*'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/packages/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
};
