---
title: Managing AWS Deadline QueueFleetAssociations with Alchemy
description: Learn how to create, update, and manage AWS Deadline QueueFleetAssociations using Alchemy Cloud Control.
---

# QueueFleetAssociation

The QueueFleetAssociation resource allows you to associate a fleet with a queue in AWS Deadline. This is essential for managing rendering tasks efficiently across multiple resources. For more detailed information, refer to the [AWS Deadline QueueFleetAssociations documentation](https://docs.aws.amazon.com/deadline/latest/userguide/).

## Minimal Example

Create a basic QueueFleetAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicQueueFleetAssociation = await AWS.Deadline.QueueFleetAssociation("BasicQueueFleetAssociation", {
  FleetId: "fleet-1234567890abcdef0",
  QueueId: "queue-1234567890abcdef0",
  FarmId: "farm-1234567890abcdef0"
});
```

## Advanced Configuration

You can also include optional parameters like `adopt` to manage existing resources.

```ts
const AdvancedQueueFleetAssociation = await AWS.Deadline.QueueFleetAssociation("AdvancedQueueFleetAssociation", {
  FleetId: "fleet-0987654321fedcba0",
  QueueId: "queue-0987654321fedcba0",
  FarmId: "farm-0987654321fedcba0",
  adopt: true
});
```

## Example with Additional Properties

This example demonstrates how to access additional properties such as ARN and timestamps after resource creation.

```ts
const QueueFleetAssociationWithDetails = await AWS.Deadline.QueueFleetAssociation("QueueFleetAssociationWithDetails", {
  FleetId: "fleet-1122334455667788",
  QueueId: "queue-1122334455667788",
  FarmId: "farm-1122334455667788"
});

// Accessing additional properties
console.log(`ARN: ${QueueFleetAssociationWithDetails.Arn}`);
console.log(`Creation Time: ${QueueFleetAssociationWithDetails.CreationTime}`);
console.log(`Last Update Time: ${QueueFleetAssociationWithDetails.LastUpdateTime}`);
```