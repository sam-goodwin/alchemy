// To make this it was necessary to replace all backticks with \` and all $ with \\` and \$
export const whatIsAlchemy = `
# What is Alchemy (Concise)

Alchemy is an embeddable, zero-dependency, Infrastructure-as-Code (IaC) library written in pure TypeScript. It runs anywhere JavaScript runs (browsers, serverless, workflows). Define infrastructure with async functions, get immediate access to physical properties, and let Alchemy handle state synchronization.

## Example: Cloudflare Vite App with D1 Database

\`\`\`typescript
import alchemy from "alchemy";
import { D1Database, Vite } from "alchemy/cloudflare";

// Initialize Alchemy
const app = await alchemy("my-vite-app", { stage: "dev" });

// Define D1 Database
const db = await D1Database("my-d1-db", {
  name: "my-d1-database-prod",
});

// Define Vite Application (served by a Cloudflare Worker)
const site = await Vite("my-vite-site", {
  command: "bun run build", // Your vite build command
  main: "./src/worker.ts",   // Entrypoint for the Cloudflare Worker
  assets: "./dist",         // Directory for static assets
  bindings: {
    DB: db, // Bind the D1 database to the worker as env.DB
  },
  url: true, // Enable a *.workers.dev URL
});

console.log(\`Site URL: \${site.url}\`);
console.log(\`D1 Database ID: \${db.id}\`);

// Finalize deployment
await app.finalize();
\`\`\`

**Worker Code (\`src/worker.ts\`):**

To access the D1 database in your worker:

\`\`\`typescript
// src/env.d.ts - Define types for your worker environment
/// <reference types="@cloudflare/workers-types" />
import type { site } from "../alchemy.run.js"; // Adjust path as needed

export type WorkerEnv = typeof site.Env;

declare module "cloudflare:workers" {
  namespace Cloudflare {
    export interface Env extends WorkerEnv {}
  }
}

// src/worker.ts - Your Cloudflare Worker
import type { WorkerEnv } from "./env";

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
    const { DB } = env; // Access bound D1 database

    // Example: Query D1
    try {
      const stmt = DB.prepare("SELECT name FROM users WHERE id = ?");
      const user = await stmt.bind(1).first();
      return Response.json({ user });
    } catch (e: any) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }
}
\`\`\`
`;
