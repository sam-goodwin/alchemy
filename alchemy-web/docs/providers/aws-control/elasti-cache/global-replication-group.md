---
title: Managing AWS ElastiCache GlobalReplicationGroups with Alchemy
description: Learn how to create, update, and manage AWS ElastiCache GlobalReplicationGroups using Alchemy Cloud Control.
---

# GlobalReplicationGroup

The GlobalReplicationGroup resource lets you create and manage [AWS ElastiCache GlobalReplicationGroups](https://docs.aws.amazon.com/elasticache/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticache-globalreplicationgroup.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const globalreplicationgroup = await AWS.ElastiCache.GlobalReplicationGroup(
  "globalreplicationgroup-example",
  { Members: [] }
);
```

