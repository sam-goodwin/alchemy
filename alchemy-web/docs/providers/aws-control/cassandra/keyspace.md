---
title: Managing AWS Cassandra Keyspaces with Alchemy
description: Learn how to create, update, and manage AWS Cassandra Keyspaces using Alchemy Cloud Control.
---

# Keyspace

The Keyspace resource lets you create and manage [AWS Cassandra Keyspaces](https://docs.aws.amazon.com/cassandra/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cassandra-keyspace.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const keyspace = await AWS.Cassandra.Keyspace("keyspace-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a keyspace with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedKeyspace = await AWS.Cassandra.Keyspace("advanced-keyspace", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

