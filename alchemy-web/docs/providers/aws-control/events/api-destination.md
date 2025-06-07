---
title: Managing AWS Events ApiDestinations with Alchemy
description: Learn how to create, update, and manage AWS Events ApiDestinations using Alchemy Cloud Control.
---

# ApiDestination

The ApiDestination resource lets you create and manage [AWS Events ApiDestinations](https://docs.aws.amazon.com/events/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-apidestination.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const apidestination = await AWS.Events.ApiDestination("apidestination-example", {
  ConnectionArn: "example-connectionarn",
  InvocationEndpoint: "example-invocationendpoint",
  HttpMethod: "example-httpmethod",
  Description: "A apidestination resource managed by Alchemy",
});
```

## Advanced Configuration

Create a apidestination with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApiDestination = await AWS.Events.ApiDestination("advanced-apidestination", {
  ConnectionArn: "example-connectionarn",
  InvocationEndpoint: "example-invocationendpoint",
  HttpMethod: "example-httpmethod",
  Description: "A apidestination resource managed by Alchemy",
});
```

