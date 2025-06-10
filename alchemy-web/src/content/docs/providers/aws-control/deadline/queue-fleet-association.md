---
title: QueueFleetAssociation
description: Learn how to create, update, and manage AWS Deadline QueueFleetAssociations using Alchemy Cloud Control.
---


The QueueFleetAssociation resource allows you to associate a queue with a fleet in AWS Deadline, enabling better management of rendering tasks across multiple resources. For more details, visit the [AWS Deadline QueueFleetAssociations documentation](https://docs.aws.amazon.com/deadline/latest/userguide/).

## Minimal Example

Create a basic QueueFleetAssociation with required properties and an optional adopt flag.

```ts
import AWS from "alchemy/aws/control";

const queueFleetAssociation = await AWS.Deadline.QueueFleetAssociation("myQueueFleetAssociation", {
  FleetId: "fleet-12345678", // The ID of the fleet you want to associate
  QueueId: "queue-87654321", // The ID of the queue to be associated
  FarmId: "farm-abcdef12", // The ID of the farm where the queue is located
  adopt: true // Optional: If true, adopt existing resource instead of failing when resource already exists
});
```

## Advanced Configuration

Configure a QueueFleetAssociation with additional properties such as managing resource creation time.

```ts
const advancedQueueFleetAssociation = await AWS.Deadline.QueueFleetAssociation("advancedQueueFleetAssociation", {
  FleetId: "fleet-98765432", // The ID of the fleet
  QueueId: "queue-12345678", // The ID of the queue
  FarmId: "farm-12abcdef", // The ID of the farm
  adopt: false, // Optional: Set to true if you want to adopt existing resources
  Arn: "arn:aws:deadline:us-west-2:123456789012:queue/fleet-98765432", // Optional: ARN of the resource
});
```

## Creating Multiple Associations

Demonstrate how to create multiple QueueFleetAssociations for different fleets and queues.

```ts
const firstQueueFleetAssociation = await AWS.Deadline.QueueFleetAssociation("firstAssociation", {
  FleetId: "fleet-11111111",
  QueueId: "queue-22222222",
  FarmId: "farm-abcabc12"
});

const secondQueueFleetAssociation = await AWS.Deadline.QueueFleetAssociation("secondAssociation", {
  FleetId: "fleet-33333333",
  QueueId: "queue-44444444",
  FarmId: "farm-defdef34",
  adopt: true // Adopt existing resources for the second association
});
```
