# Service

## Basic Usage

```typescript
import { Service } from "alchemy/railway";

// Basic service
const service = await Service("api-service", {
  name: "api",
  project: project,
});
```

## GitHub Repository Service

```typescript
// GitHub repository service
const webApp = await Service("web-app", {
  name: "frontend",
  project: project,
  sourceRepo: "https://github.com/myorg/web-app",
  sourceRepoBranch: "main",
  rootDirectory: "/",
});
```

## String References

```typescript
// Using string references
const service = await Service("my-service", {
  name: "api",
  project: "project_abc123",
});
```