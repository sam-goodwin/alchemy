---
title: Managing AWS IoT ScheduledAudits with Alchemy
description: Learn how to create, update, and manage AWS IoT ScheduledAudits using Alchemy Cloud Control.
---

# ScheduledAudit

The ScheduledAudit resource allows you to create and manage scheduled audits for your AWS IoT resources, ensuring compliance and security by regularly checking your IoT configurations. For more information, refer to the [AWS IoT ScheduledAudits documentation](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

Create a basic ScheduledAudit with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicScheduledAudit = await AWS.IoT.ScheduledAudit("BasicScheduledAudit", {
  TargetCheckNames: ["iot:CheckIoTPolicy", "iot:CheckDeviceCertificate"],
  Frequency: "WEEKLY",
  DayOfWeek: "MONDAY",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Advanced Configuration

Configure a ScheduledAudit with additional options for a more complex scenario.

```ts
const AdvancedScheduledAudit = await AWS.IoT.ScheduledAudit("AdvancedScheduledAudit", {
  TargetCheckNames: [
    "iot:CheckIoTPolicy",
    "iot:CheckDeviceCertificate",
    "iot:CheckCertificatesRevocation"
  ],
  Frequency: "MONTHLY",
  DayOfMonth: "15",
  ScheduledAuditName: "MonthlyComplianceAudit",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Owner", Value: "ComplianceTeam" }
  ]
});
```

## Custom Audit Name

Define a ScheduledAudit with a specific audit name for easier identification.

```ts
const CustomNamedScheduledAudit = await AWS.IoT.ScheduledAudit("CustomNamedScheduledAudit", {
  TargetCheckNames: ["iot:CheckIoTPolicy"],
  Frequency: "DAILY",
  ScheduledAuditName: "DailyIoTPolicyAudit",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DevOps" }
  ]
});
```

## Weekly Audit on Specific Day

Set up a ScheduledAudit that runs on a specific day of the week.

```ts
const WeeklyAuditOnFriday = await AWS.IoT.ScheduledAudit("WeeklyAuditOnFriday", {
  TargetCheckNames: ["iot:CheckDeviceCertificate"],
  Frequency: "WEEKLY",
  DayOfWeek: "FRIDAY",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "IoT" }
  ]
});
```