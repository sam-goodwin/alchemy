# Database

A Database in Turso is a distributed SQLite database instance. Databases belong to a group and inherit their replication settings from that group.

## Properties

### Input Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `group` | `string \| Group` | No | The group to create the database in. Can be a group name string or a Group resource. Defaults to `"default"`. |
| `is_schema` | `boolean` | No | Whether this database is a schema database. Schema databases are used as templates for other databases. Defaults to `false`. |
| `schema` | `string \| Database` | No | Reference to a schema database for consistent schema management. Can be a database name string or a Database resource. |
| `size_limit` | `string` | No | Database size limit (e.g., "1GB", "500MB"). |
| `seed` | `object` | No | Seed configuration for initializing the database with data. |
| `seed.type` | `"database" \| "dump"` | Yes (if seed) | Type of seed source. |
| `seed.value` | `string` | Yes (if seed) | For type "database": name of the database to copy from. For type "dump": URL of the dump file. |
| `seed.timestamp` | `string` | No | For type "database": optional timestamp for point-in-time recovery. |

### Output Properties

| Property | Type | Description |
|----------|------|-------------|
| `databaseName` | `string` | The name of the database (same as the resource ID). |
| `DbId` | `string` | Unique database identifier. |
| `Hostname` | `string` | Database hostname for connections. |
| `group` | `string` | The group this database belongs to. |
| `is_schema` | `boolean` | Whether this is a schema database. |
| `schema` | `string` | The schema database this database uses (if any). |
| `regions` | `string[]` | Database regions inherited from the group. |
| `primaryRegion` | `string` | Primary region inherited from the group. |
| `sleeping` | `boolean` | Whether the database is currently sleeping (inactive). |

## Examples

### Basic Database

Create a database in the default group:

```ts
import { Database } from "@alchemy/turso";

const db = await Database("my-app", {});

// Connect using the hostname
console.log(`Database URL: https://${db.Hostname}`);
```

### Database with Custom Group

Create a database in a specific group:

```ts
import { Group, Database } from "@alchemy/turso";

const group = await Group("production", {
  locations: ["iad", "lhr", "syd"],
  primary: "iad",
});

const db = await Database("app-db", {
  group: group,
  size_limit: "10GB",
});
```

### Schema Database Pattern

Use schema databases for consistent schema management across environments:

```ts
import { Database } from "@alchemy/turso";

// Create a schema database
const schemaDb = await Database("app-schema", {
  is_schema: true,
});

// Create databases that use the schema
const productionDb = await Database("production", {
  schema: schemaDb,
});

const stagingDb = await Database("staging", {
  schema: schemaDb,
});

const developmentDb = await Database("development", {
  schema: schemaDb,
});
```

### Database with Seed Data

Initialize a database with data from another database:

```ts
import { Database } from "@alchemy/turso";

// Create a production database
const prodDb = await Database("production", {
  size_limit: "10GB",
});

// Create a staging database with production data
const stagingDb = await Database("staging", {
  seed: {
    type: "database",
    value: "production",
    timestamp: "2024-01-01T00:00:00Z", // Optional: specific point in time
  },
});

// Create a test database from a dump file
const testDb = await Database("test", {
  seed: {
    type: "dump",
    value: "https://example.com/seed-data.sql",
  },
});
```

### Multi-Tenant Pattern

Create isolated databases for each tenant:

```ts
import { Group, Database } from "@alchemy/turso";

// Create a group for tenant databases
const tenantGroup = await Group("tenants", {
  locations: ["iad", "lhr"],
});

// Create a schema database for all tenants
const schemaDb = await Database("tenant-schema", {
  group: tenantGroup,
  is_schema: true,
});

// Create databases for each tenant
const tenant1Db = await Database("tenant-acme", {
  group: tenantGroup,
  schema: schemaDb,
  size_limit: "1GB",
});

const tenant2Db = await Database("tenant-globex", {
  group: tenantGroup,
  schema: schemaDb,
  size_limit: "2GB",
});
```

## Connection

To connect to a Turso database, you'll need:

1. The database URL: `https://${database.Hostname}`
2. An authentication token (created separately via the Turso dashboard or API)

Example using the Turso SDK:

```ts
import { createClient } from "@libsql/client";

const client = createClient({
  url: `https://${database.Hostname}`,
  authToken: process.env.TURSO_DATABASE_TOKEN,
});
```

## Important Notes

1. **Database Name**: The database name is immutable after creation and must be unique within your organization.

2. **Group Assignment**: The group cannot be changed after database creation. Choose carefully based on your replication needs.

3. **Schema Databases**: Databases marked with `is_schema: true` are intended to hold schema definitions only, not application data.

4. **Size Limits**: Size limits help control costs. The database will become read-only when the limit is reached.

5. **Sleeping Databases**: Inactive databases may go to sleep to save resources. They wake automatically on the next request.

6. **Free Tier Limits**: Free accounts are limited to 3 databases.

## Related Resources

- [Group](./group.md) - Groups define the replication topology for databases