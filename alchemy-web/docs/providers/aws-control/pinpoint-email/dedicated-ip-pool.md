---
title: Managing AWS PinpointEmail DedicatedIpPools with Alchemy
description: Learn how to create, update, and manage AWS PinpointEmail DedicatedIpPools using Alchemy Cloud Control.
---

# DedicatedIpPool

The DedicatedIpPool resource allows you to manage dedicated IP pools in AWS Pinpoint Email, which can help improve email deliverability by managing your sending IPs. For more information, visit the [AWS PinpointEmail DedicatedIpPools](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) documentation.

## Minimal Example

Create a basic dedicated IP pool with a specified name.

```ts
import AWS from "alchemy/aws/control";

const MyDedicatedIpPool = await AWS.PinpointEmail.DedicatedIpPool("MyDedicatedIpPool", {
  PoolName: "MyDedicatedPool",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "EmailMarketing" }
  ]
});
```

## Advanced Configuration

This example shows how to create a dedicated IP pool with additional properties, including tags.

```ts
const AdvancedDedicatedIpPool = await AWS.PinpointEmail.DedicatedIpPool("AdvancedDedicatedIpPool", {
  PoolName: "AdvancedDedicatedPool",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "EmailOperations" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using Tags for Resource Management

Here’s how to create a dedicated IP pool with multiple tags for better resource management.

```ts
const TaggedDedicatedIpPool = await AWS.PinpointEmail.DedicatedIpPool("TaggedDedicatedIpPool", {
  PoolName: "TaggedPool",
  Tags: [
    { Key: "Project", Value: "QuarterlyCampaign" },
    { Key: "Owner", Value: "JohnDoe" },
    { Key: "Region", Value: "us-west-2" }
  ]
});
```