export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
};
