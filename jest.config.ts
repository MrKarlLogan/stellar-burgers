import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/api',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@utils-types$': '<rootDir>/src/utils/types'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\']
};

export default config;
