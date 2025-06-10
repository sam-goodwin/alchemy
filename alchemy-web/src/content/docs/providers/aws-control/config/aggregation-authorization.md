---
title: AggregationAuthorization
description: Learn how to create, update, and manage AWS Config AggregationAuthorizations using Alchemy Cloud Control.
---


The AggregationAuthorization resource allows you to manage [AWS Config AggregationAuthorizations](https://docs.aws.amazon.com/config/latest/userguide/) that enable the aggregation of AWS Config data across multiple accounts and regions.

## Minimal Example

Create a basic AggregationAuthorization with required properties.

```ts
import AWS from "alchemy/aws/control";

const aggregationAuthorization = await AWS.Config.AggregationAuthorization("myAggregationAuthorization", {
  AuthorizedAccountId: "123456789012",
  AuthorizedAwsRegion: "us-west-2",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Advanced Configuration

This example demonstrates how to create an AggregationAuthorization with the adoption flag set to true, indicating that you want to adopt an existing resource if it already exists.

```ts
const advancedAggregationAuthorization = await AWS.Config.AggregationAuthorization("advancedAggregationAuthorization", {
  AuthorizedAccountId: "987654321098",
  AuthorizedAwsRegion: "us-east-1",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "MyProject" }
  ],
  adopt: true // Adopt existing resource if it exists
});
```

## Example with Minimal Tags

In this example, we create an AggregationAuthorization with only the required properties, demonstrating a minimal setup without any additional tags.

```ts
const minimalAggregationAuthorization = await AWS.Config.AggregationAuthorization("minimalAggregationAuthorization", {
  AuthorizedAccountId: "112233445566",
  AuthorizedAwsRegion: "eu-central-1"
});
```
