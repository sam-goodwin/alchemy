---
title: Managing AWS Config ConfigurationAggregators with Alchemy
description: Learn how to create, update, and manage AWS Config ConfigurationAggregators using Alchemy Cloud Control.
---

# ConfigurationAggregator

The ConfigurationAggregator resource lets you manage [AWS Config ConfigurationAggregators](https://docs.aws.amazon.com/config/latest/userguide/) which aggregate configuration data across multiple accounts and regions.

## Minimal Example

Create a basic ConfigurationAggregator with an account aggregation source:

```ts
import AWS from "alchemy/aws/control";

const BasicAggregator = await AWS.Config.ConfigurationAggregator("BasicAggregator", {
  ConfigurationAggregatorName: "MyAggregator",
  AccountAggregationSources: [
    {
      AccountIds: ["123456789012"],
      AllAwsRegions: true
    }
  ],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Config" }
  ]
});
```

## Advanced Configuration

Configure a ConfigurationAggregator with both account and organization aggregation sources for a comprehensive view:

```ts
const AdvancedAggregator = await AWS.Config.ConfigurationAggregator("AdvancedAggregator", {
  ConfigurationAggregatorName: "ComprehensiveAggregator",
  AccountAggregationSources: [
    {
      AccountIds: ["123456789012", "210987654321"],
      AllAwsRegions: false,
      AwsRegions: ["us-west-2", "us-east-1"]
    }
  ],
  OrganizationAggregationSource: {
    RoleArn: "arn:aws:iam::123456789012:role/ConfigAggregatorRole",
    AllAwsRegions: true
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Config" }
  ]
});
```

## Organization Aggregation Example

This example demonstrates how to create a ConfigurationAggregator that aggregates configurations from all accounts in your AWS Organization:

```ts
const OrgAggregator = await AWS.Config.ConfigurationAggregator("OrgAggregator", {
  ConfigurationAggregatorName: "OrgWideAggregator",
  OrganizationAggregationSource: {
    RoleArn: "arn:aws:iam::123456789012:role/OrgConfigAggregatorRole",
    AllAwsRegions: true
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Compliance" }
  ]
});
```