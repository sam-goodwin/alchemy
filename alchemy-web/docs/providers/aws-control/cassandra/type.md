---
title: Managing AWS Cassandra Types with Alchemy
description: Learn how to create, update, and manage AWS Cassandra Types using Alchemy Cloud Control.
---

# Type

The Type resource lets you create and manage [AWS Cassandra Types](https://docs.aws.amazon.com/cassandra/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cassandra-type.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const type = await AWS.Cassandra.Type("type-example", {
  TypeName: "type-type",
  Fields: [],
  KeyspaceName: "type-keyspace",
});
```

