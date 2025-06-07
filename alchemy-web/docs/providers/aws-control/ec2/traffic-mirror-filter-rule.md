---
title: Managing AWS EC2 TrafficMirrorFilterRules with Alchemy
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorFilterRules using Alchemy Cloud Control.
---

# TrafficMirrorFilterRule

The TrafficMirrorFilterRule resource lets you create and manage [AWS EC2 TrafficMirrorFilterRules](https://docs.aws.amazon.com/ec2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-trafficmirrorfilterrule.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const trafficmirrorfilterrule = await AWS.EC2.TrafficMirrorFilterRule(
  "trafficmirrorfilterrule-example",
  {
    RuleAction: "example-ruleaction",
    SourceCidrBlock: "example-sourcecidrblock",
    RuleNumber: 1,
    DestinationCidrBlock: "example-destinationcidrblock",
    TrafficMirrorFilterId: "example-trafficmirrorfilterid",
    TrafficDirection: "example-trafficdirection",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A trafficmirrorfilterrule resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a trafficmirrorfilterrule with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTrafficMirrorFilterRule = await AWS.EC2.TrafficMirrorFilterRule(
  "advanced-trafficmirrorfilterrule",
  {
    RuleAction: "example-ruleaction",
    SourceCidrBlock: "example-sourcecidrblock",
    RuleNumber: 1,
    DestinationCidrBlock: "example-destinationcidrblock",
    TrafficMirrorFilterId: "example-trafficmirrorfilterid",
    TrafficDirection: "example-trafficdirection",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A trafficmirrorfilterrule resource managed by Alchemy",
  }
);
```

