---
title: Resource Adoption
description: Learn how to adopt existing infrastructure with Alchemy resources instead of failing when resources already exist.
sidebar:
  order: 10
---

When creating a resource, Alchemy will fail if a resource with the same name already exists. Resource adoption allows you to opt in to using the pre-existing resource instead.

## Basic Usage

```typescript
// Without adoption - fails if bucket already exists
const bucket = await R2Bucket("my-bucket", {
  name: "existing-bucket",
});

// With adoption - uses existing bucket if it exists
const bucket = await R2Bucket("my-bucket", {
  name: "existing-bucket",
  adopt: true,
});
```

## How It Works

During the **create phase**, if a resource already exists:

- **Without adoption** (default): Throws an "already exists" error
- **With adoption**: Finds and adopts the existing resource

```typescript
// Implementation pattern
if (this.phase === "create") {
  try {
    // Try to create the resource
    return await createResource(props);
  } catch (err) {
    if (err.status === 409 && props.adopt) {
      // Adopt existing resource instead
      return await findExistingResource(props);
    }
    throw err;
  }
}
```

## Related Concepts

- **[Resource](./resource)** - Understanding Alchemy's resource model
- **[State](./state)** - How Alchemy tracks resource state
