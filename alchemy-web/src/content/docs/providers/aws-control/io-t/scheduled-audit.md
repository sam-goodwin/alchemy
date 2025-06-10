---
title: ScheduledAudit
description: Learn how to create, update, and manage AWS IoT ScheduledAudits using Alchemy Cloud Control.
---


The ScheduledAudit resource allows you to manage [AWS IoT Scheduled Audits](https://docs.aws.amazon.com/iot/latest/userguide/) that help ensure your IoT devices comply with security best practices.

## Minimal Example

Create a basic scheduled audit that runs weekly on Mondays.

```ts
import AWS from "alchemy/aws/control";

const scheduledAudit = await AWS.IoT.ScheduledAudit("WeeklyDeviceAudit", {
  DayOfWeek: "MONDAY",
  TargetCheckNames: ["AWS_IOT_Things_Require_MFA", "AWS_IOT_Things_Authorized"],
  Frequency: "WEEKLY",
  ScheduledAuditName: "WeeklyDeviceAudit"
});
```

## Advanced Configuration

Configure a scheduled audit to run on the first day of each month and include tags for better resource management.

```ts
const monthlyAudit = await AWS.IoT.ScheduledAudit("MonthlySecurityAudit", {
  DayOfMonth: "1",
  TargetCheckNames: ["AWS_IOT_Things_Require_MFA", "AWS_IOT_Things_Authorized"],
  Frequency: "MONTHLY",
  ScheduledAuditName: "MonthlySecurityAudit",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "SecurityTeam" }
  ]
});
```

## Custom Audit Frequency

Create a scheduled audit that runs daily to check specific compliance metrics.

```ts
const dailyAudit = await AWS.IoT.ScheduledAudit("DailyComplianceCheck", {
  DayOfWeek: "SUNDAY", // Not used for daily audits, but can be included
  TargetCheckNames: ["AWS_IOT_Things_Require_MFA"],
  Frequency: "DAILY",
  ScheduledAuditName: "DailyComplianceCheck"
});
```
