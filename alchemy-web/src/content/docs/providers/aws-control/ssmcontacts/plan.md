---
title: Plan
description: Learn how to create, update, and manage AWS SSMContacts Plans using Alchemy Cloud Control.
---


The Plan resource lets you manage [AWS SSMContacts Plans](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) for incident management and response workflows.

## Minimal Example

Create a basic SSMContacts Plan with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicPlan = await AWS.SSMContacts.Plan("basicPlan", {
  ContactId: "arn:aws:ssm-contacts:us-east-1:123456789012:contact:example-contact",
  RotationIds: ["rotation-id-1"] // Optional rotation ID
});
```

## Advanced Configuration

Configure a plan with stages to manage on-call rotations and escalation paths.

```ts
import AWS from "alchemy/aws/control";

const advancedPlan = await AWS.SSMContacts.Plan("advancedPlan", {
  ContactId: "arn:aws:ssm-contacts:us-east-1:123456789012:contact:example-contact",
  RotationIds: ["rotation-id-1", "rotation-id-2"],
  Stages: [
    {
      Name: "Initial Notification",
      TargetContacts: ["arn:aws:ssm-contacts:us-east-1:123456789012:contact:example-contact"],
      DurationInMinutes: 30
    },
    {
      Name: "Escalation to Backup",
      TargetContacts: ["arn:aws:ssm-contacts:us-east-1:123456789012:contact:backup-contact"],
      DurationInMinutes: 15
    }
  ]
});
```

## Custom Rotation Configuration

Define a plan with specific rotation configurations that can be reused across multiple incidents.

```ts
import AWS from "alchemy/aws/control";

const customRotationPlan = await AWS.SSMContacts.Plan("customRotationPlan", {
  ContactId: "arn:aws:ssm-contacts:us-east-1:123456789012:contact:example-contact",
  RotationIds: ["rotation-id-1"],
  Stages: [
    {
      Name: "On-Call Rotation",
      TargetContacts: [
        "arn:aws:ssm-contacts:us-east-1:123456789012:contact:primary-contact",
        "arn:aws:ssm-contacts:us-east-1:123456789012:contact:secondary-contact"
      ],
      DurationInMinutes: 60
    }
  ]
});
```
