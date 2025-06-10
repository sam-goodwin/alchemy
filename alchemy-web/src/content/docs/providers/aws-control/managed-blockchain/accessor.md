---
title: Accessor
description: Learn how to create, update, and manage AWS ManagedBlockchain Accessors using Alchemy Cloud Control.
---


The Accessor resource lets you manage AWS ManagedBlockchain Accessors, which are used to interact with blockchain networks. For more details, refer to the [AWS ManagedBlockchain Accessors](https://docs.aws.amazon.com/managedblockchain/latest/userguide/) documentation.

## Minimal Example

Create a basic Accessor with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicAccessor = await AWS.ManagedBlockchain.Accessor("basicAccessor", {
  AccessorType: "AMAZON_MANAGED",
  NetworkType: "HYPERLEDGER_FABRIC",
  Tags: [
    { Key: "Project", Value: "BlockchainDemo" }
  ]
});
```

## Advanced Configuration

Configure an Accessor with additional properties such as adopting existing resources:

```ts
const advancedAccessor = await AWS.ManagedBlockchain.Accessor("advancedAccessor", {
  AccessorType: "AMAZON_MANAGED",
  NetworkType: "ETHEREUM",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ],
  adopt: true
});
```

## Accessor with Custom Tags

Create an Accessor with multiple custom tags for better organization:

```ts
const taggedAccessor = await AWS.ManagedBlockchain.Accessor("taggedAccessor", {
  AccessorType: "CUSTOM",
  NetworkType: "HYPERLEDGER_FABRIC",
  Tags: [
    { Key: "Department", Value: "Finance" },
    { Key: "Owner", Value: "Alice" },
    { Key: "Status", Value: "Active" }
  ]
});
```

## Accessor for Multi-Environment Setup

Set up an Accessor for a multi-environment configuration with distinct properties:

```ts
const multiEnvAccessor = await AWS.ManagedBlockchain.Accessor("multiEnvAccessor", {
  AccessorType: "CUSTOM",
  NetworkType: "ETHEREUM",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Project", Value: "BlockchainExperiment" }
  ],
  adopt: false
});
```
