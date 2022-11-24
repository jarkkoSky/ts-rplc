import type { Config } from "jest";

const config: Config = {
  verbose: false,
  transform: {
    "^.+\\.ts?$": "@swc/jest",
  },
};

export default config;
