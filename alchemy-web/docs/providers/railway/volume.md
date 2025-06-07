---
title: Managing Railway Volumes with Alchemy
description: Learn how to create and manage Railway volumes using Alchemy for persistent storage in your applications.
---

# Railway Volume

A Railway volume represents persistent storage that can be mounted to services within a project environment.

## Basic Volume

Create a simple data volume:

```typescript
import { Environment, Project, Volume } from "alchemy/railway";

const project = await Project("my-project", {
  name: "My Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const dataVolume = await Volume("data-volume", {
  name: "app-data",
  project: project,
  environment: environment,
  mountPath: "/data",
  size: 1024, // 1GB
});
```

## Large Storage Volume

Create a volume for file uploads and user content:

```typescript
import { Environment, Project, Volume } from "alchemy/railway";

const project = await Project("content-platform", {
  name: "Content Platform",
  description: "User-generated content platform",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const fileStorage = await Volume("file-storage", {
  name: "user-uploads",
  project: project,
  environment: environment,
  mountPath: "/app/uploads",
  size: 10240, // 10GB
});

const mediaStorage = await Volume("media-storage", {
  name: "media-files",
  project: project,
  environment: environment,
  mountPath: "/app/media",
  size: 51200, // 50GB
});
```

## Application Logs

Set up volumes for log storage and monitoring:

```typescript
import { Environment, Project, Volume } from "alchemy/railway";

const project = await Project("enterprise-app", {
  name: "Enterprise Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const logsVolume = await Volume("logs-volume", {
  name: "application-logs",
  project: project,
  environment: environment,
  mountPath: "/var/log/app",
  size: 2048, // 2GB
});

const auditVolume = await Volume("audit-volume", {
  name: "audit-logs",
  project: project,
  environment: environment,
  mountPath: "/var/log/audit",
  size: 4096, // 4GB
});
```

## Database Storage

Create volumes for database data persistence:

```typescript
import { Environment, Project, Volume } from "alchemy/railway";

const project = await Project("database-app", {
  name: "Database Application",
});

const environment = await Environment("prod-env", {
  name: "production",
  project: project,
});

const dbVolume = await Volume("db-volume", {
  name: "postgres-data",
  project: project,
  environment: environment,
  mountPath: "/var/lib/postgresql/data",
  size: 20480, // 20GB
});
```

## Using String References

Reference projects and environments by their ID strings:

```typescript
import { Volume } from "alchemy/railway";

const volume = await Volume("my-volume", {
  name: "persistent-data",
  project: "project_abc123",
  environment: "env_xyz789",
  mountPath: "/data",
  size: 5120, // 5GB
});
```

## Properties

### Required

- **name** (string): The name of the volume
- **project** (string | Project): The project this volume belongs to
- **environment** (string | Environment): The environment this volume belongs to
- **mountPath** (string): The path where the volume will be mounted in the container

### Optional

- **size** (number): The size of the volume in MB. Defaults to Railway's default size
- **apiKey** (Secret): Railway API token for authentication. Defaults to `RAILWAY_TOKEN` environment variable

## Outputs

- **id** (string): The unique identifier of the volume
- **projectId** (string): The ID of the parent project
- **environmentId** (string): The ID of the parent environment
- **createdAt** (string): When the volume was created
- **updatedAt** (string): When the volume was last updated
