const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^context(.*)$': '<rootDir>/src/context$1',
    '^data(.*)$': '<rootDir>/src/data$1',
    '^functions(.*)$': '<rootDir>/src/functions$1',
    '^hooks(.*)$': '<rootDir>/src/hooks$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^styles(.*)$': '<rootDir>/src/styles$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
