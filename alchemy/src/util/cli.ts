import packageJson from "../../package.json" with { type: "json" };
import type { Phase } from "../alchemy.ts";
import { dedent } from "./dedent.ts";

declare global {
  var _ALCHEMY_WARNINGS: Set<string> | undefined;
}

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  cyanBright: "\x1b[96m",
  yellowBright: "\x1b[93m",
  magenta: "\x1b[35m",
  greenBright: "\x1b[92m",
  redBright: "\x1b[91m",
  gray: "\x1b[90m",
} as const;

type ColorName = keyof typeof colors;

// Check if colors should be disabled
const shouldDisableColors = (): boolean => {
  return Boolean(process.env.NO_COLOR);
};

// Apply color if colors are enabled
const colorize = (text: string, color: ColorName): string => {
  if (shouldDisableColors()) {
    return text;
  }
  return `${colors[color]}${text}${colors.reset}`;
};

export interface Task {
  prefix?: string;
  prefixColor?: ColorName;
  resource?: string;
  message: string;
  status?: "pending" | "success" | "failure";
}

export interface LoggerApi {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  warnOnce: (message: string) => void;
  error: (...args: unknown[]) => void;
  task: (id: string, data: Task) => void;
  exit: () => void;
}

interface AlchemyInfo {
  phase: Phase;
  stage: string;
  appName: string;
}

let loggerApi: LoggerApi | null = null;
export const createLoggerInstance = (
  alchemyInfo: AlchemyInfo,
  customLogger?: LoggerApi,
) => {
  if (loggerApi) return loggerApi;

  // Use custom logger if provided, otherwise use the basic fallback logger
  loggerApi = customLogger ?? createFallbackLogger(alchemyInfo);
  return loggerApi;
};

export const createDummyLogger = (): LoggerApi => {
  return {
    log: () => {},
    error: () => {},
    warn: () => {},
    warnOnce: () => {},
    task: () => {},
    exit: () => {},
  };
};

export const createFallbackLogger = (alchemyInfo: AlchemyInfo): LoggerApi => {
  console.log(dedent`
    ${colorize("Alchemy", "cyanBright")} (v${packageJson.version})
    App: ${alchemyInfo.appName}
    Phase: ${alchemyInfo.phase}
    Stage: ${alchemyInfo.stage}
    
  `);

  return {
    log: console.log,
    error: (...args: unknown[]) =>
      console.error(colorize("ERROR", "redBright"), ...args),
    warn: (...args: unknown[]) =>
      console.warn(colorize("WARN", "yellowBright"), ...args),
    warnOnce: (message: string) => {
      globalThis._ALCHEMY_WARNINGS ??= new Set();
      if (globalThis._ALCHEMY_WARNINGS.has(message)) return;
      globalThis._ALCHEMY_WARNINGS.add(message);
      console.warn(colorize("WARN", "yellowBright"), message);
    },
    task: (_id: string, data: Task) => {
      const prefix = data.prefix ? `[${data.prefix}]` : "";

      // Pad the prefix to ensure consistent alignment (12 characters total including brackets)
      const paddedPrefix = prefix.padEnd(12);
      const prefixWithColor =
        data.prefixColor && prefix
          ? colorize(paddedPrefix, data.prefixColor as ColorName)
          : paddedPrefix;

      const resource = data.resource ? colorize(data.resource, "gray") : "";
      const message = data.message;

      if (prefixWithColor && resource) {
        console.log(`${prefixWithColor}${resource} ${message}`);
      } else if (prefixWithColor) {
        console.log(`${prefixWithColor}${message}`);
      } else {
        console.log(`${message}`);
      }
    },
    exit: () => {},
  };
};

export const formatFQN = (fqn: string) => fqn.split("/").slice(2).join(" > ");
