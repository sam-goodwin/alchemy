import http from "node:http";
import { WebSocket, WebSocketServer } from "ws";
import { ResourceFQN, type Resource } from "../resource.ts";
import { findOpenPort } from "../util/find-open-port.ts";
import { logger } from "../util/logger.ts";
import type { BaseCDPMessage, CDPMessage } from "./cdp-message-types.ts";

export class RootDebuggerServer {
  server: http.Server;
  wss: WebSocketServer;
  executionContexts: Array<string> = [];
  private connectedClients: Set<WebSocket> = new Set();

  constructor() {
    console.log("CREATED");
    this.server = http.createServer(async (req, res) => {
      res.end("Hello, world!");
    });
    this.wss = new WebSocketServer({ server: this.server });
    this.setupWebSocketHandlers();
  }

  private setupWebSocketHandlers() {
    this.wss.on("connection", (ws) => {
      this.connectedClients.add(ws);

      ws.on("message", (data) => {
        try {
          const message: CDPMessage = JSON.parse(data.toString());
          this.handleCDPMessage(ws, message);
        } catch (error) {
          console.error("Failed to parse CDP message:", error);
        }
      });

      ws.on("close", () => {
        this.connectedClients.delete(ws);
      });
    });
  }

  private enableRuntime(ws: WebSocket) {
    ws.send(
      JSON.stringify({
        method: "Runtime.executionContextCreated",
        params: {
          context: {
            id: 0,
            origin: "alchemy://",
            name: "Alchemy",
            uniqueId: "ROOT",
            auxData: {
              isDefault: true,
              type: "default",
            },
          },
        },
      }),
    );

    this.executionContexts
      .slice() // avoid mutating the original array
      .reverse()
      .forEach((resourceId, index) => {
        ws.send(
          JSON.stringify({
            method: "Runtime.executionContextCreated",
            params: {
              context: {
                id: index + 1,
                origin: `alchemy://${resourceId}`,
                name: resourceId,
                uniqueId: resourceId,
                auxData: {
                  isDefault: false,
                  type: "default",
                },
                // index, // show the index
              },
            },
          }),
        );
      });
  }

  private handleCDPMessage(ws: WebSocket, message: CDPMessage) {
    switch (message.method) {
      case "Runtime.enable":
        ws.send(
          JSON.stringify({
            id: message.id,
            result: {},
          }),
        );
        this.enableRuntime(ws);
        break;

      case "Console.enable":
        ws.send(
          JSON.stringify({
            id: message.id,
            result: {},
          }),
        );
        break;

      default:
        // Send empty result for unhandled methods
        ws.send(
          JSON.stringify({
            id: (message as BaseCDPMessage).id,
            result: {},
          }),
        );
    }
  }

  public createExecutionContextForResource(resource: Resource) {
    const fqn = resource[ResourceFQN];
    this.executionContexts.push(fqn);
    const length = this.executionContexts.length;

    for (const ws of this.connectedClients) {
      ws.send(
        JSON.stringify({
          method: "Runtime.executionContextCreated",
          params: {
            context: {
              id: length,
              origin: `alchemy://${fqn}`,
              name: fqn,
              uniqueId: fqn,
              auxData: {
                isDefault: false,
                type: "default",
                frameId: `synthetic-${fqn}`,
              },
              // index, // show the index
            },
          },
        }),
      );
    }
    return length;
  }

  consoleLog(id: number, ...args: any[]) {
    const consoleEvent = {
      method: "Runtime.consoleAPICalled",
      params: {
        type: "log",
        args: args.map((arg) => ({
          type: typeof arg === "string" ? "string" : "object",
          value: typeof arg === "string" ? arg : JSON.stringify(arg),
        })),
        executionContextId: id,
        timestamp: Date.now(),
        stackTrace: {
          callFrames: [],
        },
      },
    };

    // Send to all connected DevTools clients
    this.connectedClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(consoleEvent));
      }
    });
  }

  public async init() {
    const port = await findOpenPort();
    this.server.listen(port);
    logger.task("", {
      message: `ready at http://localhost:${port}`,
      status: "success",
      prefix: "debugger",
      prefixColor: "greenBright",
    });
  }
}
