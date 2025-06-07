---
title: Managing AWS Synthetics Groups with Alchemy
description: Learn how to create, update, and manage AWS Synthetics Groups using Alchemy Cloud Control.
---

# Group

The Group resource allows you to manage [AWS Synthetics Groups](https://docs.aws.amazon.com/synthetics/latest/userguide/) that aggregates multiple canaries for better organization and management.

## Minimal Example

Create a basic Synthetics Group with a name and a tag:

```ts
import AWS from "alchemy/aws/control";

const SyntheticsGroup = await AWS.Synthetics.Group("MySyntheticsGroup", {
  Name: "MySyntheticsGroup",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a Synthetics Group with resource ARNs and multiple tags:

```ts
const AdvancedSyntheticsGroup = await AWS.Synthetics.Group("AdvancedSyntheticsGroup", {
  Name: "AdvancedSyntheticsGroup",
  ResourceArns: ["arn:aws:synthetics:us-east-1:123456789012:canary:MyCanary"],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "QA" }
  ],
  adopt: true // Set to true to adopt existing resources if they already exist
});
```

## Using Resource ARNs

Demonstrate how to create a Synthetics Group by specifying multiple resource ARNs:

```ts
const ResourceArnsGroup = await AWS.Synthetics.Group("ResourceArnsGroup", {
  Name: "ResourceArnsGroup",
  ResourceArns: [
    "arn:aws:synthetics:us-east-1:123456789012:canary:CanaryA",
    "arn:aws:synthetics:us-east-1:123456789012:canary:CanaryB"
  ]
});
```

## Tagging for Organization

Create a Synthetics Group with multiple tags for better organization:

```ts
const TaggedSyntheticsGroup = await AWS.Synthetics.Group("TaggedSyntheticsGroup", {
  Name: "TaggedSyntheticsGroup",
  Tags: [
    { Key: "Project", Value: "WebsiteMonitoring" },
    { Key: "Owner", Value: "DevOpsTeam" },
    { Key: "CostCenter", Value: "IT" }
  ]
});
```