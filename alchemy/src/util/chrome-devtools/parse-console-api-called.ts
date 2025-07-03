interface ConsoleAPICall {
  method: string;
  params: {
    type: string;
    args: Array<{
      type: string;
      value?: string;
      description?: string;
      className?: string;
      objectId?: string;
      subtype?: string;
      preview?: {
        type: string;
        description: string;
        overflow: boolean;
        properties: Array<{
          name: string;
          type: string;
          value: string;
        }>;
      };
    }>;
    executionContextId: number;
    timestamp: number;
    stackTrace?: {
      callFrames: Array<{
        functionName: string;
        scriptId: string;
        url: string;
        lineNumber: number;
        columnNumber: number;
      }>;
    };
  };
}

function parseConsoleAPICall(data: string, prefix?: string): void {
  const lines = data.trim().split("\n");

  for (const line of lines) {
    try {
      const call: ConsoleAPICall = JSON.parse(line);

      if (call.method === "Runtime.consoleAPICalled") {
        printConsoleCall(call.params, prefix);
      }
    } catch (_error) {
      console.error("Failed to parse log");
    }
  }
}

function printConsoleCall(
  params: ConsoleAPICall["params"],
  prefix?: string,
): void {
  const { type, args } = params;

  // Extract values from the args
  const values = args.map((arg) => {
    if (arg.value !== undefined) {
      return arg.value;
    }

    // Handle objects with preview data
    if (arg.preview?.properties) {
      const obj: Record<string, any> = {};
      for (const prop of arg.preview.properties) {
        obj[prop.name] = prop.value;
      }
      return obj;
    }

    // Handle arrays
    if (arg.subtype === "array" && arg.preview?.properties) {
      return arg.preview.properties
        .filter((prop) => !isNaN(Number(prop.name)))
        .sort((a, b) => Number(a.name) - Number(b.name))
        .map((prop) => prop.value);
    }

    // Fallback to description or className
    return arg.description || arg.className || "[Object]";
  });

  // Map DevTools console types to Node.js console methods
  switch (type) {
    case "log":
      if (prefix) {
        console.log(prefix, ...values);
      } else {
        console.log(...values);
      }
      break;
    case "info":
      if (prefix) {
        console.info(prefix, ...values);
      } else {
        console.info(...values);
      }
      break;
    case "warn":
    case "warning":
      if (prefix) {
        console.warn(prefix, ...values);
      } else {
        console.warn(...values);
      }
      break;
    case "error":
      if (prefix) {
        console.error(prefix);
      }
      console.error(...values);
      break;
    case "debug":
      if (prefix) {
        console.debug(prefix, ...values);
      } else {
        console.debug(...values);
      }
      break;
    case "trace":
      if (prefix) {
        console.trace(prefix, ...values);
      } else {
        console.trace(...values);
      }
      break;
    case "assert":
      // Chrome sends assert when assertion fails
      if (prefix) {
        console.log(prefix);
      }
      console.assert(false, ...values);
      break;
    case "count": {
      // Extract count info from the value
      const countValue = values[0] as string;
      if (typeof countValue === "string" && countValue.includes(":")) {
        const label = countValue.split(":")[0].trim();
        if (prefix) {
          console.log(prefix);
        }
        console.count(label);
      } else {
        if (prefix) {
          console.log(prefix);
        }
        console.count();
      }
      break;
    }
    case "table":
      if (prefix) {
        console.log(prefix);
      }
      console.table(...values);
      break;
    case "dir":
      if (prefix) {
        console.log(prefix);
      }
      console.dir(...values);
      break;
    case "time":
      if (values.length > 0) {
        if (prefix) {
          console.log(prefix);
        }
        console.time(values[0] as string);
      }
      break;
    case "timeEnd":
      if (values.length > 0) {
        if (prefix) {
          console.log(prefix);
        }
        console.timeEnd(values[0] as string);
      }
      break;
    case "clear":
      console.clear();
      break;
    default:
      if (prefix) {
        console.log(prefix, `[${type}]`, ...values);
      } else {
        console.log(`[${type}]`, ...values);
      }
  }
}

export { parseConsoleAPICall, printConsoleCall };
