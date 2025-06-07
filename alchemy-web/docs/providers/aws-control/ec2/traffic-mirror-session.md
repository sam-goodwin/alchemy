---
title: Managing AWS EC2 TrafficMirrorSessions with Alchemy
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorSessions using Alchemy Cloud Control.
---

# TrafficMirrorSession

The TrafficMirrorSession resource lets you create and manage [AWS EC2 TrafficMirrorSessions](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-trafficmirrorsession.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const trafficmirrorsession = await AWS.EC2.TrafficMirrorSession("trafficmirrorsession-example", {
  TrafficMirrorTargetId: "example-trafficmirrortargetid",
  SessionNumber: 1,
  NetworkInterfaceId: "example-networkinterfaceid",
  TrafficMirrorFilterId: "example-trafficmirrorfilterid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A trafficmirrorsession resource managed by Alchemy",
});
```

## Advanced Configuration

Create a trafficmirrorsession with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTrafficMirrorSession = await AWS.EC2.TrafficMirrorSession(
  "advanced-trafficmirrorsession",
  {
    TrafficMirrorTargetId: "example-trafficmirrortargetid",
    SessionNumber: 1,
    NetworkInterfaceId: "example-networkinterfaceid",
    TrafficMirrorFilterId: "example-trafficmirrorfilterid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A trafficmirrorsession resource managed by Alchemy",
  }
);
```

