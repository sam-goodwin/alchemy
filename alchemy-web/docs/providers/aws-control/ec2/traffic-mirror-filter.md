---
title: Managing AWS EC2 TrafficMirrorFilters with Alchemy
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorFilters using Alchemy Cloud Control.
---

# TrafficMirrorFilter

The TrafficMirrorFilter resource allows you to manage [AWS EC2 TrafficMirrorFilters](https://docs.aws.amazon.com/ec2/latest/userguide/), which are used to define rules for traffic mirroring in your Virtual Private Cloud (VPC). This enables you to monitor and analyze network traffic.

## Minimal Example

Create a basic TrafficMirrorFilter with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const BasicTrafficMirrorFilter = await AWS.EC2.TrafficMirrorFilter("BasicTrafficMirrorFilter", {
  Description: "Basic filter for traffic mirroring",
  Tags: [
    { Key: "Project", Value: "NetworkMonitoring" },
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a TrafficMirrorFilter with network services to capture specific types of traffic.

```ts
const AdvancedTrafficMirrorFilter = await AWS.EC2.TrafficMirrorFilter("AdvancedTrafficMirrorFilter", {
  Description: "Advanced filter for capturing specific network services",
  NetworkServices: ["AWS:EC2"],
  Tags: [
    { Key: "Project", Value: "DataAnalysis" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Traffic Mirror Filter with Existing Resource Adoption

Create a TrafficMirrorFilter that adopts an existing resource instead of failing.

```ts
const AdoptedTrafficMirrorFilter = await AWS.EC2.TrafficMirrorFilter("AdoptedTrafficMirrorFilter", {
  Description: "Adopting an existing TrafficMirrorFilter",
  adopt: true,
  Tags: [
    { Key: "Project", Value: "TrafficMonitoring" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```