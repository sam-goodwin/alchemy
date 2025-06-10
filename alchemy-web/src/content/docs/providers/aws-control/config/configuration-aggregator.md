---
title: ConfigurationAggregator
description: Learn how to create, update, and manage AWS Config ConfigurationAggregators using Alchemy Cloud Control.
---


The ConfigurationAggregator resource allows you to manage [AWS Config ConfigurationAggregators](https://docs.aws.amazon.com/config/latest/userguide/) which aggregate configuration data across multiple accounts and regions.

## Minimal Example

Create a basic ConfigurationAggregator with a name and an organization aggregation source.

```ts
import AWS from "alchemy/aws/control";

const basicAggregator = await AWS.Config.ConfigurationAggregator("basicAggregator", {
  ConfigurationAggregatorName: "MyBasicAggregator",
  OrganizationAggregationSource: {
    RoleArn: "arn:aws:iam::123456789012:role/MyConfigRole",
    SourceRegions: ["us-east-1", "us-west-2"]
  }
});
```

## Advanced Configuration

Configure a ConfigurationAggregator with multiple account aggregation sources and tags.

```ts
const advancedAggregator = await AWS.Config.ConfigurationAggregator("advancedAggregator", {
  ConfigurationAggregatorName: "MyAdvancedAggregator",
  AccountAggregationSources: [
    {
      AccountIds: ["123456789012", "987654321098"],
      AllRegions: true
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "ConfigAggregator" }
  ]
});
```

## Using Multiple Sources

Create a ConfigurationAggregator that combines both organization and account aggregation sources.

```ts
const combinedAggregator = await AWS.Config.ConfigurationAggregator("combinedAggregator", {
  ConfigurationAggregatorName: "MyCombinedAggregator",
  AccountAggregationSources: [
    {
      AccountIds: ["123456789012"],
      AllRegions: true
    }
  ],
  OrganizationAggregationSource: {
    RoleArn: "arn:aws:iam::123456789012:role/MyConfigRole",
    SourceRegions: ["us-east-1"]
  }
});
```

## Adopting Existing Resource

If you want to adopt an existing ConfigurationAggregator without failure, use the `adopt` property.

```ts
const adoptAggregator = await AWS.Config.ConfigurationAggregator("adoptAggregator", {
  ConfigurationAggregatorName: "MyAdoptedAggregator",
  adopt: true
});
```
