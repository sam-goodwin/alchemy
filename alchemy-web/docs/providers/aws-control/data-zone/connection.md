---
title: Managing AWS DataZone Connections with Alchemy
description: Learn how to create, update, and manage AWS DataZone Connections using Alchemy Cloud Control.
---

# Connection

The Connection resource lets you create and manage [AWS DataZone Connections](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-connection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connection = await AWS.DataZone.Connection("connection-example", {
  EnvironmentIdentifier: "example-environmentidentifier",
  Name: "connection-",
  DomainIdentifier: "example-domainidentifier",
  Description: "A connection resource managed by Alchemy",
});
```

## Advanced Configuration

Create a connection with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnection = await AWS.DataZone.Connection("advanced-connection", {
  EnvironmentIdentifier: "example-environmentidentifier",
  Name: "connection-",
  DomainIdentifier: "example-domainidentifier",
  Description: "A connection resource managed by Alchemy",
});
```

