---
order: 10
title: Replace
description: Learn how to safely replace infrastructure resources with Alchemy. Understand the risks and best practices for resource replacement.
---

It is some times impossible to UPDATE a resource, e.g. you cannot rename a R2 Bucket name.
In these cases, you need to perform a REPLACE operation to:

1. create a new version of the Resource and update references
2. delete the old version of the Resource (or leave it orphaned)

## Trigger Replacement

During the **update phase**, you can trigger a replacement by calling `this.replace()`:

```typescript
// Implementation pattern
if (this.phase === "update") {
  if (this.output.name !== props.name) {
    // trigger replace and terminate this `"update"` phase
    this.replace();
    // (unreachable code)
  } else {
    return updateResource();
  }
}
```

## Create new

After you call `this.replace()`, the `"update"` phase will terminate and be re-invoked with `"create"` (to create the new resource).

```ts
if (this.phase === "create") {
  return createNewResource();
}
```

## Delete old

After all downstream dependencies have been updated and you finally call `app.finalize()`, Alchemy will then invoke the `"delete"` phase on the old resource.

```ts
const app = await alchemy("app");

// ... create resources

await app.finalize(); // finalize scopes by deleting "orphaned" and "replaced" resources
```

## Related Concepts

- **[Destroy](./destroy.md)** - How to destroy resources
- **[Scope](./scope.md)** - Scope lifecycle
