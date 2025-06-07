---
title: Managing AWS SecurityHub FindingAggregators with Alchemy
description: Learn how to create, update, and manage AWS SecurityHub FindingAggregators using Alchemy Cloud Control.
---

# FindingAggregator

The FindingAggregator resource allows you to manage the aggregation of findings across multiple AWS accounts and regions in AWS Security Hub. You can find more information in the [AWS SecurityHub FindingAggregators](https://docs.aws.amazon.com/securityhub/latest/userguide/) documentation.

## Minimal Example

Create a basic FindingAggregator with required properties and one optional property for regions.

```ts
import AWS from "alchemy/aws/control";

const BasicFindingAggregator = await AWS.SecurityHub.FindingAggregator("BasicAggregator", {
  RegionLinkingMode: "ALL",
  Regions: ["us-east-1", "us-west-2"]
});
```

## Advanced Configuration

Configure a FindingAggregator with the option to adopt an existing resource if it already exists.

```ts
const AdvancedFindingAggregator = await AWS.SecurityHub.FindingAggregator("AdvancedAggregator", {
  RegionLinkingMode: "LINKED",
  Regions: ["us-east-1", "eu-west-1"],
  adopt: true
});
```

## Specific Use Case: Multi-Region Setup

Set up a FindingAggregator that links multiple regions for a comprehensive security overview.

```ts
const MultiRegionFindingAggregator = await AWS.SecurityHub.FindingAggregator("MultiRegionAggregator", {
  RegionLinkingMode: "ALL",
  Regions: ["us-east-1", "us-west-1", "eu-central-1"]
});
```