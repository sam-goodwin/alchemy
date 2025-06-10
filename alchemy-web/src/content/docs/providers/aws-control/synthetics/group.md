---
title: Group
description: Learn how to create, update, and manage AWS Synthetics Groups using Alchemy Cloud Control.
---


The Group resource lets you manage [AWS Synthetics Groups](https://docs.aws.amazon.com/synthetics/latest/userguide/) for organizing and monitoring your canaries effectively.

## Minimal Example

This example demonstrates how to create a basic Synthetics Group with essential properties.

```ts
import AWS from "alchemy/aws/control";

const syntheticsGroup = await AWS.Synthetics.Group("basicSyntheticsGroup", {
  name: "MySyntheticsGroup",
  resourceArns: [
    "arn:aws:synthetics:us-east-1:123456789012:canary:MyCanary"
  ],
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "WebsiteMonitoring" }
  ]
});
```

## Advanced Configuration

In this example, we add more advanced configurations, such as adopting an existing resource if it already exists.

```ts
const advancedSyntheticsGroup = await AWS.Synthetics.Group("advancedSyntheticsGroup", {
  name: "AdvancedSyntheticsGroup",
  resourceArns: [
    "arn:aws:synthetics:us-west-2:123456789012:canary:AnotherCanary"
  ],
  adopt: true,
  tags: [
    { key: "Environment", value: "Staging" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Adding More Resources

This example illustrates how to manage multiple canaries under a single Synthetics Group.

```ts
const multiResourceGroup = await AWS.Synthetics.Group("multiResourceSyntheticsGroup", {
  name: "MultiResourceGroup",
  resourceArns: [
    "arn:aws:synthetics:us-east-1:123456789012:canary:CanaryOne",
    "arn:aws:synthetics:us-east-1:123456789012:canary:CanaryTwo"
  ],
  tags: [
    { key: "Environment", value: "Testing" },
    { key: "Owner", value: "QA" }
  ]
});
```

## Using Tags for Organization

This example shows how to use tags effectively to organize resources within the Synthetics Group.

```ts
const taggedSyntheticsGroup = await AWS.Synthetics.Group("taggedSyntheticsGroup", {
  name: "TaggedSyntheticsGroup",
  resourceArns: [
    "arn:aws:synthetics:us-east-1:123456789012:canary:CanaryWithTags"
  ],
  tags: [
    { key: "Department", value: "Monitoring" },
    { key: "Project", value: "CriticalApp" },
    { key: "Owner", value: "SRE" }
  ]
});
```
