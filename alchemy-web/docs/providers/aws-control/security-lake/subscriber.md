---
title: Managing AWS SecurityLake Subscribers with Alchemy
description: Learn how to create, update, and manage AWS SecurityLake Subscribers using Alchemy Cloud Control.
---

# Subscriber

The Subscriber resource lets you create and manage [AWS SecurityLake Subscribers](https://docs.aws.amazon.com/securitylake/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-securitylake-subscriber.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const subscriber = await AWS.SecurityLake.Subscriber("subscriber-example", {
  SubscriberIdentity: "example-subscriberidentity",
  SubscriberName: "subscriber-subscriber",
  AccessTypes: ["example-accesstypes-1"],
  Sources: [],
  DataLakeArn: "example-datalakearn",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a subscriber with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSubscriber = await AWS.SecurityLake.Subscriber("advanced-subscriber", {
  SubscriberIdentity: "example-subscriberidentity",
  SubscriberName: "subscriber-subscriber",
  AccessTypes: ["example-accesstypes-1"],
  Sources: [],
  DataLakeArn: "example-datalakearn",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

