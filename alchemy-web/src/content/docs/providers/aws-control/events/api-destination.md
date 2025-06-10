---
title: ApiDestination
description: Learn how to create, update, and manage AWS Events ApiDestinations using Alchemy Cloud Control.
---


The ApiDestination resource lets you manage [AWS Events ApiDestinations](https://docs.aws.amazon.com/events/latest/userguide/) that route event data to HTTP endpoints based on configuration settings.

## Minimal Example

Create a basic ApiDestination with required properties and some optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicApiDestination = await AWS.Events.ApiDestination("basicApiDestination", {
  ConnectionArn: "arn:aws:events:us-east-1:123456789012:connection/my-connection",
  InvocationEndpoint: "https://api.example.com/data",
  HttpMethod: "POST",
  Description: "This is a basic ApiDestination for event data routing."
});
```

## Advanced Configuration

Configure an ApiDestination with an invocation rate limit per second for throttling requests.

```ts
const advancedApiDestination = await AWS.Events.ApiDestination("advancedApiDestination", {
  ConnectionArn: "arn:aws:events:us-west-2:123456789012:connection/another-connection",
  InvocationEndpoint: "https://api.example.com/advanced-data",
  HttpMethod: "PUT",
  InvocationRateLimitPerSecond: 5,
  Description: "This ApiDestination includes rate limiting for requests."
});
```

## Usage with EventBridge Rule

Demonstrate how to use an ApiDestination in conjunction with an EventBridge rule to route specific events.

```ts
import AWS from "alchemy/aws/control";

const eventRule = await AWS.Events.Rule("myEventRule", {
  EventPattern: {
    source: ["my.application"],
    detailType: ["app.event"]
  },
  Targets: [{
    Arn: basicApiDestination.Arn,
    Id: "ApiDestinationTarget"
  }]
});
```

## Updating an Existing ApiDestination

Show how to update an existing ApiDestination to change its description and invocation endpoint.

```ts
const updatedApiDestination = await AWS.Events.ApiDestination("existingApiDestination", {
  ConnectionArn: "arn:aws:events:us-east-1:123456789012:connection/my-connection",
  InvocationEndpoint: "https://api.example.com/updated-data",
  HttpMethod: "POST",
  Description: "Updated ApiDestination description."
});
```
