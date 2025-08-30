---
title: Role
description: Learn how to create and manage PostgreSQL database roles for PlanetScale PostgreSQL branches using Alchemy.
---

The Role resource lets you create and manage [database roles](https://planetscale.com/docs/postgres/roles) for PlanetScale PostgreSQL branches with specific permissions and time-to-live settings.

:::note
Roles are only available for PostgreSQL databases. For MySQL databases, use the [Password](/providers/planetscale/password) resource instead.
:::

## Minimal Example

Create a basic role with postgres privileges:

```ts
import { Role } from "alchemy/planetscale";

const role = await Role("app-role", {
  database: "my-database",
  organizationId: "my-org",
  inheritedRoles: ["postgres"],
});
```

## Role with Specific Branch

Create a role for a specific branch:

```ts
import { Role, Database, Branch } from "alchemy/planetscale";

const database = await Database("my-db", {
  name: "my-database",
  organizationId: "my-org",
  clusterSize: "PS_10",
  kind: "postgresql",
});

const branch = await Branch("dev-branch", {
  name: "development",
  organizationId: "my-org",
  database: database,
  parentBranch: "main",
});

const role = await Role("dev-role", {
  database: database,
  branch: branch,
  inheritedRoles: ["pg_read_all_data", "pg_write_all_data"],
});
```

## Role with TTL

Create a role with a 1-hour time-to-live:

```ts
import { Role } from "alchemy/planetscale";

const temporaryRole = await Role("temp-role", {
  database: "my-database",
  organizationId: "my-org",
  branch: "main",
  ttl: 3600, // 1 hour in seconds
  inheritedRoles: ["pg_read_all_data"],
});
```

## Role with Read-Only Access

Create a role with read-only permissions:

```ts
import { Role } from "alchemy/planetscale";

const readOnlyRole = await Role("reader", {
  database: "my-database",
  organizationId: "my-org",
  inheritedRoles: [
    "pg_read_all_data",
    "pg_read_all_settings",
    "pg_read_all_stats"
  ],
});
```

## Role with Monitor Permissions

Create a role with monitoring and maintenance permissions:

```ts
import { Role } from "alchemy/planetscale";

const monitorRole = await Role("monitor", {
  database: "my-database",
  organizationId: "my-org",
  inheritedRoles: [
    "pg_monitor",
    "pg_read_all_settings",
    "pg_read_all_stats",
    "pg_stat_scan_tables"
  ],
});
```

## Accessing Connection Details

Once created, the role provides connection details:

```ts
import { Role } from "alchemy/planetscale";

const role = await Role("app-role", {
  database: "my-database",
  organizationId: "my-org",
  inheritedRoles: ["postgres"],
});

// Access connection details
console.log("Host:", role.host);
console.log("Username:", role.username);
console.log("Database Name:", role.databaseName);
console.log("Expires At:", role.expiresAt);

// Use connection URLs
const directConnection = role.connectionUrl; // Port 5432
const pooledConnection = role.connectionUrlPooled; // Port 6432 (recommended)
```

## Using with Hyperdrive

Roles work seamlessly with Cloudflare Hyperdrive for connection pooling:

```ts
import { Role, Database } from "alchemy/planetscale";
import { Hyperdrive } from "alchemy/cloudflare";

const database = await Database("my-db", {
  name: "my-database",
  organizationId: "my-org",
  clusterSize: "PS_10",
  kind: "postgresql",
});

const role = await Role("app-role", {
  database: database,
  branch: database.defaultBranch,
  inheritedRoles: ["postgres"],
});

const hyperdrive = await Hyperdrive("my-hyperdrive", {
  origin: role.connectionUrl,
  caching: { disabled: true },
});
```

## Available Inherited Roles

The following PostgreSQL roles can be inherited:

- **`postgres`** - Superuser role with all privileges
- **`pg_read_all_data`** - Read access to all tables and views
- **`pg_write_all_data`** - Write access to all tables
- **`pg_read_all_settings`** - Read access to all configuration parameters
- **`pg_read_all_stats`** - Read access to all statistics views
- **`pg_monitor`** - Monitor database activity and statistics
- **`pg_checkpoint`** - Execute checkpoints
- **`pg_create_subscription`** - Create logical replication subscriptions
- **`pg_maintain`** - Execute maintenance operations
- **`pg_signal_backend`** - Send signals to other backends
- **`pg_stat_scan_tables`** - Execute monitoring functions that may take locks
- **`pg_use_reserved_connections`** - Use reserved connection slots