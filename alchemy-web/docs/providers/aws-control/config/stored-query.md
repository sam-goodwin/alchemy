---
title: Managing AWS Config StoredQuerys with Alchemy
description: Learn how to create, update, and manage AWS Config StoredQuerys using Alchemy Cloud Control.
---

# StoredQuery

The StoredQuery resource lets you create and manage [AWS Config StoredQuerys](https://docs.aws.amazon.com/config/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-config-storedquery.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const storedquery = await AWS.Config.StoredQuery("storedquery-example", {
  QueryExpression: "example-queryexpression",
  QueryName: "storedquery-query",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a storedquery with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedStoredQuery = await AWS.Config.StoredQuery("advanced-storedquery", {
  QueryExpression: "example-queryexpression",
  QueryName: "storedquery-query",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

