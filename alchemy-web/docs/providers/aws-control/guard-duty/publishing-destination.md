---
title: Managing AWS GuardDuty PublishingDestinations with Alchemy
description: Learn how to create, update, and manage AWS GuardDuty PublishingDestinations using Alchemy Cloud Control.
---

# PublishingDestination

The PublishingDestination resource lets you create and manage [AWS GuardDuty PublishingDestinations](https://docs.aws.amazon.com/guardduty/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-guardduty-publishingdestination.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const publishingdestination = await AWS.GuardDuty.PublishingDestination(
  "publishingdestination-example",
  {
    DestinationProperties: "example-destinationproperties",
    DetectorId: "example-detectorid",
    DestinationType: "example-destinationtype",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a publishingdestination with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPublishingDestination = await AWS.GuardDuty.PublishingDestination(
  "advanced-publishingdestination",
  {
    DestinationProperties: "example-destinationproperties",
    DetectorId: "example-detectorid",
    DestinationType: "example-destinationtype",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

