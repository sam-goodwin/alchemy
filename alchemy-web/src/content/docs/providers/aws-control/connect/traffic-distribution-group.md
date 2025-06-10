---
title: TrafficDistributionGroup
description: Learn how to create, update, and manage AWS Connect TrafficDistributionGroups using Alchemy Cloud Control.
---


The TrafficDistributionGroup resource lets you manage [AWS Connect TrafficDistributionGroups](https://docs.aws.amazon.com/connect/latest/userguide/) for distributing traffic across multiple AWS Connect instances.

## Minimal Example

Create a basic TrafficDistributionGroup with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const trafficDistributionGroup = await AWS.Connect.TrafficDistributionGroup("myTrafficDistGroup", {
  instanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  name: "MyTrafficDistributionGroup",
  description: "A group to distribute traffic across instances"
});
```

## Advanced Configuration

Configure a TrafficDistributionGroup with tags for better resource management:

```ts
const taggedTrafficDistributionGroup = await AWS.Connect.TrafficDistributionGroup("taggedTrafficDistGroup", {
  instanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  name: "TaggedTrafficDistributionGroup",
  description: "A group with tags for resource management",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "Support" }
  ]
});
```

## Resource Adoption

Create a TrafficDistributionGroup that adopts an existing resource if it already exists:

```ts
const adoptedTrafficDistributionGroup = await AWS.Connect.TrafficDistributionGroup("adoptedTrafficDistGroup", {
  instanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  name: "AdoptedTrafficDistributionGroup",
  description: "A group that adopts existing resources",
  adopt: true
});
```
