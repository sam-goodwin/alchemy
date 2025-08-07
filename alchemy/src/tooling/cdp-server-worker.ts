#!/usr/bin/env node

/**
 * Standalone CDP server worker process.
 * This runs the CoreCDPServer in isolation to prevent breakpoints from freezing it.
 */

import { CoreCDPServer } from "./cdp-server.ts";

const cdpServer = new CoreCDPServer();

// Handle RPC messages from parent process
process.on("message", async (message: any) => {
  const { id, method, params } = message;

  try {
    let result: any;

    switch (method) {
      case "registerRootCDP":
        cdpServer.registerRootCDP(params[0]);
        result = undefined;
        break;

      case "waitForRootCDP":
        await cdpServer.waitForRootCDP();
        result = undefined;
        break;

      case "waitForDebugger":
        await cdpServer.waitForDebugger();
        result = undefined;
        break;

      case "getPort":
        result = cdpServer.getPort();
        break;

      case "getRootCDPUrl":
        result = cdpServer.getRootCDPUrl();
        break;

      case "close":
        cdpServer.close();
        result = undefined;
        break;

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    process.send!({ id, result });
  } catch (error) {
    process.send!({
      id,
      error: {
        message: error instanceof Error ? error.message : String(error),
      },
    });
  }
});

// Handle process cleanup
process.on("SIGTERM", () => {
  cdpServer.close();
  process.exit(0);
});

process.on("SIGINT", () => {
  cdpServer.close();
  process.exit(0);
});

// Signal ready
process.send!({ type: "ready" });
