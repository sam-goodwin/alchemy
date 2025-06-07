---
title: Managing AWS Events Endpoints with Alchemy
description: Learn how to create, update, and manage AWS Events Endpoints using Alchemy Cloud Control.
---

# Endpoint

The Endpoint resource lets you create and manage [AWS Events Endpoints](https://docs.aws.amazon.com/events/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-endpoint.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const endpoint = await AWS.Events.Endpoint("endpoint-example", {
  EventBuses: [],
  RoutingConfig: "example-routingconfig",
  Description: "A endpoint resource managed by Alchemy",
});
```

## Advanced Configuration

Create a endpoint with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEndpoint = await AWS.Events.Endpoint("advanced-endpoint", {
  EventBuses: [],
  RoutingConfig: "example-routingconfig",
  Description: "A endpoint resource managed by Alchemy",
});
```

