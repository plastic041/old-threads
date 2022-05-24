const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/$1",
  },
  transformIgnorePatterns: ["node_modules/(?!escape-string-regexp)/"],
};

module.exports = createJestConfig(customJestConfig);
