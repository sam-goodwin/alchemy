# Database

## Basic Usage

```typescript
import { Database } from "alchemy/railway";

// Basic PostgreSQL database
const database = await Database("postgres-db", {
  name: "main-database",
  project: project,
  environment: environment,
  type: "postgresql",
});
```

## Multiple Database Types

```typescript
// Multiple database types
const postgres = await Database("postgres-db", {
  name: "main-database", 
  project: project,
  environment: environment,
  type: "postgresql",
});

const redis = await Database("redis-cache", {
  name: "session-cache",
  project: project,
  environment: environment, 
  type: "redis",
});
```

## String References

```typescript
// Using string references
const database = await Database("my-db", {
  name: "production-db",
  project: "project_abc123",
  environment: "env_xyz789",
  type: "postgresql",
});
```