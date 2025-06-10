---
title: QueueLimitAssociation
description: Learn how to create, update, and manage AWS Deadline QueueLimitAssociations using Alchemy Cloud Control.
---


The QueueLimitAssociation resource allows you to manage associations between queue limits and farms in AWS Deadline. For more information, you can visit the [AWS Deadline QueueLimitAssociations](https://docs.aws.amazon.com/deadline/latest/userguide/) documentation.

## Minimal Example

This example demonstrates how to create a basic QueueLimitAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const queueLimitAssociation = await AWS.Deadline.QueueLimitAssociation("basicQueueLimitAssociation", {
  LimitId: "limit-12345",
  QueueId: "queue-67890",
  FarmId: "farm-abcde"
});
```

## Advanced Configuration

This example shows how to create a QueueLimitAssociation with the optional `adopt` property, which allows you to adopt an existing resource instead of failing if it already exists.

```ts
const advancedQueueLimitAssociation = await AWS.Deadline.QueueLimitAssociation("advancedQueueLimitAssociation", {
  LimitId: "limit-54321",
  QueueId: "queue-09876",
  FarmId: "farm-edcba",
  adopt: true
});
```

## Resource Lifecycle Management

This example demonstrates how to create, update, and delete a QueueLimitAssociation while managing its lifecycle.

```ts
const lifecycleQueueLimitAssociation = await AWS.Deadline.QueueLimitAssociation("lifecycleQueueLimitAssociation", {
  LimitId: "limit-11111",
  QueueId: "queue-22222",
  FarmId: "farm-33333"
});

// Update the association
await AWS.Deadline.QueueLimitAssociation("lifecycleQueueLimitAssociation", {
  LimitId: "limit-11111",
  QueueId: "queue-44444", // Changing the QueueId
  FarmId: "farm-33333"
});

// Delete the association
await AWS.Deadline.QueueLimitAssociation("lifecycleQueueLimitAssociation", {
  LimitId: "limit-11111",
  QueueId: "queue-44444",
  FarmId: "farm-33333",
  adopt: false // Ensure it fails if it already exists
});
```
