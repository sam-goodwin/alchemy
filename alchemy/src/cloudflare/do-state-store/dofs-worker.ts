/**
 * DOFS State Store Worker
 * 
 * This worker provides the DOFS (Durable Object File System) functionality
 * for Alchemy's state storage. It uses the real DOFS library which will be
 * bundled by esbuild when deployed.
 */

import { DurableObject } from "cloudflare:workers";
import { Fs } from "dofs";

/**
 * DOFS-powered state storage using the actual DOFS library
 */
export class AlchemyDOFSStateStore extends DurableObject {
  private fs: Fs;

  constructor(state: DurableObjectState, env: any) {
    super(state, env);
    this.fs = new Fs(state, env, {
      chunkSize: 256 * 1024, // 256KB recommended balance
    });
  }

  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      const operation = url.pathname.substring(1); // Remove leading /
      
      console.log(`Received request: ${request.method} ${url.pathname}`);
      
      if (!operation) {
        console.log("Missing operation in URL path");
        return new Response("Missing operation in URL path", { status: 400 });
      }

      let body: any = null;
      if (request.method !== "GET" && request.headers.get("content-type")?.includes("application/json")) {
        try {
          const text = await request.text();
          console.log(`Request body: ${text}`);
          body = text ? JSON.parse(text) : null;
        } catch (e: any) {
          console.log(`Failed to parse request body: ${e}`);
          return new Response("Invalid JSON in request body", { status: 400 });
        }
      }

      console.log(`Processing operation: ${operation} with body:`, body);

      switch (operation) {
        case "readFile":
          return await this.handleReadFile(body?.path);
          
        case "writeFile":
          return await this.handleWriteFile(body?.path, body?.data);
          
        case "listDir":
          return await this.handleListDir(body?.path);
          
        case "mkdir":
          return await this.handleMkdir(body?.path, body?.recursive);
          
        case "unlink":
          return await this.handleUnlink(body?.path);
          
        case "rmdir":
          return await this.handleRmdir(body?.path, body?.recursive);
          
        case "stat":
          return await this.handleStat(body?.path);
          
        default:
          console.log(`Unknown operation: ${operation}`);
          return new Response(`Unknown operation: ${operation}`, { status: 400 });
      }
    } catch (error: any) {
      console.error("DOFS State Store Error:", error);
      
      // Handle DOFS filesystem errors
      if (error.code === "ENOENT" || error.message.includes("not found")) {
        return new Response("File not found", { status: 404 });
      }
      if (error.code === "EEXIST") {
        return new Response("File exists", { status: 409 });
      }
      if (error.code === "ENOTDIR") {
        return new Response("Not a directory", { status: 400 });
      }
      if (error.code === "EISDIR") {
        return new Response("Is a directory", { status: 400 });
      }
      if (error.code === "ENOTEMPTY") {
        return new Response("Directory not empty", { status: 400 });
      }
      if (error.code === "ENOSPC") {
        return new Response("No space left", { status: 507 });
      }
      
      return new Response(`Internal server error: ${error.message}`, { status: 500 });
    }
  }

  async handleReadFile(path: string | null): Promise<Response> {
    console.log(`handleReadFile: ${path}`);
    
    if (!path) {
      return new Response("Missing path parameter", { status: 400 });
    }
    
    try {
      const data = await this.fs.readFile(path, { encoding: 'utf8' });
      console.log(`Read file result: ${data ? 'found' : 'not found'}`);
      
      return new Response(data, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.log(`Read file error: ${error}`);
      if (error.message === "ENOENT") {
        return new Response("File not found", { status: 404 });
      }
      throw error;
    }
  }

  async handleWriteFile(path: string, data: string): Promise<Response> {
    console.log(`handleWriteFile: ${path}, data length: ${data?.length || 0}`);
    
    if (!path || data === undefined) {
      return new Response("Missing path or data parameter", { status: 400 });
    }
    
    try {
      // Ensure directory exists
      const dir = path.substring(0, path.lastIndexOf('/'));
      console.log(`Creating directory: ${dir}`);
      if (dir) {
        await this.fs.mkdir(dir, { recursive: true });
      }
      
      console.log(`Writing file to: ${path}`);
      await this.fs.writeFile(path, data, { encoding: 'utf8' });
      console.log(`Successfully wrote file: ${path}`);
      return new Response("OK");
    } catch (error: any) {
      console.log(`Write file error: ${error.message}, code: ${error.code}, stack: ${error.stack}`);
      return new Response(`Failed to write file: ${error.message}`, { status: 500 });
    }
  }

  async handleListDir(path: string | null): Promise<Response> {
    console.log(`handleListDir: ${path}`);
    
    if (!path) {
      return new Response("Missing path parameter", { status: 400 });
    }
    
    try {
      // Use listDir from dofs - the correct method name
      const entries = await this.fs.listDir(path);
      console.log(`Found ${entries.length} entries in ${path}`);
      
      // Filter for files (not directories) and return just the names
      const files = [];
      for (const entry of entries) {
        const fullPath = path + '/' + entry;
        try {
          const stat = await this.fs.stat(fullPath);
          if (stat.isFile) {
            files.push(entry);
          }
        } catch (e: any) {
          // Skip entries we can't stat
          console.log(`Skipping entry ${entry}: ${e.message}`);
        }
      }
      
      console.log(`Filtered files: ${JSON.stringify(files)}`);
      
      return new Response(JSON.stringify(files), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.log(`List dir error: ${error}`);
      if (error.code === "ENOENT") {
        return new Response("Directory not found", { status: 404 });
      }
      return new Response(`Failed to list directory: ${error.message}`, { status: 500 });
    }
  }

  async handleMkdir(path: string, recursive: boolean): Promise<Response> {
    console.log(`handleMkdir: ${path}, recursive: ${recursive}`);
    
    if (!path) {
      return new Response("Missing path parameter", { status: 400 });
    }
    
    try {
      // Use DOFS native recursive support
      await this.fs.mkdir(path, { recursive });
      console.log(`Directory creation successful: ${path}`);
      return new Response("OK");
    } catch (error: any) {
      console.log(`Mkdir error for "${path}": ${error.message}, code: ${error.code}`);
      if (error.code === "EEXIST") {
        return new Response("Directory already exists", { status: 409 });
      }
      return new Response(`Failed to create directory: ${error.message}`, { status: 500 });
    }
  }

  async handleUnlink(path: string): Promise<Response> {
    console.log(`handleUnlink: ${path}`);
    
    if (!path) {
      return new Response("Missing path parameter", { status: 400 });
    }
    
    try {
      await this.fs.unlink(path);
      console.log(`Successfully deleted file: ${path}`);
      return new Response("OK");
    } catch (error: any) {
      console.log(`Unlink error: ${error}`);
      if (error.code === "ENOENT") {
        return new Response("File not found", { status: 404 });
      }
      return new Response(`Failed to delete file: ${error.message}`, { status: 500 });
    }
  }

  async handleRmdir(path: string, recursive: boolean): Promise<Response> {
    console.log(`handleRmdir: ${path}, recursive: ${recursive}`);
    
    if (!path) {
      return new Response("Missing path parameter", { status: 400 });
    }
    
    try {
      await this.fs.rmdir(path, { recursive });
      console.log(`Successfully removed directory: ${path}`);
      return new Response("OK");
    } catch (error: any) {
      console.log(`Rmdir error: ${error}`);
      if (error.code === "ENOENT") {
        return new Response("Directory not found", { status: 404 });
      }
      if (error.code === "ENOTEMPTY") {
        return new Response("Directory not empty", { status: 400 });
      }
      return new Response(`Failed to remove directory: ${error.message}`, { status: 500 });
    }
  }

  async handleStat(path: string): Promise<Response> {
    console.log(`handleStat: ${path}`);
    
    if (!path) {
      return new Response("Missing path parameter", { status: 400 });
    }
    
    try {
      const stat = await this.fs.stat(path);
      
      const result = {
        isFile: stat.isFile,
        isDirectory: stat.isDirectory,
        size: stat.size,
        mtime: stat.mtime,
        ctime: stat.ctime,
      };
      
      console.log(`Stat result: ${JSON.stringify(result)}`);
      
      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.log(`Stat error: ${error}`);
      if (error.code === "ENOENT") {
        return new Response("File not found", { status: 404 });
      }
      return new Response(`Stat failed: ${error.message}`, { status: 500 });
    }
  }
}

// Main worker entrypoint
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    console.log(`Worker received request: ${request.method} ${request.url}`);
    
    try {
      // Validate bearer token if API key is configured
      if (env.DOFS_API_KEY) {
        const authHeader = request.headers.get("Authorization");
        const expectedToken = `Bearer ${env.DOFS_API_KEY}`;
        
        if (!authHeader || authHeader !== expectedToken) {
          return new Response("Unauthorized", { status: 401 });
        }
      }
      
      const durableObjectId = env.ALCHEMY_DOFS_STATE_STORE.idFromName("default");
      const durableObject = env.ALCHEMY_DOFS_STATE_STORE.get(durableObjectId);
      
      console.log(`Forwarding to Durable Object...`);
      const response = await durableObject.fetch(request);
      
      console.log(`Durable Object response: ${response.status} ${response.statusText}`);
      return response;
    } catch (error: any) {
      console.error(`Worker error: ${error}`);
      return new Response(`Worker error: ${error.message}`, { status: 500 });
    }
  }
}; 