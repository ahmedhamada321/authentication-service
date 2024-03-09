module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "\\.(gql|graphql)$": "jest-transform-graphql",
    ".*": "babel-jest",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testTimeout: 100000,
};
