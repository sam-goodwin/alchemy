---
title: ParameterGroup
description: Learn how to create, update, and manage AWS MemoryDB ParameterGroups using Alchemy Cloud Control.
---


The ParameterGroup resource lets you manage [AWS MemoryDB ParameterGroups](https://docs.aws.amazon.com/memorydb/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic MemoryDB ParameterGroup with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicParameterGroup = await AWS.MemoryDB.ParameterGroup("basic-parameter-group", {
  ParameterGroupName: "default",
  Family: "redis",
  Description: "Basic parameter group for Redis"
});
```

## Advanced Configuration

Configure a ParameterGroup with specific parameters to customize MemoryDB settings.

```ts
const advancedParameterGroup = await AWS.MemoryDB.ParameterGroup("advanced-parameter-group", {
  ParameterGroupName: "custom-redis",
  Family: "redis",
  Description: "Advanced parameter group with custom settings",
  Parameters: {
    maxmemory: "512mb",
    timeout: "300",
    save: "60 1"
  }
});
```

## Tagging for Resource Management

Create a ParameterGroup with tags for better resource management and identification.

```ts
const taggedParameterGroup = await AWS.MemoryDB.ParameterGroup("tagged-parameter-group", {
  ParameterGroupName: "tagged-redis",
  Family: "redis",
  Description: "Parameter group with tags",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Adopting Existing Resources

Create a ParameterGroup while adopting an existing resource, avoiding failure if it already exists.

```ts
const adoptedParameterGroup = await AWS.MemoryDB.ParameterGroup("adopted-parameter-group", {
  ParameterGroupName: "existing-redis",
  Family: "redis",
  Description: "Adopting an existing parameter group",
  adopt: true
});
```
