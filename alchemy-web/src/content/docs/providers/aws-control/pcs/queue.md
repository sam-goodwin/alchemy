---
title: Queue
description: Learn how to create, update, and manage AWS PCS Queues using Alchemy Cloud Control.
---


The Queue resource allows you to create and manage [AWS PCS Queues](https://docs.aws.amazon.com/pcs/latest/userguide/) which are essential for processing jobs in a distributed manner.

## Minimal Example

Create a basic PCS Queue with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const pcsQueue = await AWS.PCS.Queue("myQueue", {
  clusterId: "pcs-cluster-1",
  tags: {
    Environment: "Production"
  }
});
```

## Advanced Configuration

Configure a queue with compute node group configurations for more granular control over task execution.

```ts
import AWS from "alchemy/aws/control";

const advancedQueue = await AWS.PCS.Queue("advancedQueue", {
  clusterId: "pcs-cluster-1",
  computeNodeGroupConfigurations: [
    {
      instanceType: "c5.large",
      desiredSize: 2,
      maxSize: 5,
      minSize: 1
    }
  ],
  name: "AdvancedQueue"
});
```

## Queue with Adoption

Create a queue that adopts an existing resource if it is already present.

```ts
import AWS from "alchemy/aws/control";

const adoptedQueue = await AWS.PCS.Queue("adoptedQueue", {
  clusterId: "pcs-cluster-1",
  adopt: true,
  name: "ExistingQueue"
});
```

## Queue with Multiple Tags

Demonstrate how to create a queue with multiple tags for better resource management.

```ts
import AWS from "alchemy/aws/control";

const taggedQueue = await AWS.PCS.Queue("taggedQueue", {
  clusterId: "pcs-cluster-1",
  tags: {
    Project: "DataProcessing",
    Owner: "TeamA",
    Environment: "Development"
  }
});
```
