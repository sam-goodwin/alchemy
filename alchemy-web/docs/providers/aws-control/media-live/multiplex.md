---
title: Managing AWS MediaLive Multiplexs with Alchemy
description: Learn how to create, update, and manage AWS MediaLive Multiplexs using Alchemy Cloud Control.
---

# Multiplex

The Multiplex resource lets you create and manage [AWS MediaLive Multiplexs](https://docs.aws.amazon.com/medialive/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-medialive-multiplex.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const multiplex = await AWS.MediaLive.Multiplex("multiplex-example", {
  MultiplexSettings: "example-multiplexsettings",
  AvailabilityZones: ["example-availabilityzones-1"],
  Name: "multiplex-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a multiplex with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedMultiplex = await AWS.MediaLive.Multiplex("advanced-multiplex", {
  MultiplexSettings: "example-multiplexsettings",
  AvailabilityZones: ["example-availabilityzones-1"],
  Name: "multiplex-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

