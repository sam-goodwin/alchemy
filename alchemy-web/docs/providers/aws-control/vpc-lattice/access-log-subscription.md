---
title: Managing AWS VpcLattice AccessLogSubscriptions with Alchemy
description: Learn how to create, update, and manage AWS VpcLattice AccessLogSubscriptions using Alchemy Cloud Control.
---

# AccessLogSubscription

The AccessLogSubscription resource allows you to manage [AWS VpcLattice AccessLogSubscriptions](https://docs.aws.amazon.com/vpclattice/latest/userguide/) for logging traffic data from your service network.

## Minimal Example

This example demonstrates how to create a basic access log subscription with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicLogSubscription = await AWS.VpcLattice.AccessLogSubscription("BasicLogSubscription", {
  DestinationArn: "arn:aws:s3:::my-access-logs-bucket",
  ResourceIdentifier: "my-service-network-id",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

In this example, we configure an access log subscription with enhanced logging features by specifying the ServiceNetworkLogType.

```ts
const AdvancedLogSubscription = await AWS.VpcLattice.AccessLogSubscription("AdvancedLogSubscription", {
  DestinationArn: "arn:aws:s3:::my-advanced-logs-bucket",
  ResourceIdentifier: "my-service-network-id",
  ServiceNetworkLogType: "AllTraffic",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Adopting an Existing Resource

This example shows how to adopt an existing access log subscription instead of failing when a resource already exists.

```ts
const AdoptedLogSubscription = await AWS.VpcLattice.AccessLogSubscription("AdoptedLogSubscription", {
  DestinationArn: "arn:aws:s3:::my-existing-access-logs-bucket",
  ResourceIdentifier: "my-existing-network-id",
  adopt: true
});
```