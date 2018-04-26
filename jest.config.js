module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/.cache/"],
  globals: {
    __PATH_PREFIX__: ""
  },
  transform: { '^.+\\.jsx?$': '<rootDir>/test/transformer.js' }
};