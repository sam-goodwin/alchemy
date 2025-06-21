import { Scope } from "../scope.ts";
import type { LoggerApi } from "./cli.ts";

export const logger = new Proxy({} as LoggerApi, {
  get: (_, prop: keyof LoggerApi) => {
    const logger =
      Scope.getScope()?.logger ??
      ({
        log: console.log,
        error: console.error,
        warn: console.warn,
        task: () => {},
        exit: () => {},
      } as LoggerApi);
    return logger[prop].bind(logger);
  },
});
