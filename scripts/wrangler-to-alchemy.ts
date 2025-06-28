#!/usr/bin/env bun

import fs from "node:fs/promises";
import type { WranglerJsonSpec } from "../alchemy/src/cloudflare/wrangler.json.ts";

/**
 * Script to convert a wrangler.json file into an alchemy.run.ts file
 *
 * Usage:
 *   bun scripts/wrangler-to-alchemy.ts <wrangler.json> [output.ts]
 *
 * Examples:
 *   bun scripts/wrangler-to-alchemy.ts wrangler.json
 *   bun scripts/wrangler-to-alchemy.ts wrangler.json alchemy.run.ts
 */

interface ConversionOptions {
  inputFile: string;
  outputFile: string;
}

function parseArgs(): ConversionOptions {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Usage: bun scripts/wrangler-to-alchemy.ts <wrangler.json> [output.ts]

Convert a wrangler.json file to an alchemy.run.ts file.

Arguments:
  <wrangler.json>  Path to the wrangler.json file to convert
  [output.ts]      Output file path (default: alchemy.run.ts)

Examples:
  bun scripts/wrangler-to-alchemy.ts wrangler.json
  bun scripts/wrangler-to-alchemy.ts wrangler.json my-alchemy.run.ts
`);
    process.exit(0);
  }

  if (args.length < 1) {
    console.error("Error: Missing required argument <wrangler.json>");
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || "alchemy.run.ts";

  return { inputFile, outputFile };
}

async function _loadWranglerJson(filePath: string): Promise<WranglerJsonSpec> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as WranglerJsonSpec;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        throw new Error(`File not found: ${filePath}`);
      }
      if (error.message.includes("JSON")) {
        throw new Error(`Invalid JSON in file: ${filePath}`);
      }
    }
    throw error;
  }
}

function generateImports(spec: WranglerJsonSpec): string[] {
  const imports = new Set<string>();

  // Always add basic imports
  imports.add('import alchemy from "alchemy";');

  // Add cloudflare imports based on what's used
  const cloudflareImports = new Set<string>();
  cloudflareImports.add("Worker");

  // Check for different binding types and add corresponding imports
  if (spec.kv_namespaces && spec.kv_namespaces.length > 0) {
    cloudflareImports.add("KVNamespace");
  }

  if (spec.r2_buckets && spec.r2_buckets.length > 0) {
    cloudflareImports.add("R2Bucket");
  }

  if (spec.d1_databases && spec.d1_databases.length > 0) {
    cloudflareImports.add("D1Database");
  }

  if (spec.durable_objects && spec.durable_objects.bindings.length > 0) {
    cloudflareImports.add("DurableObjectNamespace");
  }

  if (
    spec.queues &&
    (spec.queues.producers.length > 0 || spec.queues.consumers.length > 0)
  ) {
    cloudflareImports.add("Queue");
  }

  if (spec.workflows && spec.workflows.length > 0) {
    cloudflareImports.add("Workflow");
  }

  if (spec.ai) {
    cloudflareImports.add("Ai");
  }

  if (spec.browser) {
    cloudflareImports.add("BrowserRendering");
  }

  if (spec.images) {
    cloudflareImports.add("Images");
  }

  if (spec.vectorize && spec.vectorize.length > 0) {
    cloudflareImports.add("VectorizeIndex");
  }

  if (
    spec.analytics_engine_datasets &&
    spec.analytics_engine_datasets.length > 0
  ) {
    cloudflareImports.add("AnalyticsEngine");
  }

  if (spec.hyperdrive && spec.hyperdrive.length > 0) {
    cloudflareImports.add("Hyperdrive");
  }

  if (spec.pipelines && spec.pipelines.length > 0) {
    cloudflareImports.add("Pipeline");
  }

  if (spec.secrets_store_secrets && spec.secrets_store_secrets.length > 0) {
    cloudflareImports.add("SecretsStore");
  }

  if (spec.dispatch_namespaces && spec.dispatch_namespaces.length > 0) {
    cloudflareImports.add("DispatchNamespace");
  }

  if (spec.version_metadata) {
    cloudflareImports.add("VersionMetadata");
  }

  if (spec.routes && spec.routes.length > 0) {
    cloudflareImports.add("Route");
  }

  if (cloudflareImports.size > 0) {
    const sortedImports = Array.from(cloudflareImports).sort().join(", ");
    imports.add(`import { ${sortedImports} } from "alchemy/cloudflare";`);
  }

  return Array.from(imports);
}

function generateBindings(spec: WranglerJsonSpec): {
  bindings: string[];
  resources: string[];
} {
  const bindings: string[] = [];
  const resources: string[] = [];

  // KV Namespaces
  spec.kv_namespaces?.forEach((kv) => {
    const resourceName = kv.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await KVNamespace("${kv.binding}", {
  title: "${kv.binding}",
  adopt: true,
});`);
    bindings.push(`    ${kv.binding}: ${resourceName},`);
  });

  // R2 Buckets
  spec.r2_buckets?.forEach((bucket) => {
    const resourceName = bucket.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await R2Bucket("${bucket.bucket_name}", {
  name: "${bucket.bucket_name}",
  adopt: true,
});`);
    bindings.push(`    ${bucket.binding}: ${resourceName},`);
  });

  // D1 Databases
  spec.d1_databases?.forEach((db) => {
    const resourceName = db.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await D1Database("${db.database_name}", {
  name: "${db.database_name}",
  adopt: true,
});`);
    bindings.push(`    ${db.binding}: ${resourceName},`);
  });

  // Durable Objects
  spec.durable_objects?.bindings.forEach((durable) => {
    const resourceName = durable.name.toLowerCase();

    resources.push(`export const ${resourceName} = new DurableObjectNamespace("${durable.name}", {
  className: "${durable.class_name}",${
    durable.script_name
      ? `
  scriptName: "${durable.script_name}",`
      : ""
  }${
    durable.environment
      ? `
  environment: "${durable.environment}",`
      : ""
  }
});`);
    bindings.push(`    ${durable.name}: ${resourceName},`);
  });

  // Queues (producers only - consumers are handled as eventSources)
  spec.queues?.producers.forEach((queue) => {
    const resourceName = queue.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await Queue("${queue.queue}", {
  name: "${queue.queue}",
  adopt: true,
});`);
    bindings.push(`    ${queue.binding}: ${resourceName},`);
  });

  // Workflows
  spec.workflows?.forEach((workflow) => {
    const resourceName = workflow.binding.toLowerCase();
    resources.push(`export const ${resourceName} = new Workflow("${workflow.name}", {
  className: "${workflow.class_name}",
  workflowName: "${workflow.name}",${
    workflow.script_name
      ? `
  scriptName: "${workflow.script_name}",`
      : ""
  }
});`);
    bindings.push(`    ${workflow.binding}: ${resourceName},`);
  });

  // AI
  if (spec.ai) {
    resources.push("export const ai = new Ai();");
    bindings.push(`    ${spec.ai.binding}: ai,`);
  }

  // Browser
  if (spec.browser) {
    resources.push(`export const browser = { type: "browser" as const };`);
    bindings.push(`    ${spec.browser.binding}: browser,`);
  }

  // Images
  if (spec.images) {
    resources.push(`export const images = { type: "images" as const };`);
    bindings.push(`    ${spec.images.binding}: images,`);
  }

  // Vectorize
  spec.vectorize?.forEach((vectorize) => {
    const resourceName = vectorize.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await VectorizeIndex("${vectorize.index_name}", {
  name: "${vectorize.index_name}",
  adopt: true,
});`);
    bindings.push(`    ${vectorize.binding}: ${resourceName},`);
  });

  // Analytics Engine
  spec.analytics_engine_datasets?.forEach((analytics) => {
    const resourceName = analytics.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await AnalyticsEngine("${analytics.dataset}", {
  dataset: "${analytics.dataset}",
  adopt: true,
});`);
    bindings.push(`    ${analytics.binding}: ${resourceName},`);
  });

  // Hyperdrive
  spec.hyperdrive?.forEach((hyperdrive) => {
    const resourceName = hyperdrive.binding.toLowerCase();
    // Parse connection string to extract components
    const url = new URL(hyperdrive.localConnectionString);
    resources.push(`export const ${resourceName} = await Hyperdrive("${hyperdrive.id}", {
  name: "${hyperdrive.id}",
  origin: {
    scheme: "${url.protocol.slice(0, -1)}",
    host: "${url.hostname}",
    port: ${url.port || (url.protocol === "postgres:" ? 5432 : 3306)},
    database: "${url.pathname.slice(1)}",
    user: "${url.username}",
    password: secret("${url.username.toUpperCase()}_PASSWORD"),
  },
  adopt: true,
});`);
    bindings.push(`    ${hyperdrive.binding}: ${resourceName},`);
  });

  // Pipelines
  spec.pipelines?.forEach((pipeline) => {
    const resourceName = pipeline.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await Pipeline("${pipeline.pipeline}", {
  name: "${pipeline.pipeline}",
  adopt: true,
});`);
    bindings.push(`    ${pipeline.binding}: ${resourceName},`);
  });

  // Secrets Store
  spec.secrets_store_secrets?.forEach((secret) => {
    const resourceName = secret.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await SecretsStore("${secret.store_id}", {
  name: "${secret.store_id}",
  adopt: true,
});`);
    bindings.push(`    ${secret.binding}: ${resourceName},`);
  });

  // Dispatch Namespaces
  spec.dispatch_namespaces?.forEach((dispatch) => {
    const resourceName = dispatch.binding.toLowerCase();
    resources.push(`export const ${resourceName} = await DispatchNamespace("${dispatch.namespace}", {
  name: "${dispatch.namespace}",
  adopt: true,
});`);
    bindings.push(`    ${dispatch.binding}: ${resourceName},`);
  });

  // Version Metadata
  if (spec.version_metadata) {
    resources.push(
      `export const versionMetadata = { type: "version_metadata" as const };`,
    );
    bindings.push(`    ${spec.version_metadata.binding}: versionMetadata,`);
  }

  return { bindings, resources };
}

function generateEventSources(spec: WranglerJsonSpec): string[] {
  const eventSources: string[] = [];

  // Queue consumers - need to find the corresponding producer resource name
  spec.queues?.consumers.forEach((consumer) => {
    // Find the corresponding producer for this queue
    const producer = spec.queues?.producers.find(
      (p) => p.queue === consumer.queue,
    );
    if (producer) {
      const resourceName = producer.binding.toLowerCase();
      eventSources.push(resourceName);
    }
  });

  return eventSources;
}

function generateWorkerConfig(
  spec: WranglerJsonSpec,
  bindingsArray: string[],
  eventSources: string[],
): string {
  const config: string[] = [];

  // Basic config
  config.push(`export const worker = await Worker("${spec.name}", {`);

  if (spec.main) {
    config.push(`  entrypoint: "${spec.main}",`);
  }

  if (spec.compatibility_date) {
    config.push(`  compatibilityDate: "${spec.compatibility_date}",`);
  }

  if (spec.compatibility_flags && spec.compatibility_flags.length > 0) {
    config.push(
      `  compatibilityFlags: ${JSON.stringify(spec.compatibility_flags)},`,
    );
  }

  // Bindings
  if (bindingsArray.length > 0) {
    config.push("  bindings: {");
    config.push(...bindingsArray);
    config.push("  },");
  }

  // Environment variables
  if (spec.vars && Object.keys(spec.vars).length > 0) {
    config.push(
      `  env: ${JSON.stringify(spec.vars, null, 4).replace(/\n/g, "\n  ")},`,
    );
  }

  // Cron triggers
  if (spec.triggers?.crons && spec.triggers.crons.length > 0) {
    config.push(`  crons: ${JSON.stringify(spec.triggers.crons)},`);
  }

  // Event sources
  if (eventSources.length > 0) {
    config.push(`  eventSources: [${eventSources.join(", ")}],`);
  }

  // URLs
  if (spec.workers_dev) {
    config.push("  url: true,");
  }

  config.push("  adopt: true,");
  config.push("});");

  return config.join("\n");
}

/**
 * Pure function to convert wrangler.json string to alchemy.run.ts string
 *
 * @param wranglerJsonString - The raw wrangler.json content as a string
 * @returns The generated alchemy.run.ts content as a string
 * @throws Error if the JSON is invalid or conversion fails
 */
export function convertWranglerToAlchemy(wranglerJsonString: string): string {
  try {
    const spec = JSON.parse(wranglerJsonString) as WranglerJsonSpec;

    if (!spec.name) {
      throw new Error("wrangler.json must have a 'name' field");
    }

    const lines: string[] = [];

    // Add imports
    const imports = generateImports(spec);
    lines.push(...imports);
    lines.push("");

    // Add secret import if needed (for hyperdrive passwords)
    if (spec.hyperdrive && spec.hyperdrive.length > 0) {
      lines.push('import { secret } from "alchemy";');
      lines.push("");
    }

    // Add app initialization
    lines.push(`const app = await alchemy("${spec.name}", {
  // Configure your app here
});`);
    lines.push("");

    // Generate resources and bindings
    const { bindings, resources } = generateBindings(spec);

    if (resources.length > 0) {
      lines.push("// Resources");
      lines.push(...resources);
      lines.push("");
    }

    // Generate event sources
    const eventSources = generateEventSources(spec);

    // Generate worker configuration
    lines.push("// Worker");
    lines.push(generateWorkerConfig(spec, bindings, eventSources));
    lines.push("");

    // Add routes if present
    if (spec.routes && spec.routes.length > 0) {
      lines.push("// Routes");
      spec.routes.forEach((route, index) => {
        lines.push(`await Route("route-${index}", {
  pattern: "${route}",
  worker,
});`);
      });
      lines.push("");
    }

    // Log the worker URL
    lines.push("console.log(worker.url);");
    lines.push("");

    // Finalize the app
    lines.push("await app.finalize();");

    return lines.join("\n");
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON: ${error.message}`);
    }
    throw error;
  }
}

async function main() {
  try {
    const { inputFile, outputFile } = parseArgs();

    console.log(`Converting ${inputFile} to ${outputFile}...`);

    // Load wrangler.json content as string
    const wranglerJsonContent = await fs.readFile(inputFile, "utf-8");

    // Generate alchemy.run.ts content using pure function
    const content = convertWranglerToAlchemy(wranglerJsonContent);

    // Write output file
    await fs.writeFile(outputFile, content, "utf-8");

    console.log(`✅ Successfully converted ${inputFile} to ${outputFile}`);
    console.log("\nNext steps:");
    console.log("1. Review the generated file and adjust as needed");
    console.log("2. Install dependencies: bun install");
    console.log(`3. Run the deployment: bun ${outputFile}`);
  } catch (error) {
    console.error(
      "❌ Error:",
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}

if (import.meta.main) {
  main();
}
