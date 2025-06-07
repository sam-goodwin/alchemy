---
title: Managing AWS Events Connections with Alchemy
description: Learn how to create, update, and manage AWS Events Connections using Alchemy Cloud Control.
---

# Connection

The Connection resource lets you create and manage [AWS Events Connections](https://docs.aws.amazon.com/events/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-connection.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const connection = await AWS.Events.Connection("connection-example", {
  Description: "A connection resource managed by Alchemy",
});
```

## Advanced Configuration

Create a connection with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedConnection = await AWS.Events.Connection("advanced-connection", {
  Description: "A connection resource managed by Alchemy",
});
```

