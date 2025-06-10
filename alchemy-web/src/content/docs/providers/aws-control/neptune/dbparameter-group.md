---
title: DBParameterGroup
description: Learn how to create, update, and manage AWS Neptune DBParameterGroups using Alchemy Cloud Control.
---


The DBParameterGroup resource lets you manage [AWS Neptune DBParameterGroups](https://docs.aws.amazon.com/neptune/latest/userguide/) which define database engine configuration settings for your Neptune databases.

## Minimal Example

Create a basic DBParameterGroup with required properties and common optional ones:

```ts
import AWS from "alchemy/aws/control";

const dbParameterGroup = await AWS.Neptune.DBParameterGroup("myDbParameterGroup", {
  Description: "My Neptune DB Parameter Group",
  Parameters: {
    "max_connections": "100",
    "query_timeout": "300"
  },
  Family: "neptune1",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "NeptuneMigration" }
  ]
});
```

## Advanced Configuration

Configure a DBParameterGroup with more advanced settings:

```ts
const advancedDbParameterGroup = await AWS.Neptune.DBParameterGroup("advancedDbParameterGroup", {
  Description: "Advanced Neptune DB Parameter Group with custom settings",
  Parameters: {
    "max_connections": "200",
    "idle_timeout": "600",
    "query_timeout": "300",
    "enable_audit_logging": "true"
  },
  Family: "neptune1",
  Name: "AdvancedNeptuneGroup"
});
```

## Custom Parameter Group for Testing

Create a DBParameterGroup specifically for testing purposes:

```ts
const testDbParameterGroup = await AWS.Neptune.DBParameterGroup("testDbParameterGroup", {
  Description: "Test DB Parameter Group for Development",
  Parameters: {
    "max_connections": "50",
    "query_timeout": "120",
    "enable_query_logging": "false"
  },
  Family: "neptune1",
  Name: "TestNeptuneGroup",
  adopt: true // Adopt existing resource if it exists
});
```
