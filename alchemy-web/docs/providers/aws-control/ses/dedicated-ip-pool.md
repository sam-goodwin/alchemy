---
title: Managing AWS SES DedicatedIpPools with Alchemy
description: Learn how to create, update, and manage AWS SES DedicatedIpPools using Alchemy Cloud Control.
---

# DedicatedIpPool

The DedicatedIpPool resource lets you manage [AWS SES Dedicated IP Pools](https://docs.aws.amazon.com/ses/latest/userguide/) for sending emails with dedicated IP addresses, providing better control over your email sending reputation.

## Minimal Example

Create a basic dedicated IP pool with a specified name.

```ts
import AWS from "alchemy/aws/control";

const BasicDedicatedIpPool = await AWS.SES.DedicatedIpPool("BasicDedicatedIpPool", {
  PoolName: "MyDedicatedIpPool",
  ScalingMode: "MANAGED"
});
```

## Advanced Configuration

Configure a dedicated IP pool with additional settings, including adopting an existing resource.

```ts
import AWS from "alchemy/aws/control";

const AdvancedDedicatedIpPool = await AWS.SES.DedicatedIpPool("AdvancedDedicatedIpPool", {
  PoolName: "MyAdvancedDedicatedIpPool",
  ScalingMode: "MANAGED",
  adopt: true
});
```

## Resource Management

Manage an existing dedicated IP pool by specifying the pool name and adopting its configuration.

```ts
import AWS from "alchemy/aws/control";

const ManageExistingDedicatedIpPool = await AWS.SES.DedicatedIpPool("ManageExistingDedicatedIpPool", {
  PoolName: "ExistingPool",
  ScalingMode: "MANAGED",
  adopt: true
});
```

This example demonstrates the management of a dedicated IP pool that may already exist, allowing you to incorporate it into your infrastructure seamlessly.