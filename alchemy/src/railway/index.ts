/**
 * Railway provider for Alchemy
 *
 * Railway is a modern platform-as-a-service (PaaS) that provides infrastructure hosting
 * with a focus on developer experience. This provider enables declarative management
 * of Railway resources through Alchemy's Infrastructure-as-Code framework.
 *
 * @example
 * ## Basic Web Application
 *
 * Deploy a full-stack application with database on Railway.
 *
 * ```ts
 * import {
 *   Project, Environment, Service, Plugin, Variable,
 *   Volume, Function
 * } from "alchemy/railway";
 *
 * // Create project and environment
 * const project = await Project("my-app", {
 *   name: "My Web App",
 *   description: "A full-stack web application"
 * });
 *
 * const production = await Environment("production", {
 *   name: "production",
 *   project: project,
 *   isProduction: true
 * });
 *
 * // Create PostgreSQL database
 * const database = await Plugin("postgres", {
 *   name: "postgres",
 *   type: "postgresql",
 *   project: project,
 *   environment: production,
 *   config: {
 *     postgresql: {
 *       version: "15",
 *       database: "myapp"
 *     }
 *   }
 * });
 *
 * // Create volume for database persistence with backups
 * const dbVolume = await Volume("postgres-data", {
 *   name: "postgres-data",
 *   mountPath: "/var/lib/postgresql/data",
 *   project: project,
 *   environment: production,
 *   service: database,
 *   sizeGB: 10,
 *   backups: {
 *     schedule: "daily",
 *     retentionDays: 7,
 *     enabled: true
 *   }
 * });
 *
 * // Add database URL variable
 * await Variable("database-url", {
 *   name: "DATABASE_URL",
 *   value: database.connection?.url || "",
 *   project: project,
 *   environment: production
 * });
 *
 * // Deploy backend API
 * const api = await Service("api", {
 *   name: "api",
 *   project: project,
 *   environment: production,
 *   source: {
 *     repo: "https://github.com/user/my-app.git",
 *     branch: "main",
 *     rootDirectory: "/api",
 *     buildCommand: "npm run build",
 *     startCommand: "npm start"
 *   }
 * });
 *
 * // Deploy frontend
 * const frontend = await Service("frontend", {
 *   name: "frontend",
 *   project: project,
 *   environment: production,
 *   source: {
 *     repo: "https://github.com/user/my-app.git",
 *     branch: "main",
 *     rootDirectory: "/frontend",
 *     buildCommand: "npm run build",
 *     startCommand: "npm start"
 *   },
 *   variables: {
 *     API_URL: api.url || ""
 *   }
 * });
 *
 * // Create serverless function for webhooks
 * const webhookFunction = await Function("webhook-handler", {
 *   name: "webhook-handler",
 *   project: project,
 *   environment: production,
 *   code: \`
 *     import { Hono } from "hono@4";
 *
 *     const app = new Hono();
 *
 *     app.post("/webhook", async (c) => {
 *       const payload = await c.req.json();
 *       console.log("Webhook received:", payload);
 *       return c.json({ success: true });
 *     });
 *
 *     export default app;
 *   \`,
 *   trigger: {
 *     http: {
 *       methods: ["POST"],
 *       path: "/webhook"
 *     }
 *   },
 *   packages: ["hono@4"],
 *   runtime: {
 *     memoryMB: 256,
 *     timeoutSeconds: 30
 *   }
 * });
 * ```
 */

// Core API utilities
export {
  createRailwayApi,
  RailwayApi,
  RailwayApiError,
  fragments,
  type RailwayApiOptions,
  type RailwayTokenType,
  type RailwayGraphQLError,
  type RailwayGraphQLResponse,
} from "./api.ts";

// Resources
export {
  Project,
  deleteProject,
  type Project as ProjectResource,
  type ProjectProps,
} from "./project.ts";

export {
  Environment,
  deleteEnvironment,
  type Environment as EnvironmentResource,
  type EnvironmentProps,
} from "./environment.ts";

export {
  Variable,
  deleteVariable,
  type Variable as VariableResource,
  type VariableProps,
} from "./variable.ts";

export {
  Service,
  deleteService,
  type Service as ServiceResource,
  type ServiceProps,
  type ServiceSource,
} from "./service.ts";

export {
  Plugin,
  deletePlugin,
  type Plugin as PluginResource,
  type PluginProps,
  type PluginType,
  type PluginConfig,
} from "./plugin.ts";

export {
  Volume,
  deleteVolume,
  growVolume,
  createVolumeBackup,
  restoreVolumeBackup,
  listVolumeBackups,
  type Volume as VolumeResource,
  type VolumeProps,
  type VolumeBackup,
  type VolumeBackupConfig,
  type BackupSchedule,
} from "./volume.ts";

export {
  Function,
  deleteFunction,
  deployFunction,
  getFunctionMetrics,
  type Function as FunctionResource,
  type FunctionProps,
  type FunctionRuntime,
  type FunctionTrigger,
  type FunctionDeployment,
} from "./function.ts";
