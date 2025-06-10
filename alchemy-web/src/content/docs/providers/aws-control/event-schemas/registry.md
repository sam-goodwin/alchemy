---
title: Registry
description: Learn how to create, update, and manage AWS EventSchemas Registrys using Alchemy Cloud Control.
---


The Registry resource allows you to create and manage [AWS EventSchemas Registrys](https://docs.aws.amazon.com/eventschemas/latest/userguide/) for organizing event schemas in your AWS account.

## Minimal Example

Create a basic EventSchemas Registry with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const basicRegistry = await AWS.EventSchemas.Registry("basic-registry", {
  Description: "This is a basic registry for event schemas.",
  RegistryName: "BasicEventRegistry",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "EventProcessing" }
  ]
});
```

## Advanced Configuration

Configure a registry that enables adoption of existing resources if they already exist.

```ts
const advancedRegistry = await AWS.EventSchemas.Registry("advanced-registry", {
  Description: "This registry adopts existing resources if present.",
  RegistryName: "AdvancedEventRegistry",
  adopt: true,
  Tags: [
    { Key: "UseCase", Value: "EventManagement" }
  ]
});
```

## Registry Without Tags

Create a registry without any tags, focusing solely on the name and description.

```ts
const noTagsRegistry = await AWS.EventSchemas.Registry("no-tags-registry", {
  Description: "Registry created without tags.",
  RegistryName: "NoTagsEventRegistry"
});
```

## Read-Only Registry

Establish a registry designed for read-only purposes by not including certain optional properties.

```ts
const readOnlyRegistry = await AWS.EventSchemas.Registry("read-only-registry", {
  Description: "This registry is intended for read-only access.",
  RegistryName: "ReadOnlyEventRegistry"
});
```
