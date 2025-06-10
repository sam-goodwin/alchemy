---
title: Node
description: Learn how to create, update, and manage AWS ManagedBlockchain Nodes using Alchemy Cloud Control.
---


The Node resource lets you manage [AWS ManagedBlockchain Nodes](https://docs.aws.amazon.com/managedblockchain/latest/userguide/) in your blockchain network. This resource allows you to create and configure nodes that participate in your managed blockchain.

## Minimal Example

Create a basic ManagedBlockchain Node with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const blockchainNode = await AWS.ManagedBlockchain.Node("myBlockchainNode", {
  MemberId: "myMemberId",
  NetworkId: "myNetworkId",
  NodeConfiguration: {
    InstanceType: "BC.t3.medium",
    AvailabilityZone: "us-east-1a"
  }
});
```

## Advanced Configuration

Configure a node with additional properties such as a custom instance type and availability zone.

```ts
const advancedBlockchainNode = await AWS.ManagedBlockchain.Node("advancedBlockchainNode", {
  MemberId: "myMemberId",
  NetworkId: "myNetworkId",
  NodeConfiguration: {
    InstanceType: "BC.t3.large",
    AvailabilityZone: "us-west-2b",
    Framework: {
      Name: "Hyperledger Fabric",
      Version: "1.4"
    }
  }
});
```

## Node Adoption

Create a node that adopts an existing resource instead of failing if it already exists.

```ts
const adoptExistingNode = await AWS.ManagedBlockchain.Node("adoptNode", {
  MemberId: "myMemberId",
  NetworkId: "myNetworkId",
  NodeConfiguration: {
    InstanceType: "BC.t3.medium",
    AvailabilityZone: "us-east-1a"
  },
  adopt: true
});
```

## Custom Node Configuration

Demonstrate a node with a specific configuration including the framework settings.

```ts
const customNodeConfig = await AWS.ManagedBlockchain.Node("customNode", {
  MemberId: "myMemberId",
  NetworkId: "myNetworkId",
  NodeConfiguration: {
    InstanceType: "BC.t3.xlarge",
    AvailabilityZone: "eu-central-1a",
    Framework: {
      Name: "Hyperledger Fabric",
      Version: "2.2"
    },
    LoggingConfiguration: {
      LogLevel: "INFO"
    }
  }
});
```
