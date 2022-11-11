module.exports = {
  preset: 'ts-jest',
  rootDir: '.',
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  testMatch: ['**/__tests__/**/*.{ts,tsx}'],
}
