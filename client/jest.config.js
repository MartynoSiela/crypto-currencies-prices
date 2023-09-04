module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    '\\.(js|jsx)$': 'babel-jest',
    '\\.(css)$': '<rootDir>/tests/configs/cssTransform.js',
  },
  moduleDirectories: [
    'src',
    'node_modules',
  ],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/tests/configs/__mocks__/styleMock.js',
  },
};
