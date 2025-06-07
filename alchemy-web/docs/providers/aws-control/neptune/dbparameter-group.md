---
title: Managing AWS Neptune DBParameterGroups with Alchemy
description: Learn how to create, update, and manage AWS Neptune DBParameterGroups using Alchemy Cloud Control.
---

# DBParameterGroup

The DBParameterGroup resource lets you manage [AWS Neptune DBParameterGroups](https://docs.aws.amazon.com/neptune/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic DBParameterGroup with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicDBParameterGroup = await AWS.Neptune.DBParameterGroup("BasicDBParameterGroup", {
  Description: "Basic parameter group for Neptune",
  Parameters: {
    "max_connections": "100",
    "query_timeout": "300"
  },
  Family: "neptune1",
  Tags: [{ Key: "Environment", Value: "development" }],
  Name: "basic-neptune-params"
});
```

## Advanced Configuration

Configure a DBParameterGroup with additional parameters for more advanced settings.

```ts
const AdvancedDBParameterGroup = await AWS.Neptune.DBParameterGroup("AdvancedDBParameterGroup", {
  Description: "Advanced parameter group for Neptune with custom settings",
  Parameters: {
    "max_connections": "200",
    "query_timeout": "600",
    "synchronous_commit": "off",
    "transaction_isolation": "read committed"
  },
  Family: "neptune1",
  Tags: [{ Key: "Environment", Value: "production" }, { Key: "Team", Value: "DataScience" }],
  Name: "advanced-neptune-params"
});
```

## Custom Parameter Group for Testing

Create a DBParameterGroup specifically tailored for testing purposes.

```ts
const TestDBParameterGroup = await AWS.Neptune.DBParameterGroup("TestDBParameterGroup", {
  Description: "Parameter group used for testing Neptune configurations",
  Parameters: {
    "max_connections": "50",
    "query_timeout": "120",
    "log_statement": "all"
  },
  Family: "neptune1",
  Tags: [{ Key: "Environment", Value: "testing" }],
  Name: "test-neptune-params"
});
```