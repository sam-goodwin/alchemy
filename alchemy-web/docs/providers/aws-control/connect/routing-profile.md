---
title: Managing AWS Connect RoutingProfiles with Alchemy
description: Learn how to create, update, and manage AWS Connect RoutingProfiles using Alchemy Cloud Control.
---

# RoutingProfile

The RoutingProfile resource lets you create and manage [AWS Connect RoutingProfiles](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-routingprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const routingprofile = await AWS.Connect.RoutingProfile("routingprofile-example", {
  Description: "A routingprofile resource managed by Alchemy",
  MediaConcurrencies: [],
  InstanceArn: "example-instancearn",
  DefaultOutboundQueueArn: "example-defaultoutboundqueuearn",
  Name: "routingprofile-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a routingprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRoutingProfile = await AWS.Connect.RoutingProfile("advanced-routingprofile", {
  Description: "A routingprofile resource managed by Alchemy",
  MediaConcurrencies: [],
  InstanceArn: "example-instancearn",
  DefaultOutboundQueueArn: "example-defaultoutboundqueuearn",
  Name: "routingprofile-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

