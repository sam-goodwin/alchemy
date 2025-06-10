---
title: DedicatedIpPool
description: Learn how to create, update, and manage AWS PinpointEmail DedicatedIpPools using Alchemy Cloud Control.
---


The DedicatedIpPool resource lets you manage [AWS PinpointEmail Dedicated IP Pools](https://docs.aws.amazon.com/pinpointemail/latest/userguide/) which are used to send email using dedicated IP addresses. This can enhance your email deliverability and reputation.

## Minimal Example

Create a basic dedicated IP pool with a specified name.

```ts
import AWS from "alchemy/aws/control";

const dedicatedIpPool = await AWS.PinpointEmail.DedicatedIpPool("myDedicatedIpPool", {
  PoolName: "MyDedicatedIpPool",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a dedicated IP pool with additional tags for better resource management.

```ts
const advancedIpPool = await AWS.PinpointEmail.DedicatedIpPool("advancedDedicatedIpPool", {
  PoolName: "AdvancedDedicatedIpPool",
  Tags: [
    { Key: "Project", Value: "EmailCampaign" },
    { Key: "Owner", Value: "MarketingTeam" }
  ],
  adopt: true // This allows adopting an existing resource if it already exists
});
```

## Example with Resource Adoption

Create a dedicated IP pool while allowing adoption of an existing resource.

```ts
const adoptiveIpPool = await AWS.PinpointEmail.DedicatedIpPool("adoptiveDedicatedIpPool", {
  PoolName: "AdoptiveDedicatedIpPool",
  Tags: [
    { Key: "Status", Value: "Active" }
  ],
  adopt: true // If the resource already exists, it will be adopted instead of failing
});
```

## Example with Additional Properties

Create a dedicated IP pool and log its ARN and creation time after creation.

```ts
const detailedIpPool = await AWS.PinpointEmail.DedicatedIpPool("detailedDedicatedIpPool", {
  PoolName: "DetailedDedicatedIpPool",
  Tags: [
    { Key: "UseCase", Value: "TransactionalEmails" }
  ]
});

// Log the ARN and creation time
console.log(`ARN: ${detailedIpPool.Arn}`);
console.log(`Created At: ${detailedIpPool.CreationTime}`);
```
