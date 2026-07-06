export default {
  testEnvironment: "node",

  roots: ["tests"],

  testMatch: ["**/*.test.js"],

  collectCoverage: true,

  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js"
  ],

  coverageDirectory: "coverage",

  verbose: true
};