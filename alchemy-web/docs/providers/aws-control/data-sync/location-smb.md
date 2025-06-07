---
title: Managing AWS DataSync LocationSMBs with Alchemy
description: Learn how to create, update, and manage AWS DataSync LocationSMBs using Alchemy Cloud Control.
---

# LocationSMB

The LocationSMB resource lets you create and manage [AWS DataSync LocationSMBs](https://docs.aws.amazon.com/datasync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datasync-locationsmb.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const locationsmb = await AWS.DataSync.LocationSMB("locationsmb-example", {
  AgentArns: ["example-agentarns-1"],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a locationsmb with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedLocationSMB = await AWS.DataSync.LocationSMB("advanced-locationsmb", {
  AgentArns: ["example-agentarns-1"],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

