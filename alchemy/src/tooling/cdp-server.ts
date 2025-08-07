import fs from "node:fs";
import { createServer, type Server } from "node:http";
import { URL } from "node:url";
import path from "pathe";
import { findOpenPort } from "../util/find-open-port.ts";
import { logger } from "../util/logger.ts";

export class CoreCDPServer {
  private server: Server;
  private rootCDPPromise: Promise<void>;
  private rootCDPResolve?: () => void;
  private debuggerPromise: Promise<void>;
  private debuggerResolve?: () => void;
  private port?: number;
  private rootCDPUrl?: string;
  private url?: string;
  private logDirectory: string;
  private cdpServers: Map<string, CDPServer> = new Map();

  constructor() {
    this.logDirectory = path.join(process.cwd(), ".alchemy", "logs");

    // Delete and recreate logs directory
    if (fs.existsSync(this.logDirectory)) {
      fs.rmSync(this.logDirectory, { recursive: true, force: true });
    }
    fs.mkdirSync(this.logDirectory, { recursive: true });

    // Initialize the promise for waiting for root CDP
    this.rootCDPPromise = new Promise((resolve) => {
      this.rootCDPResolve = resolve;
    });
    this.debuggerPromise = new Promise((resolve) => {
      this.debuggerResolve = resolve;
    });

    // 1. Create server
    this.server = createServer((req, res) => {
      this.handleRequest(req, res);
    });

    // Handle WebSocket upgrades for CDP connections
    this.server.on("upgrade", (request, socket, head) => {
      this.handleUpgrade(request, socket, head);
    });

    // 2. Start server
    this.startServer();
  }

  private async startServer(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.port = await findOpenPort();
    this.url = `http://localhost:${this.port}`;
    this.server.listen(this.port, () => {
      console.log(`CDP Server started at ${this.url}`);
    });
  }

  private handleRequest(req: any, res: any): void {
    const url = new URL(req.url, this.url);

    // 4. Register root CDP endpoint
    if (url.pathname === "/register-root-cdp" && req.method === "POST") {
      // Parse request body to get the WebSocket URL
      let body = "";
      req.on("data", (chunk: any) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        if (body.startsWith("ws://")) {
          this.registerRootCDP(body);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid WebSocket URL" }));
        }
      });
      return;
    }

    // Default response for unknown endpoints
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }

  private handleUpgrade(request: any, socket: any, head: any): void {
    try {
      logger.log(
        `[CoreCDPServer] Handling upgrade request for: ${request.url}`,
      );
      const url = new URL(request.url, this.url);
      logger.log(`[CoreCDPServer] Parsed URL pathname: ${url.pathname}`);

      // Check if this is a request to /servers/<name>
      const match = url.pathname.match(/^\/servers\/(.+)$/);
      if (match) {
        const serverName = match[1];
        logger.log(`[CoreCDPServer] Looking for CDP server: ${serverName}`);
        logger.log(
          `[CoreCDPServer] Available servers: ${Array.from(this.cdpServers.keys()).join(", ")}`,
        );

        const cdpServer = this.cdpServers.get(serverName);

        if (cdpServer) {
          logger.log(
            `[CoreCDPServer] Found CDP server ${serverName}, forwarding upgrade`,
          );
          // Forward the upgrade to the CDP server's WebSocket server
          cdpServer.handleUpgrade(request, socket, head);
        } else {
          logger.warn(
            `[CoreCDPServer] CDP server ${serverName} not found, destroying socket`,
          );
          socket.destroy();
        }
      } else {
        logger.warn(
          `[CoreCDPServer] Invalid path ${url.pathname}, destroying socket`,
        );
        socket.destroy();
      }
    } catch (error) {
      logger.error("[CoreCDPServer] Error handling upgrade:", error);
      socket.destroy();
    }
  }

  public registerRootCDP(wsUrl: string): void {
    logger.log(`[CoreCDPServer] Registering root CDP with URL: ${wsUrl}`);
    this.rootCDPUrl = wsUrl;
    const rootCDP = new CDPProxy(wsUrl, {
      name: "alchemy",
      server: this.server,
      domains: new Set(["Inspector", "Console", "Runtime", "Debugger"]),
      //todo(michael): UGHHH GROSS
      onDebuggerConnected: () => {
        if (this.debuggerResolve) {
          this.debuggerResolve();
        }
      },
    });

    // Store the CDP server in the map
    this.cdpServers.set("alchemy", rootCDP);
    logger.log(
      `[CoreCDPServer] Root CDP registered. Available servers: ${Array.from(this.cdpServers.keys()).join(", ")}`,
    );

    if (this.rootCDPResolve) {
      this.rootCDPResolve();
    }
  }

  public async waitForRootCDP(): Promise<void> {
    return this.rootCDPPromise;
  }

  public async waitForDebugger(): Promise<void> {
    return this.debuggerPromise;
  }

  public getPort(): number | undefined {
    return this.port;
  }

  public getRootCDPUrl(): string | undefined {
    return this.rootCDPUrl;
  }

  public close(): void {
    this.server.close();
  }
}

import { WebSocketServer, type WebSocket as WsWebSocket } from "ws";

export abstract class CDPServer {
  private logFile: string;
  protected domains: Set<string>;
  protected name: string;
  private wss: WebSocketServer;
  private lastClient: WsWebSocket | null = null;

  constructor(options: {
    name: string;
    server: Server;
    logFile?: string;
    domains?: Set<string>;
    onDebuggerConnected?: () => void;
  }) {
    logger.log(`[CDPServer] Creating CDP server: ${options.name}`);
    this.domains = options.domains ?? new Set(["Console"]);
    this.logFile =
      options.logFile ??
      path.join(process.cwd(), ".alchemy", "logs", `${options.name}.log`);
    this.name = options.name;
    fs.writeFileSync(this.logFile, "");
    logger.log(`[CDPServer] Initializing WebSocket server for: ${this.name}`);
    this.wss = new WebSocketServer({
      noServer: true, // Don't automatically handle upgrades
    });

    this.wss.on("connection", async (clientWs) => {
      logger.log(`[${this.name}] New WebSocket connection established`);
      this.lastClient = clientWs;

      let debuggerConnectedTimeout: NodeJS.Timeout | null = null;

      const startTimer = () => {
        if (debuggerConnectedTimeout) {
          clearTimeout(debuggerConnectedTimeout);
        }
        debuggerConnectedTimeout = setTimeout(() => {
          logger.log(
            `[${this.name}] No messages for 25ms, calling onDebuggerConnected`,
          );
          options.onDebuggerConnected?.();
        }, 25);
      };

      const resetTimer = () => {
        startTimer();
      };

      const clearTimer = () => {
        if (debuggerConnectedTimeout) {
          clearTimeout(debuggerConnectedTimeout);
          debuggerConnectedTimeout = null;
        }
      };

      // Start the initial timer
      startTimer();

      clientWs.on("message", async (data) => {
        resetTimer();
        await this.handleClientMessage(clientWs, data.toString());
      });

      clientWs.on("close", () => {
        logger.log(`[${this.name}] Client closed`);
        clearTimer();
      });
    });
  }

  protected async handleInspectorMessage(data: string) {
    try {
      const message = JSON.parse(data);
      const messageDomain = message.method?.split(".")?.[0];
      //todo(michael): this check is messy and doesn't work well for responses
      if (messageDomain != null && !this.domains.has(messageDomain)) {
        return;
      }
      if (message.id == null) {
        await fs.promises.appendFile(this.logFile, `${data}\n`);
      }
      if (this.lastClient != null) {
        this.lastClient.send(data);
      }
    } catch (error) {
      console.error(error);
      console.log(data);
    }
  }

  abstract handleClientMessage(ws: WsWebSocket, data: string): Promise<void>;

  public handleUpgrade(request: any, socket: any, head: any): void {
    try {
      logger.log(`[${this.name}] Handling WebSocket upgrade`);
      this.wss.handleUpgrade(request, socket, head, (ws) => {
        logger.log(
          `[${this.name}] WebSocket upgrade successful, emitting connection`,
        );
        this.wss.emit("connection", ws, request);
      });
    } catch (error) {
      logger.error(`[${this.name}] Error during WebSocket upgrade:`, error);
      socket.destroy();
    }
  }
}

export class CDPProxy extends CDPServer {
  private inspectorWs: WebSocket;

  constructor(
    inspectorUrl: string,
    options: ConstructorParameters<typeof CDPServer>[0],
  ) {
    super(options);
    this.inspectorWs = new WebSocket(inspectorUrl);
    this.attachHandlersToInspectorWs();
  }

  async handleClientMessage(ws: WsWebSocket, data: string): Promise<void> {
    logger.log(`[${this.name}] Client message:`, data);
    this.inspectorWs.send(data);
  }

  private attachHandlersToInspectorWs() {
    this.inspectorWs.onmessage = async (event) => {
      await this.handleInspectorMessage(event.data.toString());
    };

    this.inspectorWs.onclose = () => {
      logger.warn(`[${this.name}] Inspector closed`);
    };

    this.inspectorWs.onerror = (error) => {
      logger.error(`[${this.name}] Inspector errored:`, error);
    };

    this.inspectorWs.onopen = async () => {
      logger.log(`[${this.name}] Inspector opened`);
    };
  }
}
