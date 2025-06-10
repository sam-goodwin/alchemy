---
title: FindingAggregator
description: Learn how to create, update, and manage AWS SecurityHub FindingAggregators using Alchemy Cloud Control.
---


The FindingAggregator resource allows you to manage AWS SecurityHub FindingAggregators, which helps in aggregating and consolidating findings across multiple AWS accounts and regions. For more detailed information, refer to the [AWS SecurityHub FindingAggregators documentation](https://docs.aws.amazon.com/securityhub/latest/userguide/).

## Minimal Example

Create a basic FindingAggregator with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const findingAggregator = await AWS.SecurityHub.FindingAggregator("myFindingAggregator", {
  RegionLinkingMode: "ALL",
  Regions: ["us-east-1", "us-west-2"],
  adopt: true // Allow adopting existing resources
});
```

## Advanced Configuration

Configure a FindingAggregator with specific region linking modes and multiple regions.

```ts
const advancedAggregator = await AWS.SecurityHub.FindingAggregator("advancedAggregator", {
  RegionLinkingMode: "LINK_ACCOUNTS", // Aggregate findings from linked accounts
  Regions: ["eu-central-1", "ap-south-1"],
  adopt: true // Adopt existing resources if they are already present
});
```

## Use Case: Centralized Security Management

Set up a FindingAggregator to centralize security findings across different regions for a comprehensive security overview.

```ts
const centralizedAggregator = await AWS.SecurityHub.FindingAggregator("centralizedAggregator", {
  RegionLinkingMode: "ALL", // Link all regions for comprehensive aggregation
  Regions: ["us-east-1", "us-west-1", "ap-northeast-1"],
  adopt: false // Fail if the resource already exists
});
```

## Use Case: Multi-Account Security Insights

Create a FindingAggregator that supports multi-account security insights by linking specified regions.

```ts
const multiAccountAggregator = await AWS.SecurityHub.FindingAggregator("multiAccountAggregator", {
  RegionLinkingMode: "LINK_ACCOUNTS", // Link accounts for aggregated findings
  Regions: ["us-east-1", "us-west-2", "ca-central-1"],
  adopt: true // Adopt if the resource already exists
});
```
