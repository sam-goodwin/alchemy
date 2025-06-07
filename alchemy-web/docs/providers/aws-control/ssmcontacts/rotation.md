---
title: Managing AWS SSMContacts Rotations with Alchemy
description: Learn how to create, update, and manage AWS SSMContacts Rotations using Alchemy Cloud Control.
---

# Rotation

The Rotation resource lets you create and manage [AWS SSMContacts Rotations](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssmcontacts-rotation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const rotation = await AWS.SSMContacts.Rotation("rotation-example", {
  Recurrence: "example-recurrence",
  TimeZoneId: "example-timezoneid",
  StartTime: "example-starttime",
  Name: "rotation-",
  ContactIds: ["example-contactids-1"],
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a rotation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRotation = await AWS.SSMContacts.Rotation("advanced-rotation", {
  Recurrence: "example-recurrence",
  TimeZoneId: "example-timezoneid",
  StartTime: "example-starttime",
  Name: "rotation-",
  ContactIds: ["example-contactids-1"],
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

