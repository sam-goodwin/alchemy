---
title: Managing AWS EventSchemas Registrys with Alchemy
description: Learn how to create, update, and manage AWS EventSchemas Registrys using Alchemy Cloud Control.
---

# Registry

The Registry resource allows you to manage [AWS EventSchemas Registrys](https://docs.aws.amazon.com/eventschemas/latest/userguide/) for organizing and managing event schemas across your AWS account.

## Minimal Example

Create a basic EventSchemas Registry with a name and description:

```ts
import AWS from "alchemy/aws/control";

const myRegistry = await AWS.EventSchemas.Registry("MyEventRegistry", {
  RegistryName: "MyEventRegistry",
  Description: "A registry for managing event schemas"
});
```

## Advanced Configuration

Configure the registry with additional properties like tags for better resource management:

```ts
const taggedRegistry = await AWS.EventSchemas.Registry("TaggedEventRegistry", {
  RegistryName: "TaggedEventRegistry",
  Description: "A registry with tags for better organization",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing EventSchemas Registry without failing, you can set the `adopt` property:

```ts
const adoptExistingRegistry = await AWS.EventSchemas.Registry("AdoptedEventRegistry", {
  RegistryName: "ExistingEventRegistry",
  Description: "Adopting an existing registry",
  adopt: true
});
```