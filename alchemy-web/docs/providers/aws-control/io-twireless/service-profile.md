---
title: Managing AWS IoTWireless ServiceProfiles with Alchemy
description: Learn how to create, update, and manage AWS IoTWireless ServiceProfiles using Alchemy Cloud Control.
---

# ServiceProfile

The ServiceProfile resource lets you create and manage [AWS IoTWireless ServiceProfiles](https://docs.aws.amazon.com/iotwireless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotwireless-serviceprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const serviceprofile = await AWS.IoTWireless.ServiceProfile("serviceprofile-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a serviceprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedServiceProfile = await AWS.IoTWireless.ServiceProfile("advanced-serviceprofile", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

