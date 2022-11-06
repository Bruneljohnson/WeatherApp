import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.tsx", "<rootDir>/src/**/*.ts"],
};
export default config;
