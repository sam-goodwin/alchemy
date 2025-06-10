---
title: DedicatedIpPool
description: Learn how to create, update, and manage AWS SES DedicatedIpPools using Alchemy Cloud Control.
---


The DedicatedIpPool resource allows you to manage dedicated IP pools for Amazon Simple Email Service (SES), enabling better deliverability and control over your sending reputation. For more information, see the [AWS SES DedicatedIpPools documentation](https://docs.aws.amazon.com/ses/latest/userguide/).

## Minimal Example

Create a basic dedicated IP pool with a specified name:

```ts
import AWS from "alchemy/aws/control";

const dedicatedIpPool = await AWS.SES.DedicatedIpPool("myIpPool", {
  PoolName: "MyDedicatedIpPool",
  ScalingMode: "MANAGED"
});
```

## Advanced Configuration

Configure a dedicated IP pool with additional options, including the ability to adopt an existing resource:

```ts
const advancedIpPool = await AWS.SES.DedicatedIpPool("advancedIpPool", {
  PoolName: "AdvancedDedicatedIpPool",
  ScalingMode: "MANAGED",
  adopt: true
});
```

## Adoption of Existing Pool

This example demonstrates how to adopt an existing dedicated IP pool without failing if it already exists:

```ts
const adoptExistingIpPool = await AWS.SES.DedicatedIpPool("existingIpPool", {
  PoolName: "ExistingDedicatedIpPool",
  adopt: true
});
```

## Status and Metadata Retrieval

After creating a dedicated IP pool, you can access its metadata, such as ARN and creation time:

```ts
const ipPoolMetadata = await AWS.SES.DedicatedIpPool("metadataIpPool", {
  PoolName: "MetadataDedicatedIpPool"
});

// Accessing metadata
console.log("Pool ARN:", ipPoolMetadata.Arn);
console.log("Creation Time:", ipPoolMetadata.CreationTime);
console.log("Last Updated:", ipPoolMetadata.LastUpdateTime);
```
