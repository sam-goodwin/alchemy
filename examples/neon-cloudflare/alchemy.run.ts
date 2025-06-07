/// <reference types="node" />

import alchemy from "alchemy";
import { Project, Branch, Database, Role } from "alchemy/neon";
import { Worker, Hyperdrive } from "alchemy/cloudflare";

const app = await alchemy("neon-cloudflare-example", {
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
});

// Create a Neon PostgreSQL project
export const project = await Project("my-database", {
  name: "My Application Database",
  regionId: "aws-us-east-1",
  pgVersion: 16,
});

// Create a development branch for isolated development
export const devBranch = await Branch("dev-branch", {
  project: project,
  name: "development",
});

// Create the main application database
export const database = await Database("app-db", {
  project: project,
  branch: devBranch,
  name: "myapp",
  ownerName: project.roles[0].name,
});

// Create an application-specific role
export const appRole = await Role("app-role", {
  project: project,
  branch: devBranch,
  name: "app_user",
});

// Create a Hyperdrive connection for faster database access from Cloudflare Workers
export const hyperdrive = await Hyperdrive("neon-hyperdrive", {
  name: "neon-database",
  connectionString: project.connectionUris[0].connectionUri,
});

// Deploy a Cloudflare Worker that uses the Neon database via Hyperdrive
export const worker = await Worker("neon-api", {
  main: "./src/index.ts",
  bindings: {
    HYPERDRIVE: hyperdrive,
  },
  command: "bun run build",
});

console.log({
  workerUrl: worker.url,
  databaseHost: project.endpoints[0].host,
  hyperdriveId: hyperdrive.id,
});

await app.finalize();