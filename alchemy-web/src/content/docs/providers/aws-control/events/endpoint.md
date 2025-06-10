---
title: Endpoint
description: Learn how to create, update, and manage AWS Events Endpoints using Alchemy Cloud Control.
---


The Endpoint resource lets you manage [AWS Events Endpoints](https://docs.aws.amazon.com/events/latest/userguide/) for routing events to a target service. This resource enables you to define event buses, configurations, and permissions to facilitate seamless event-driven architectures.

## Minimal Example

Create a basic event endpoint with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const eventEndpoint = await AWS.Events.Endpoint("basicEventEndpoint", {
  EventBuses: [{ Name: "default" }],
  Description: "A basic event endpoint for routing events."
});
```

## Advanced Configuration

Configure an endpoint with routing settings and replication configuration.

```ts
const advancedEventEndpoint = await AWS.Events.Endpoint("advancedEventEndpoint", {
  EventBuses: [{ Name: "default" }],
  Description: "An advanced event endpoint with specific routing and replication settings.",
  RoutingConfig: {
    FailoverConfig: {
      Primary: {
        Target: {
          Type: "lambda",
          Arn: "arn:aws:lambda:us-east-1:123456789012:function:MyFunction"
        },
        Type: "primary"
      },
      Secondary: {
        Target: {
          Type: "sqs",
          Arn: "arn:aws:sqs:us-east-1:123456789012:MyQueue"
        },
        Type: "secondary"
      }
    }
  },
  ReplicationConfig: {
    RoleArn: "arn:aws:iam::123456789012:role/MyReplicationRole"
  }
});
```

## Custom Role Assignment

Assign a specific IAM role to the endpoint for permissions.

```ts
const roleAssignedEndpoint = await AWS.Events.Endpoint("roleAssignedEndpoint", {
  EventBuses: [{ Name: "default" }],
  Description: "An endpoint with a custom IAM role for execution.",
  RoleArn: "arn:aws:iam::123456789012:role/MyCustomRole"
});
```

## Adoption of Existing Resource

Adopt an existing event endpoint instead of failing if it already exists.

```ts
const adoptedEndpoint = await AWS.Events.Endpoint("adoptExistingEndpoint", {
  EventBuses: [{ Name: "default" }],
  Description: "Adopting an existing endpoint if it already exists.",
  adopt: true
});
```
