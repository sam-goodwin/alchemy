---
title: Managing AWS ManagedBlockchain Nodes with Alchemy
description: Learn how to create, update, and manage AWS ManagedBlockchain Nodes using Alchemy Cloud Control.
---

# Node

The Node resource lets you create and manage [AWS ManagedBlockchain Nodes](https://docs.aws.amazon.com/managedblockchain/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-managedblockchain-node.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const node = await AWS.ManagedBlockchain.Node("node-example", {
  NetworkId: "example-networkid",
  NodeConfiguration: "example-nodeconfiguration",
});
```

