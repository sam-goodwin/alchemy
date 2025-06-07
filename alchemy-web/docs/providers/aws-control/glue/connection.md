---
title: Managing AWS Glue Connections with Alchemy
description: Learn how to create, update, and manage AWS Glue Connections using Alchemy Cloud Control.
---

# Connection

The Connection resource lets you create and manage [AWS Glue Connections](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-connection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connection = await AWS.Glue.Connection("connection-example", {
  ConnectionInput: "example-connectioninput",
  CatalogId: "example-catalogid",
});
```

