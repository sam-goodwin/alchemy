---
title: Rotation
description: Learn how to create, update, and manage AWS SSMContacts Rotations using Alchemy Cloud Control.
---


The Rotation resource lets you manage [AWS SSMContacts Rotations](https://docs.aws.amazon.com/ssmcontacts/latest/userguide/) which define a schedule for contacting on-call personnel.

## Minimal Example

Create a basic rotation with the required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicRotation = await AWS.SSMContacts.Rotation("basicRotation", {
  Name: "WeeklyOnCall",
  Recurrence: {
    Frequency: "Weekly",
    Interval: 1,
    DayOfWeek: ["Monday"]
  },
  TimeZoneId: "America/New_York",
  StartTime: "2023-10-01T09:00:00Z",
  ContactIds: ["contact-id-123"],
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a rotation with additional recurrence settings and multiple contacts.

```ts
const advancedRotation = await AWS.SSMContacts.Rotation("advancedRotation", {
  Name: "24x7OnCall",
  Recurrence: {
    Frequency: "Daily",
    Interval: 1,
    TimeOfDay: "09:00:00"
  },
  TimeZoneId: "UTC",
  StartTime: "2023-10-01T09:00:00Z",
  ContactIds: [
    "contact-id-123",
    "contact-id-456"
  ],
  Tags: [
    { Key: "Team", Value: "DevOps" },
    { Key: "Service", Value: "API" }
  ]
});
```

## Customized Recurrence and Timezone

Create a rotation that occurs bi-weekly in a specific timezone.

```ts
const biWeeklyRotation = await AWS.SSMContacts.Rotation("biWeeklyRotation", {
  Name: "BiWeeklyOnCall",
  Recurrence: {
    Frequency: "Weekly",
    Interval: 2,
    DayOfWeek: ["Wednesday"]
  },
  TimeZoneId: "Europe/London",
  StartTime: "2023-10-01T11:00:00Z",
  ContactIds: ["contact-id-789"],
  Tags: [
    { Key: "Region", Value: "Europe" }
  ]
});
```

## Adopting Existing Resources

Create a rotation that adopts an existing resource if it already exists.

```ts
const adoptRotation = await AWS.SSMContacts.Rotation("adoptRotation", {
  Name: "ExistingOnCall",
  Recurrence: {
    Frequency: "Daily",
    Interval: 1,
    TimeOfDay: "08:00:00"
  },
  TimeZoneId: "Asia/Tokyo",
  StartTime: "2023-10-01T08:00:00Z",
  ContactIds: ["contact-id-101"],
  adopt: true // Adopt existing resource if it exists
});
```
