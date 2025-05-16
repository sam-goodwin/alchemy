
export const alchemyCloudflareRules = `
# Alchemy Cloudflare Resources

This document summarizes available Cloudflare resources in Alchemy, with their properties defined in TypeScript format.

// --- Core Helper Types ---
\`\`\`typescript
// Placeholder for Resource base type
interface Resource<Kind extends string = string> {
  // Base type for all Alchemy resources
  // In actual code, this uses symbol properties
}

// Secret type for sensitive values
class Secret {
  readonly type: "secret";
  constructor(readonly value: string) {}
}

// Common options for Cloudflare API requests
interface CloudflareApiOptions {
  baseUrl?: string; // @default https://api.cloudflare.com/client/v4
  apiKey?: Secret; // Overrides CLOUDFLARE_API_KEY
  apiToken?: Secret; // Overrides CLOUDFLARE_API_TOKEN
  accountId?: string; // Overrides CLOUDFLARE_ACCOUNT_ID
  email?: string; // Email for API Key auth
}

// Token-related types for AccountApiToken
interface TokenPolicyPermissionGroup {
  id: string;
  meta?: Record<string, any>;
}

interface TokenPolicy {
  effect: "allow" | "deny";
  permissionGroups: (string | TokenPolicyPermissionGroup)[];
  resources: { [key: string]: string };
}

interface TokenCondition {
  requestIp?: {
    in?: string[];
    notIn?: string[];
  };
}

// Interface for a single asset file
interface AssetFile {
  path: string; // Path relative to assets directory
  filePath: string; // Full filesystem path
  contentType: string;
}

// DNS Record Types
type DnsRecordType = "A" | "AAAA" | "CNAME" | "TXT" | "MX" | "SRV" | "PTR" | string;

interface DnsRecordBase {
  name: string;
  type: DnsRecordType;
}

// Hyperdrive helper types
interface HyperdriveOrigin {
  scheme?: "postgresql"; // @default "postgres"
  host: string;
  port?: number; // @default 5432
  user: string;
  password: Secret;
  database: string;
}

interface HyperdriveOriginWithAccess extends Omit<HyperdriveOrigin, 'password'> {
  access_client_id: string;
  access_client_secret: Secret;
}

interface HyperdriveCaching {
  disabled?: boolean; // @default false
}

interface HyperdriveMtls {
  ca_certificate_id?: string;
  mtls_certificate_id?: string;
  sslmode?: "disable" | "allow" | "prefer" | "require" | "verify-ca" | "verify-full";
}
\`\`\`
// --- End Helper Types ---

## AccountApiToken
Creates a Cloudflare Account API Token with specified permissions.
\`\`\`typescript
interface AccountApiTokenProps extends CloudflareApiOptions {
  name: string;
  policies: TokenPolicy[];
  expiresOn?: string; // ISO format
  notBefore?: string; // ISO format
  condition?: TokenCondition;
}
interface AccountApiToken extends Resource<"cloudflare::AccountApiToken"> {
  id: string; // Token ID (Access Key ID)
  name: string;
  status: string;
  value?: Secret; // The token secret (only available on creation)
  accessKeyId: Secret; // Alias of id, as Secret
  secretAccessKey: Secret; // SHA-256 hash of the token value
}
\`\`\`

## AiGateway
Manages Cloudflare AI Gateway configurations for routing and managing AI model requests.
\`\`\`typescript
interface AiGatewayProps extends CloudflareApiOptions {
  cacheInvalidateOnUpdate?: boolean; // @default true
  cacheTtl?: number; // seconds, @default 0 (disabled). @minimum 0
  collectLogs?: boolean; // @default true
  rateLimitingInterval?: number; // seconds, @default 0 (disabled). @minimum 0
  rateLimitingLimit?: number; // per interval, @default 0 (disabled). @minimum 0
  rateLimitingTechnique?: "fixed" | "sliding"; // @default "fixed"
  authentication?: boolean; // @default false
  logManagement?: number; // log retention limit. @minimum 10000, @maximum 10000000
  logManagementStrategy?: "STOP_INSERTING" | "DELETE_OLDEST";
  logpush?: boolean; // @default false
  logpushPublicKey?: string; // @minLength 16, @maxLength 1024
}
interface AiGateway extends Resource<"cloudflare::AiGateway">, AiGatewayProps {
  id: string; // Name of the gateway
  accountId: string; // Cloudflare account ID for the gateway
  accountTag: string; // Cloudflare account tag
  createdAt: string; // ISO 8601
  internalId: string; // Internal UUID
  modifiedAt: string; // ISO 8601
  type: "ai_gateway"; // Binding type
}
\`\`\`

## Assets
Represents a collection of static files to be uploaded and served by Cloudflare Workers.
\`\`\`typescript
interface AssetsProps {
  path: string; // Path to a directory containing static assets
}
interface Assets extends Resource<"cloudflare::Asset">, AssetsProps {
  id: string; // The ID of the assets bundle (manifest ID)
  type: "assets"; // Binding type
  files: AssetFile[];
  createdAt: number;
  updatedAt: number;
}
\`\`\`

## R2Bucket
Creates and manages Cloudflare R2 Buckets for S3-compatible object storage.
\`\`\`typescript
interface R2BucketProps { // Does not extend CloudflareApiOptions
  name?: string; // @default resource id. Lowercase, numbers, hyphens.
  locationHint?: string;
  jurisdiction?: "default" | "eu" | "fedramp";
  allowPublicAccess?: boolean; // For r2.dev, development only
  delete?: boolean; // @default true
  empty?: boolean; // @default false, empty bucket before deleting
  adopt?: boolean; // @default false
  // Auth fields:
  apiToken?: Secret;
  apiKey?: Secret;
  email?: string;
  accountId?: string;
  accessKey?: Secret; // For S3 compatibility
  secretAccessKey?: Secret; // For S3 compatibility
}
interface R2Bucket extends Resource<"cloudflare::R2Bucket">, R2BucketProps {
  type: "r2_bucket"; // Binding type
  name: string; // Actual bucket name (resolved if props.name was undefined)
  location: string;
  creationDate: Date;
}
\`\`\`

## CustomDomain
Configures a custom domain for a Cloudflare Worker.
\`\`\`typescript
interface CustomDomainProps extends CloudflareApiOptions {
  name: string; // The domain name to bind (e.g., "api.example.com")
  zoneId: string; // Cloudflare Zone ID
  workerName: string; // Name of the worker to bind
  environment?: string; // Worker environment, @default "production"
}
interface CustomDomain extends Resource<"cloudflare::CustomDomain">, CustomDomainProps {
  id: string; // Domain binding ID
  createdAt: number; // Approximated if not returned by API
  updatedAt: number;
}
\`\`\`

## D1Database
Creates and manages Cloudflare D1 Databases (serverless SQL built on SQLite).
\`\`\`typescript
interface D1DatabaseProps extends CloudflareApiOptions {
  name?: string; // Database name, @default resource id
  primaryLocationHint?: "wnam" | "enam" | "weur" | "eeur" | "apac" | "auto" | string;
  readReplication?: { mode: "auto" | "disabled" };
  delete?: boolean; // @default true
  adopt?: boolean; // @default false
  clone?: D1Database | { id: string } | { name: string }; // Clone from existing D1
  migrationsTable?: string; // @default "d1_migrations"
  migrationsDir?: string; // Directory with .sql migration files
}

// D1Database output type (declared above in helper types)
type D1Database = Resource<"cloudflare::D1Database"> & D1DatabaseProps & {
  type: "d1";
  id: string; // Database UUID
  name: string;
  fileSize: number;
  numTables: number;
  version: string;
  readReplication?: { mode: "auto" | "disabled" };
};
\`\`\`

## DnsRecords
Manages a batch of DNS records in a Cloudflare zone.
\`\`\`typescript
interface DnsRecordItem {
  name: string; // Record name (e.g., "@", "www", "subdomain")
  type: "A" | "AAAA" | "CNAME" | "TXT" | "MX" | "SRV" | string; // etc.
  content: string;
  ttl?: number; // seconds, 1 for auto
  proxied?: boolean;
  priority?: number; // For MX records
  comment?: string;
  tags?: string[];
}
interface DnsRecordsProps extends CloudflareApiOptions {
  zoneId: string;
  records: DnsRecordItem[];
}
interface DnsRecordsOutput extends DnsRecordsProps {
  ids: string[]; // Array of created/managed record IDs
}
\`\`\`

## Hyperdrive
Manages Cloudflare Hyperdrive configurations for accelerating access to existing databases.
\`\`\`typescript
interface HyperdriveProps extends CloudflareApiOptions {
  name: string;
  origin: HyperdriveOrigin | HyperdriveOriginWithAccess;
  caching?: { disabled: boolean };
  mtls?: {
    ca_certificate_id?: string;
    mtls_certificate_id?: string;
    sslmode?: "disable" | "allow" | "prefer" | "require" | "verify-ca" | "verify-full";
  };
  hyperdriveId?: string; // Internal for updates
}
interface HyperdriveOutput extends HyperdriveProps {
  id: string; // Hyperdrive ID
  connectionString: string; // Connection string for workers
}
\`\`\`

## KVNamespace
Creates and manages Cloudflare KV Namespaces for key-value storage.
\`\`\`typescript
interface KVPair {
  key: string;
  value: string;
  expiration?: number; // Unix timestamp
  expirationTtl?: number; // seconds from now
  metadata?: object;
}
interface KVNamespaceProps extends CloudflareApiOptions {
  title: string; // Name of the namespace
  values?: KVPair[]; // Initial KV pairs
  adopt?: boolean; // Default false, adopt existing namespace
  delete?: boolean; // Default true, delete namespace on destroy
}
interface KVNamespaceOutput extends KVNamespaceProps {
  id: string; // Namespace ID
  title: string;
}
\`\`\`

## Nuxt
Deploys a Nuxt application to Cloudflare Pages, with Nuxt-specific defaults.
\`\`\`typescript
// Extends WebsiteProps with Nuxt defaults.
// Typically, \`command\` defaults to Nuxt build command.
// \`assets\` directory defaults to Nuxt output (e.g., ".output/public").
// \`main\` (entrypoint) defaults to Nuxt server handler.
interface NuxtProps extends Partial<WebsiteProps> {
  // Nuxt-specific overrides or additional props can be defined here if any
}
interface NuxtOutput extends WebsiteOutput {}
\`\`\`

## PermissionGroups
Lists all permission groups available for the Cloudflare account (data source).
\`\`\`typescript
interface PermissionGroup {
  id: string;
  name: string;
  scopes: Record<string, string>; // e.g., { read: "Read", write: "Write" }
}
interface PermissionGroupsProps extends CloudflareApiOptions {}
interface PermissionGroupsOutput {
  permission_groups: PermissionGroup[];
}
\`\`\`

## Pipeline
Creates and manages Cloudflare Pipelines for collecting, transforming, and routing data.
\`\`\`typescript
interface PipelineSourceHttp {
  type: "http";
  method: string; // e.g., "POST"
  url: string;
}
interface PipelineSourceBinding {
  type: "binding";
  name: string; // Name of the binding (e.g., a Queue)
}
type PipelineSource = PipelineSourceHttp | PipelineSourceBinding;

interface PipelineDestinationR2 {
  type: "r2";
  bucket: string; // R2 bucket name
  path?: string; // Path prefix in the bucket
  format?: "json" | "ndjson" | "csv" | "parquet";
  output_options?: object; // Format specific options
}
type PipelineDestination = PipelineDestinationR2; // Add other types if available

interface PipelineProps extends CloudflareApiOptions {
  name?: string; // Defaults to resource id
  source: PipelineSource[];
  destination: PipelineDestination;
  compression?: { type: "gzip" | "none" };
  delete?: boolean; // Default true
}
interface PipelineOutput extends PipelineProps {
  id: string;
  // Other output properties
}
\`\`\`

## QueueConsumer
Creates a consumer for a Cloudflare Queue, linking a worker script to process messages.
\`\`\`typescript
interface QueueConsumerSettings {
  batchSize?: number;
  maxConcurrency?: number;
  maxRetries?: number;
  maxWaitTimeMs?: number;
  retryDelay?: number; // seconds
}
interface QueueConsumerProps extends CloudflareApiOptions {
  queue?: QueueOutput; // The Queue resource instance
  queueId?: string; // Alternative to providing Queue instance
  scriptName: string; // Name of the worker script
  settings?: QueueConsumerSettings;
  delete?: boolean; // Default true
}
interface QueueConsumerOutput extends QueueConsumerProps {
  // Output properties from API
}
\`\`\`

## Queue
Creates and manages Cloudflare Queues for reliable message delivery between workers.
\`\`\`typescript
interface QueueSettings {
  deliveryDelay?: number; // seconds
  deliveryPaused?: boolean;
  messageRetentionPeriod?: number; // seconds
}
interface QueueProps extends CloudflareApiOptions {
  name?: string; // Defaults to resource id
  settings?: QueueSettings;
  delete?: boolean; // Default true
}
interface QueueOutput extends QueueProps {
  id: string; // Queue ID
  name: string;
  // Other output properties
}
\`\`\`

## Redwood
Deploys a RedwoodJS application to Cloudflare Pages, with Redwood-specific defaults.
\`\`\`typescript
// Extends WebsiteProps with Redwood defaults.
// \`command\` often defaults to Redwood build command (e.g., "yarn rw deploy cloudflare").
// \`assets\` directory defaults to Redwood web dist (e.g., "web/dist").
// \`main\` (entrypoint) points to Redwood server handler.
// Specific \`compatibilityDate\` and \`compatibilityFlags\` might be set.
interface RedwoodProps extends Partial<WebsiteProps> {
  // Redwood-specific overrides or additional props
}
interface RedwoodOutput extends WebsiteOutput {}
\`\`\`

## Route
Manages Cloudflare Worker Routes, mapping URL patterns to specific Worker scripts.
\`\`\`typescript
interface RouteProps extends CloudflareApiOptions {
  pattern: string; // URL pattern (e.g., "example.com/api/*")
  script: WorkerOutput | string; // Worker instance or script name
  zoneId: string;
}
interface RouteOutput extends RouteProps {
  id: string; // Route ID
}
\`\`\`

## TanStackStart
Deploys a TanStack Start application to Cloudflare Pages, with TanStack Start-specific defaults.
\`\`\`typescript
// Extends WebsiteProps with TanStack Start defaults.
// \`command\` defaults to appropriate build command.
// \`assets\` directory points to client build output (e.g., "dist/client").
// \`main\` (entrypoint) points to server handler.
// Likely includes \`nodejs_compat\` flag.
interface TanStackStartProps extends Partial<WebsiteProps> {
  // TanStackStart-specific overrides or additional props
}
interface TanStackStartOutput extends WebsiteOutput {}
\`\`\`

## VectorizeIndex
Creates and manages Cloudflare Vectorize Indexes for vector search.
\`\`\`typescript
interface VectorizeIndexProps extends CloudflareApiOptions {
  name: string;
  description?: string;
  dimensions: number;
  metric: "cosine" | "euclidean" | "dot_product";
  delete?: boolean; // Default true
  adopt?: boolean; // Default false
}
interface VectorizeIndexOutput extends VectorizeIndexProps {
  id: string; // Index name
  // Other output properties
}
\`\`\`

## VectorizeMetadataIndex
Creates and manages Cloudflare Vectorize Metadata Indexes for filtering vector search results.
\`\`\`typescript
interface VectorizeMetadataIndexProps extends CloudflareApiOptions {
  index: VectorizeIndexOutput; // Parent Vectorize Index instance
  propertyName: string; // Name of the metadata property to index
  indexType: "string" | "number" | "boolean";
}
interface VectorizeMetadataIndexOutput extends VectorizeMetadataIndexProps {
  // Output properties from API
}
\`\`\`

## Vite
Deploys a Vite application to Cloudflare Workers, extending Website with Vite-specific defaults.
\`\`\`typescript
// Extends WebsiteProps with Vite defaults.
// \`assets\` directory typically defaults to Vite\'s build output (e.g., "dist" or "dist/client").
interface ViteProps extends Partial<WebsiteProps> {
  // Vite-specific overrides, e.g., assets path might be preset
  // assets?: string; // Default could be './dist'
}
interface ViteOutput extends WebsiteOutput {}
\`\`\`

## Website
Deploys a static website to Cloudflare Pages, with an optional Worker for SSR or API.
\`\`\`typescript
interface AssetsConfig {
  _headers?: object; // Path to headers file or object
  _redirects?: object; // Path to redirects file or object
  html_handling?: "passthrough" | "rewrite";
  not_found_handling?: "passthrough" | "rewrite" | "custom";
  run_worker_first?: boolean;
  serve_directly?: boolean;
}
interface WebsiteProps extends WorkerProps { // Inherits all WorkerProps
  command: string; // Build command for the site
  name?: string; // Name of the worker (defaults to resource id)
  main?: string; // Entrypoint to the server worker (if any)
  assets?: string | AssetsConfig; // Directory or config for static assets
  cwd?: string; // Working directory for the build command
  wrangler?: boolean | string | object; // Generate wrangler.jsonc, path, or main override
  delete?: boolean; // Default true, delete project folder on destroy
}
interface WebsiteOutput extends WorkerOutput { // Inherits all WorkerOutput
  // Website-specific outputs like deployment ID, Pages URL, etc.
  pagesProjectId?: string;
  pagesProjectName?: string;
  pagesDeploymentId?: string;
  pagesUrl?: string;
}
\`\`\`

## Worker
Creates and manages Cloudflare Workers (serverless functions at the edge).
\`\`\`typescript
interface WorkerEventSource { /* Define based on actual EventSource types, e.g., Queue */ }
interface WorkerProps extends CloudflareApiOptions {
  script?: string; // Worker script content (alternative to entrypoint)
  entrypoint?: string; // Path to entrypoint file (bundled with esbuild)
  projectRoot?: string; // Root for resolving paths, defaults to process.cwd()
  bundle?: object; // esbuild options if using entrypoint
  format?: "esm" | "cjs"; // Default "esm"
  name?: string; // Worker name, defaults to resource id
  bindings?: Record<string, any>; // KV, DO, R2, Secrets, etc.
  env?: Record<string, string>; // Plain text environment variables
  url?: boolean; // Enable *.workers.dev URL, default false
  observability?: { enabled: boolean };
  migrations?: object; // Durable Object migrations
  adopt?: boolean; // Default false, adopt existing worker
  compatibilityDate?: string; // Default "2025-04-20"
  compatibilityFlags?: string[];
  assets?: object; // Static assets configuration (deprecated, use Website or Assets binding)
  crons?: string[]; // Cron expressions for scheduled triggers
  eventSources?: WorkerEventSource[]; // e.g., { queue: QueueOutput, batchSize?: number }
}
interface WorkerOutput extends WorkerProps {
  id: string; // Worker ID / Name
  url?: string; // Full workers.dev URL if enabled
  // Other output properties like etag, routes, etc.
}
\`\`\`

## WranglerJson
Generates a \`wrangler.jsonc\` configuration file for a Cloudflare Worker.
\`\`\`typescript
interface WranglerJsonProps {
  name?: string; // Worker name in the file
  worker: WorkerOutput; // The worker resource instance
  path?: string; // Path to write file, defaults to \`cwd/wrangler.jsonc\`
  main?: string; // Main entrypoint in file, defaults to worker.entrypoint
}
interface WranglerJsonOutput extends WranglerJsonProps {
  // Output properties if any (e.g., confirmation of file write)
}
\`\`\`

## Zone
Creates and manages Cloudflare Zones (domains) and their configuration settings.
\`\`\`typescript
interface ZoneSettings { // Representative examples, many more exist
  ssl?: "off" | "flexible" | "full" | "strict";
  alwaysUseHttps?: "on" | "off";
  browserCacheTtl?: number; // seconds
  developmentMode?: "on" | "off";
  // ... and many other Cloudflare zone settings
}
interface ZoneProps extends CloudflareApiOptions {
  name: string; // The domain name for the zone
  delete?: boolean; // Default false, delete zone on destroy
  type?: "full" | "partial" | "secondary"; // Default "full"
  jumpStart?: boolean; // Default true, fetch existing DNS records
  settings?: ZoneSettings;
}
interface ZoneOutput extends ZoneProps {
  id: string; // Zone ID
  status: string;
  name_servers: string[];
  // Other output properties from API
}
\`\`\`
`;