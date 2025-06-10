---
title: Serialization and Deserialization in Alchemy
description: Understand Alchemy's serialization (serde) system for handling JavaScript objects, secrets, dates, and schemas in state files. Learn usage and best practices.
---

Alchemy uses a sophisticated serialization system to properly handle JavaScript objects, special types, and sensitive data. This system is crucial for correctly storing and retrieving resource state.

## Overview

The `serialize` and `deserialize` functions in Alchemy handle the conversion between in-memory JavaScript objects and their JSON-compatible representation for storage:

- **serialize**: Converts JavaScript objects to JSON-compatible structures, handling special cases
- **deserialize**: Converts the serialized data back into JavaScript objects with proper typing

## Special Type Handling

Alchemy's serialization system handles several special cases:

### Secrets

Secrets are automatically encrypted when serialized and decrypted when deserialized:

```typescript
// In memory
const apiKey = alchemy.secret("my-secret-api-key");

// Serialized representation
{
  "@secret": "Tgz3e/WAscu4U1oanm5S4YXH..." // encrypted value
}
```

This ensures sensitive information isn't stored in plain text in state files.

### Dates

JavaScript Date objects are serialized with an ISO timestamp:

```typescript
// In memory
const createdAt = new Date();

// Serialized representation
{
  "@date": "2023-06-15T12:30:45.123Z"
}
```

### Schema Types

Type definitions created with ArkType are properly serialized:

```typescript
// In memory
const schema = Type.String();

// Serialized representation
{
  "@schema": { /* schema definition */ }
}
```

### Objects and Circular References

The serialization system properly handles complex object structures including:

- Nested objects
- Arrays
- Maps
- Sets
- Circular references (objects that reference each other)

## Using the Serialization System

The serialization system is primarily used by Alchemy's state store implementations but can be useful in custom resources too:

```typescript
import { serialize, deserialize } from "alchemy";

// Serialize an object
const serializedData = await serialize(scope, complexObject);

// Store serialized data (e.g., in a database)
await db.put("my-key", JSON.stringify(serializedData));

// Later, retrieve and deserialize
const storedData = await db.get("my-key");
const deserializedObject = await deserialize(scope, JSON.parse(storedData));
```

## Encryption and Passwords

When serializing secrets, a password must be set on the scope:

```typescript
const app = await alchemy("my-app", {
  password: process.env.SECRET_PASSPHRASE,
});
```

If you attempt to serialize a secret without a password, you'll get an error:

```
Error: Cannot serialize secret without password
```

Similarly, when deserializing encrypted secrets, the same password must be provided.

## Serialization Options

The `serialize` function accepts options to control the serialization process:

```typescript
// Skip encryption (for debugging or special cases)
const serializedData = await serialize(scope, value, {
  encrypt: false,
});
```

## Implementation Details

The serialization system uses a recursive approach to handle nested structures:

1. **Arrays** are processed element by element
2. **Objects** are processed property by property
3. **Special types** are detected and replaced with tagged values
4. **Circular references** are detected and properly handled

During deserialization, the process is reversed, restoring the original structure including special types.

## Skipped and Excluded Types

Some types are excluded or skipped during serialization:

- **Scope objects** are skipped (set to `undefined`)
- **Functions** are not specially handled (converted to `undefined` by JSON)
- **Symbols** are not specially handled (converted to `undefined` by JSON)

## Related Concepts

- [State Management](../concepts/state)
- [Secrets Management](../concepts/secret)
- [Custom State Stores](../guides/custom-state-store)
