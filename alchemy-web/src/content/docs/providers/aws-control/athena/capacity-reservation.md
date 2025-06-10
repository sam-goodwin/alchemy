---
title: CapacityReservation
description: Learn how to create, update, and manage AWS Athena CapacityReservations using Alchemy Cloud Control.
---


The CapacityReservation resource allows you to manage [AWS Athena CapacityReservations](https://docs.aws.amazon.com/athena/latest/userguide/) for provisioning dedicated query capacity in AWS Athena.

## Minimal Example

Create a basic capacity reservation with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicCapacityReservation = await AWS.Athena.CapacityReservation("basicCapacityReservation", {
  targetDpus: 10,
  name: "MyBasicCapacityReservation"
});
```

## Advanced Configuration

Configure a capacity reservation with additional options like capacity assignment configuration and tags.

```ts
const advancedCapacityReservation = await AWS.Athena.CapacityReservation("advancedCapacityReservation", {
  targetDpus: 20,
  name: "MyAdvancedCapacityReservation",
  capacityAssignmentConfiguration: {
    // Example configuration: Assigns capacity based on account limits
    capacityAssignments: [
      {
        accountId: "123456789012",
        percentage: 100
      }
    ]
  },
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Project",
      value: "DataAnalytics"
    }
  ]
});
```

## Tags for Resource Management

Create a capacity reservation specifically for a project with tags for better organization.

```ts
const taggedCapacityReservation = await AWS.Athena.CapacityReservation("taggedCapacityReservation", {
  targetDpus: 15,
  name: "ProjectXCapacityReservation",
  tags: [
    {
      key: "Department",
      value: "Engineering"
    },
    {
      key: "Owner",
      value: "DataTeam"
    }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing capacity reservation without failing if it already exists.

```ts
const adoptExistingReservation = await AWS.Athena.CapacityReservation("adoptExistingReservation", {
  targetDpus: 5,
  name: "ExistingReservation",
  adopt: true // Set to true to adopt an existing resource
});
```
