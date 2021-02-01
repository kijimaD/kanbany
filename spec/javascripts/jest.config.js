module.exports = {
  moduleDirectories: ['../../', 'node_modules'],
  roots: ['.'],
  setupFilesAfterEnv: ['<rootDir>/setUpTest.js'],
  verbose: true,
  moduleNameMapper: { '\\.(css|less|scss|sss|styl)$': '<rootDir>/stub.css' },
};
