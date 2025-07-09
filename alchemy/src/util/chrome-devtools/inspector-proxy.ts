import fs, { createReadStream } from "node:fs";
import type http from "node:http";
import path from "node:path";
import { createInterface } from "node:readline";
import { WebSocketServer, type WebSocket as WsWebSocket } from "ws";
import { Scope } from "../../scope.ts";
import { colorize } from "../cli.ts";
import { logger } from "../logger.ts";
import { lowercaseId } from "../nanoid.ts";
import { parseConsoleAPICall } from "./parse-console-api-called.ts";

export interface ClientSession {
  id: string;
  ws: WsWebSocket;
  requestMap: Map<number, number>;
  responseMap: Map<number, number>;
}

//todo(michael): we may want to hot start domains with params
//e.g. {"id":1,"method":"Network.enable","params":{"maxPostDataSize":65536,"reportDirectSocketTraffic":true}
const HOT_DOMAINS = ["Runtime", "Console", "Debugger", "Network"];

export class InspectorProxy {
  private inspectorUrl: string;
  private inspectorWs: WebSocket;
  private sessions = new Map<string, ClientSession>();
  private nextInspectorId = 1;
  private wss: WebSocketServer;
  private consoleIdentifier?: string;
  private filePath: string;
  private persistLogs: boolean;

  constructor(
    server: http.Server,
    inspectorUrl: string,
    options?: {
      consoleIdentifier?: string;
    },
  ) {
    this.inspectorUrl = inspectorUrl;
    this.consoleIdentifier = options?.consoleIdentifier
      ? colorize(`[${options.consoleIdentifier}]`, "cyanBright")
      : undefined;
    this.inspectorWs = new WebSocket(this.inspectorUrl);
    this.attachHandlersToInspectorWs();

    const currentScope = Scope.getScope();
    if (currentScope == null) {
      throw new Error("Inspector Proxy requires scope");
    }
    this.persistLogs = currentScope.persistLogs ?? true;
    this.filePath = `${path.join(
      process.cwd(),
      ".alchemy",
      "logs",
      `${currentScope?.root.name}-${currentScope?.root.stage}`,
      currentScope?.chain
        ?.slice(3)
        .join("-")
        ?.replace(/[^a-zA-Z0-9._-]/g, "-") ?? "",
    )}.log`;

    this.wss = new WebSocketServer({
      server: server,
    });

    this.wss.on("connection", async (clientWs) => {
      const sessionId = this.createSession(clientWs);

      clientWs.on("message", async (data) => {
        await this.handleClientMessage(clientWs, sessionId, data.toString());
      });

      clientWs.on("close", () => {
        this.sessions.delete(sessionId);
      });
    });
  }

  private createSession(ws: WsWebSocket): string {
    const sessionId = lowercaseId();
    this.sessions.set(sessionId, {
      id: sessionId,
      ws: ws,
      requestMap: new Map(),
      responseMap: new Map(),
    });
    return sessionId;
  }

  private async *readHistoricServerMessages(domain: string) {
    const fileStream = createReadStream(this.filePath);
    const rl = createInterface({ input: fileStream });

    for await (const line of rl) {
      if (line.startsWith(`{"method":"${domain}.`)) {
        yield line;
      }
    }
  }

  private async handleClientMessage(
    self: WsWebSocket,
    sessionId: string,
    data: string,
  ) {
    try {
      const message = JSON.parse(data);
      const session = this.sessions.get(sessionId);

      if (!session) {
        console.error(`Session not found: ${sessionId}`);
        return;
      }

      if (typeof message.id === "number") {
        const inspectorId = this.nextInspectorId++;
        session.requestMap.set(message.id, inspectorId);
        session.responseMap.set(inspectorId, message.id);
        message.id = inspectorId;
      }

      //todo(michael): this might cause issues with things like `Debugger.setAsyncCallStackDepth`
      if (
        typeof message.method === "string" &&
        message.method.endsWith(".enable")
      ) {
        const domain = message.method.slice(0, -"enable".length - 1);

        for await (const line of this.readHistoricServerMessages(domain)) {
          self.send(line);
        }
        //* inspector doesn't need to know these turned on
        return;
      }

      this.inspectorWs.send(JSON.stringify(message));
    } catch (error) {
      logger.error(
        `[${this.consoleIdentifier}] Error parsing client message:`,
        error,
      );
    }
  }

  private async handleInspectorMessage(data: string) {
    try {
      const message = JSON.parse(data);

      //* no id means the message isn't a response its from the server
      //* so we save to file so we can roll forward later
      if (message.id == null && this.persistLogs) {
        await fs.promises.appendFile(this.filePath, `${data}\n`);
      }

      if (
        message.method === "Runtime.consoleAPICalled" &&
        this.consoleIdentifier
      ) {
        parseConsoleAPICall(data, this.consoleIdentifier);
      }

      if (typeof message.id === "number") {
        const targetSession = this.findSessionByInspectorId(message.id);
        if (targetSession) {
          const originalClientId = targetSession.responseMap.get(message.id);
          message.id = originalClientId;

          targetSession.responseMap.delete(message.id);
          targetSession.requestMap.delete(originalClientId!);

          targetSession.ws.send(JSON.stringify(message));
          return;
        }
      }

      this.sessions.forEach((session) => {
        session.ws.send(data);
      });
    } catch (error) {
      logger.error(
        `[${this.consoleIdentifier}] Error parsing inspector message:`,
        error,
      );
    }
  }

  private findSessionByInspectorId(inspectorId: number): ClientSession | null {
    for (const session of this.sessions.values()) {
      if (session.responseMap.has(inspectorId)) {
        return session;
      }
    }
    return null;
  }

  attachHandlersToInspectorWs() {
    this.inspectorWs.onmessage = async (event) => {
      await this.handleInspectorMessage(event.data.toString());
    };

    this.inspectorWs.onclose = () => {
      logger.warn(`[${this.consoleIdentifier}] Inspector closed`);
    };

    this.inspectorWs.onerror = (error) => {
      logger.error(`[${this.consoleIdentifier}] Inspector errored:`, error);
    };

    this.inspectorWs.onopen = async () => {
      if (this.persistLogs) {
        await fs.promises.mkdir(path.dirname(this.filePath), {
          recursive: true,
        });
        await fs.promises.writeFile(this.filePath, "");
      }
      for (const domain of HOT_DOMAINS) {
        this.inspectorWs.send(
          JSON.stringify({
            id: this.nextInspectorId,
            method: `${domain}.enable`,
            params: {},
          }),
        );
        this.nextInspectorId++;
      }
    };
  }

  public async reconnect() {
    this.inspectorWs = new WebSocket(this.inspectorUrl);
    this.attachHandlersToInspectorWs();
  }
}
