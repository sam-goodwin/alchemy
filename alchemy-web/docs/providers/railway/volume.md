# Volume

## Basic Usage

```typescript
import { Volume } from "alchemy/railway";

// Basic data volume
const dataVolume = await Volume("data-volume", {
  name: "app-data",
  project: project,
  environment: environment,
  mountPath: "/data",
  size: 1024, // 1GB
});
```

## Large Storage Volume

```typescript
// Large storage volume
const fileStorage = await Volume("file-storage", {
  name: "user-uploads",
  project: project,
  environment: environment,
  mountPath: "/app/uploads",
  size: 10240, // 10GB
});
```

## String References

```typescript
// Using string references
const volume = await Volume("my-volume", {
  name: "persistent-data",
  project: "project_abc123",
  environment: "env_xyz789",
  mountPath: "/data",
  size: 5120, // 5GB
});
```