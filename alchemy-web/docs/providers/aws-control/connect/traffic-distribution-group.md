---
title: Managing AWS Connect TrafficDistributionGroups with Alchemy
description: Learn how to create, update, and manage AWS Connect TrafficDistributionGroups using Alchemy Cloud Control.
---

# TrafficDistributionGroup

The TrafficDistributionGroup resource allows you to manage [AWS Connect TrafficDistributionGroups](https://docs.aws.amazon.com/connect/latest/userguide/) which are essential for distributing traffic across multiple Amazon Connect instances.

## Minimal Example

Create a basic TrafficDistributionGroup with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicTrafficDistributionGroup = await AWS.Connect.TrafficDistributionGroup("BasicTrafficDistributionGroup", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdef12-3456-7890-abcd-ef1234567890",
  Name: "BasicGroup",
  Description: "This is a basic traffic distribution group"
});
```

## Advanced Configuration

Configure a TrafficDistributionGroup with tags for environmental management.

```ts
const AdvancedTrafficDistributionGroup = await AWS.Connect.TrafficDistributionGroup("AdvancedTrafficDistributionGroup", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdef12-3456-7890-abcd-ef1234567890",
  Name: "AdvancedGroup",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "CustomerSupport" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing TrafficDistributionGroup instead of failing if it already exists.

```ts
const AdoptExistingTrafficDistributionGroup = await AWS.Connect.TrafficDistributionGroup("AdoptExistingTrafficDistributionGroup", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdef12-3456-7890-abcd-ef1234567890",
  Name: "AdoptedGroup",
  adopt: true
});
```

## Usage with Tags

Create a TrafficDistributionGroup with multiple tags for better resource management.

```ts
const TaggedTrafficDistributionGroup = await AWS.Connect.TrafficDistributionGroup("TaggedTrafficDistributionGroup", {
  InstanceArn: "arn:aws:connect:us-west-2:123456789012:instance/abcdef12-3456-7890-abcd-ef1234567890",
  Name: "TaggedGroup",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "Migration" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```