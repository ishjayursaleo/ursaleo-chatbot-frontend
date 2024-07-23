module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}
