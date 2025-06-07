---
title: Managing AWS ManagedBlockchain Accessors with Alchemy
description: Learn how to create, update, and manage AWS ManagedBlockchain Accessors using Alchemy Cloud Control.
---

# Accessor

The Accessor resource allows you to manage [AWS ManagedBlockchain Accessors](https://docs.aws.amazon.com/managedblockchain/latest/userguide/) which are used to interact with your Managed Blockchain networks.

## Minimal Example

Create a basic Accessor with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicAccessor = await AWS.ManagedBlockchain.Accessor("BasicAccessor", {
  AccessorType: "NODE",
  NetworkType: "HYPERLEDGER_FABRIC",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Blockchain" }
  ]
});
```

## Advanced Configuration

Configure an Accessor with additional properties to suit your needs.

```ts
const advancedAccessor = await AWS.ManagedBlockchain.Accessor("AdvancedAccessor", {
  AccessorType: "MEMBER",
  NetworkType: "ETHEREUM",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "DAppDevelopment" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using Accessor to Manage Multiple Networks

Create multiple Accessors for different types of Managed Blockchain networks.

```ts
const fabricAccessor = await AWS.ManagedBlockchain.Accessor("FabricAccessor", {
  AccessorType: "NODE",
  NetworkType: "HYPERLEDGER_FABRIC",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "UseCase", Value: "SupplyChain" }
  ]
});

const ethereumAccessor = await AWS.ManagedBlockchain.Accessor("EthereumAccessor", {
  AccessorType: "MEMBER",
  NetworkType: "ETHEREUM",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "UseCase", Value: "Finance" }
  ]
});
```

## Error Handling with Existing Resources

Handle scenarios where the Accessor might already exist.

```ts
try {
  const existingAccessor = await AWS.ManagedBlockchain.Accessor("ExistingAccessor", {
    AccessorType: "NODE",
    NetworkType: "HYPERLEDGER_FABRIC",
    adopt: true // Attempt to adopt the existing resource
  });
} catch (error) {
  console.error("Error creating Accessor:", error);
}
```