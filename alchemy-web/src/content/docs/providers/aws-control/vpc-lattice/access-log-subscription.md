---
title: AccessLogSubscription
description: Learn how to create, update, and manage AWS VpcLattice AccessLogSubscriptions using Alchemy Cloud Control.
---


The AccessLogSubscription resource lets you manage [AWS VpcLattice AccessLogSubscriptions](https://docs.aws.amazon.com/vpclattice/latest/userguide/) for logging access to service network traffic in VPC Lattice.

## Minimal Example

Create a basic AccessLogSubscription with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const accessLogSubscription = await AWS.VpcLattice.AccessLogSubscription("myAccessLogSubscription", {
  DestinationArn: "arn:aws:s3:::my-log-bucket/access-logs/",
  ServiceNetworkLogType: "HTTP",
  ResourceIdentifier: "my-service-network"
});
```

## Advanced Configuration

Configure an AccessLogSubscription with tags for better resource management.

```ts
const taggedAccessLogSubscription = await AWS.VpcLattice.AccessLogSubscription("taggedAccessLogSubscription", {
  DestinationArn: "arn:aws:s3:::my-log-bucket/access-logs/",
  ServiceNetworkLogType: "HTTP",
  ResourceIdentifier: "my-service-network",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "VpcLatticeDemo" }
  ]
});
```

## Adopting an Existing Resource

Adopt an existing AccessLogSubscription instead of failing if it already exists.

```ts
const existingAccessLogSubscription = await AWS.VpcLattice.AccessLogSubscription("existingAccessLogSubscription", {
  DestinationArn: "arn:aws:s3:::my-log-bucket/access-logs/",
  ServiceNetworkLogType: "HTTP",
  ResourceIdentifier: "my-service-network",
  adopt: true
});
```

## Logging to CloudWatch

Set up an AccessLogSubscription that logs to a CloudWatch destination.

```ts
const cloudWatchLogSubscription = await AWS.VpcLattice.AccessLogSubscription("cloudWatchLogSubscription", {
  DestinationArn: "arn:aws:logs:us-west-2:123456789012:log-group:my-log-group",
  ServiceNetworkLogType: "HTTP",
  ResourceIdentifier: "my-service-network"
});
```
