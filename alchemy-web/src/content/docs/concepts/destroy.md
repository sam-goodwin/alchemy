---
title: Destroy
description: Learn how to safely destroy infrastructure resources with Alchemy. Master application teardown, targeted resource cleanup, and proper destruction order.
sidebar:
  order: 9
---

Resource destruction in Alchemy removes resources from both your state file and the underlying infrastructure.

## Resource vs. Application Destruction

### Application Destruction
```typescript
// Destroys all resources in the application
const app = await alchemy("my-app", {
  phase: "destroy"  // or process.argv.includes("--destroy") ? "destroy" : "up"
});
```
Use for: Complete teardown of environments, cleaning up all infrastructure managed by the app.

### Resource/Scope Destruction
```typescript
// Destroys only the specified resource(s)
await destroy(myResource);  // Single resource
await destroy(scope);       // All resources in scope
```
Use for: Targeted cleanup of specific resources or test resources without affecting the rest of your app.

## Ways to Destroy Resources

### 1. Code Removal

```typescript
// Remove or comment out resource declarations to destroy them
// const myFile = await File("config.json", { ... });
```

### 2. Using the --destroy Flag

```typescript
// In alchemy.run.ts
const app = await alchemy("my-app", {
  stage: "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up"
});

// Run with: bun ./alchemy.run.ts --destroy
```

### 3. Programmatic Destruction

```typescript
// Destroy a specific resource
import { destroy } from "alchemy";
await destroy(myFile);
```

## Destruction Order

Resources are destroyed in dependency order: dependents first, then dependencies.

## Best Practices

```typescript
// When implementing custom resources, handle deletion phase
if (this.phase === "delete") {
  await api.delete(`/resources/${this.output.id}`);
  return this.destroy();
}
```
