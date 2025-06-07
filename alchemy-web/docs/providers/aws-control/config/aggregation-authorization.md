---
title: Managing AWS Config AggregationAuthorizations with Alchemy
description: Learn how to create, update, and manage AWS Config AggregationAuthorizations using Alchemy Cloud Control.
---

# AggregationAuthorization

The AggregationAuthorization resource allows you to give permissions to an AWS account to aggregate AWS Config data from multiple accounts and regions. For more information, refer to the [AWS Config AggregationAuthorizations documentation](https://docs.aws.amazon.com/config/latest/userguide/).

## Minimal Example

Create a basic AggregationAuthorization with the required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicAggregationAuthorization = await AWS.Config.AggregationAuthorization("BasicAggregationAuthorization", {
  AuthorizedAccountId: "123456789012",
  AuthorizedAwsRegion: "us-west-2",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Compliance" }
  ]
});
```

## Advanced Configuration

Configure an AggregationAuthorization with additional options such as adopting existing resources.

```ts
const AdvancedAggregationAuthorization = await AWS.Config.AggregationAuthorization("AdvancedAggregationAuthorization", {
  AuthorizedAccountId: "987654321098",
  AuthorizedAwsRegion: "us-east-1",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true // Adopts the existing resource if it already exists
});
```

## Handling Multiple Regions

Demonstrate how to authorize an account across multiple AWS regions.

```ts
const MultiRegionAggregationAuthorization = await AWS.Config.AggregationAuthorization("MultiRegionAggregationAuthorization", {
  AuthorizedAccountId: "555555555555",
  AuthorizedAwsRegion: "eu-central-1", // Authorizing for Europe (Frankfurt)
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Data Engineering" }
  ]
});

const AdditionalRegionAuthorization = await AWS.Config.AggregationAuthorization("AdditionalRegionAuthorization", {
  AuthorizedAccountId: "555555555555",
  AuthorizedAwsRegion: "ap-south-1", // Authorizing for Asia (Mumbai)
});
```