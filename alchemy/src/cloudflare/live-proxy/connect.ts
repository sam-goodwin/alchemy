import type { Secret } from "../../secret.ts";

export async function connect({
  remote,
  token,
  path,
  body,
}: {
  remote: string | URL | DurableObjectStub | Fetcher;
  token?: string | Secret<string>;
  path: string;
  body?: any;
}): Promise<WebSocket> {
  console.log("connect", remote, path);
  const authToken = token
    ? typeof token === "string"
      ? token
      : token.unencrypted
    : undefined;

  // If not in Workers, use a real WS client (Bun/Node) for a proper handshake
  if (typeof remote === "string" || remote instanceof URL) {
    const url = new URL(remote.toString());
    url.pathname = path;
    url.searchParams.set("tunnelUrl", body?.tunnelUrl);
    if (authToken) {
      url.searchParams.set("authToken", authToken);
    }
    const ws = new WebSocket(url.toString());

    const { promise, resolve, reject } = Promise.withResolvers<WebSocket>();
    let isResolved = false;
    ws.addEventListener("open", () => {
      console.log("open", remote, path);
      isResolved = true;
      resolve(ws);
    });
    ws.addEventListener("error", (e) => {
      console.log("error", remote, path, e);
      reject(e instanceof Error ? e : new Error(String(e)));
    });
    ws.addEventListener("close", (event) => {
      console.log("close", remote, path, event);
      if (!isResolved) {
        reject(new Error("Connection closed"));
      }
    });
    return promise;
  }

  // Workers path: use fetch upgrade; accept 101 + webSocket
  const headers: Record<string, string> = {
    Upgrade: "websocket",
    "Content-Type": "application/json",
    ...(body?.tunnelUrl ? { "X-Alchemy-Tunnel-Url": body.tunnelUrl } : {}),
    ...(authToken ? { Authorization: authToken } : {}),
  };

  const response = await remote.fetch(`http://localhost${path}`, {
    headers,
  });

  if (!response.webSocket) {
    let msg = `HTTP ${response.status} ${response.statusText}`;
    try {
      const text = await response.text();
      if (text) msg += `: ${text}`;
    } catch {}
    throw new Error(msg);
  }
  response.webSocket.accept();
  return response.webSocket;
}
