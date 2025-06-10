---
title: TrafficMirrorFilterRule
description: Learn how to create, update, and manage AWS EC2 TrafficMirrorFilterRules using Alchemy Cloud Control.
---


The TrafficMirrorFilterRule resource lets you manage [AWS EC2 Traffic Mirror Filter Rules](https://docs.aws.amazon.com/ec2/latest/userguide/), which define the rules for mirroring network traffic to specific targets based on source and destination criteria.

## Minimal Example

Create a basic TrafficMirrorFilterRule with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const trafficMirrorFilterRule = await AWS.EC2.TrafficMirrorFilterRule("basicTrafficMirrorRule", {
  TrafficMirrorFilterId: "tmf-abc12345",
  RuleNumber: 100,
  RuleAction: "accept",
  SourceCidrBlock: "10.0.0.0/16",
  DestinationCidrBlock: "10.0.1.0/24",
  TrafficDirection: "ingress",
  DestinationPortRange: { From: 80, To: 80 },
  SourcePortRange: { From: 1000, To: 2000 },
});
```

## Advanced Configuration

Configure a TrafficMirrorFilterRule with additional options including protocol and tags.

```ts
const advancedTrafficMirrorFilterRule = await AWS.EC2.TrafficMirrorFilterRule("advancedTrafficMirrorRule", {
  TrafficMirrorFilterId: "tmf-xyz98765",
  RuleNumber: 200,
  RuleAction: "reject",
  SourceCidrBlock: "192.168.1.0/24",
  DestinationCidrBlock: "192.168.2.0/24",
  TrafficDirection: "egress",
  Protocol: 6, // TCP
  DestinationPortRange: { From: 443, To: 443 },
  SourcePortRange: { From: 3000, To: 4000 },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Engineering" },
  ],
});
```

## Custom Rule for Specific Protocols

Create a TrafficMirrorFilterRule that targets a specific protocol (UDP) and custom port ranges.

```ts
const customProtocolTrafficMirrorFilterRule = await AWS.EC2.TrafficMirrorFilterRule("customProtocolTrafficMirrorRule", {
  TrafficMirrorFilterId: "tmf-uniqueid123",
  RuleNumber: 300,
  RuleAction: "accept",
  SourceCidrBlock: "172.16.0.0/12",
  DestinationCidrBlock: "172.16.1.0/24",
  TrafficDirection: "ingress",
  Protocol: 17, // UDP
  DestinationPortRange: { From: 53, To: 53 }, // DNS
  SourcePortRange: { From: 40000, To: 60000 },
});
```

## Rule with Multiple Tags

Define a TrafficMirrorFilterRule that includes multiple tags for better resource management.

```ts
const taggedTrafficMirrorFilterRule = await AWS.EC2.TrafficMirrorFilterRule("taggedTrafficMirrorFilterRule", {
  TrafficMirrorFilterId: "tmf-tagged12345",
  RuleNumber: 400,
  RuleAction: "accept",
  SourceCidrBlock: "10.1.0.0/16",
  DestinationCidrBlock: "10.1.2.0/24",
  TrafficDirection: "egress",
  Tags: [
    { Key: "Project", Value: "NetworkMonitoring" },
    { Key: "Owner", Value: "NetworkTeam" },
  ],
});
```
