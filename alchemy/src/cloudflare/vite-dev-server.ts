import type { ViteDevServer } from "vite";
import path from "node:path";
import { findOpenPortStartingFrom } from "../util/find-open-port.ts";

interface ViteDevContext {
  server: ViteDevServer;
  port: number;
  dispose: () => Promise<void>;
}

const activeServers = new Map<string, ViteDevContext>();

/**
 * Creates a Vite dev server that integrates with the miniflare singleton
 */
export async function createViteDevServer(
  projectId: string,
  cwd: string = process.cwd(),
  viteConfig?: any
): Promise<{
  port: number;
  url: string;
  dispose: () => Promise<void>;
}> {
  // Clean up any existing server for this project
  const existing = activeServers.get(projectId);
  if (existing) {
    await existing.dispose();
    activeServers.delete(projectId);
  }

  // Find an available port
  const port = await findOpenPortStartingFrom(5173);

  // Import vite dynamically
  const { createServer } = await import("vite");

  // Create the Vite dev server
  const server = await createServer({
    root: cwd,
    server: {
      port,
      strictPort: true,
      host: "localhost",
    },
    // Allow user to override configuration
    ...viteConfig,
    // Ensure these critical settings are preserved
    configFile: viteConfig?.configFile ?? true,
    envFile: viteConfig?.envFile ?? true,
  });

  // Start the server
  await server.listen();

  const url = `http://localhost:${port}`;
  console.log(`🚀 Vite dev server started at ${url}`);

  const dispose = async () => {
    console.log(`🛑 Stopping Vite dev server at ${url}`);
    await server.close();
    activeServers.delete(projectId);
  };

  // Store the server for cleanup
  activeServers.set(projectId, { server, port, dispose });

  return {
    port,
    url,
    dispose,
  };
}

/**
 * Gets an existing Vite dev server context if it exists
 */
export function getViteDevServer(projectId: string): ViteDevContext | undefined {
  return activeServers.get(projectId);
}

/**
 * Disposes all active Vite dev servers
 */
export async function disposeAllViteDevServers(): Promise<void> {
  await Promise.all(
    Array.from(activeServers.values()).map(ctx => ctx.dispose())
  );
  activeServers.clear();
}

/**
 * Creates a proxy handler that forwards requests to the Vite dev server
 * while preserving the miniflare worker's ability to handle API routes
 */
export function createViteProxy(viteUrl: string) {
  return async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    
    // Create a new URL pointing to the Vite dev server
    const viteRequestUrl = new URL(url.pathname + url.search, viteUrl);
    
    try {
      const response = await fetch(viteRequestUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
      
      // Return the response from Vite
      return response;
    } catch (error) {
      console.error("Error proxying to Vite dev server:", error);
      return new Response("Vite dev server error", { status: 500 });
    }
  };
}