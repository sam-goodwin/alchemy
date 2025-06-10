---
title: Member
description: Learn how to create, update, and manage AWS GuardDuty Members using Alchemy Cloud Control.
---


The Member resource allows you to manage [AWS GuardDuty Members](https://docs.aws.amazon.com/guardduty/latest/userguide/) within your AWS account. This resource enables you to invite and manage member accounts to participate in GuardDuty threat detection.

## Minimal Example

Create a basic GuardDuty member with essential properties.

```ts
import AWS from "alchemy/aws/control";

const guardDutyMember = await AWS.GuardDuty.Member("guardDutyMember", {
  Email: "member@example.com",
  DetectorId: "1234567890abcdef1234567890abcdef",
  DisableEmailNotification: false
});
```

## Advanced Configuration

Configure a GuardDuty member with additional properties, including a custom message and status.

```ts
const advancedGuardDutyMember = await AWS.GuardDuty.Member("advancedGuardDutyMember", {
  Email: "advancedMember@example.com",
  DetectorId: "1234567890abcdef1234567890abcdef",
  Message: "Welcome to GuardDuty!",
  Status: "Invited"
});
```

## Adoption of Existing Resource

Adopt an existing GuardDuty member instead of failing if it already exists.

```ts
const adoptGuardDutyMember = await AWS.GuardDuty.Member("adoptGuardDutyMember", {
  Email: "existingMember@example.com",
  DetectorId: "1234567890abcdef1234567890abcdef",
  adopt: true
});
```

## Disable Email Notification

Create a GuardDuty member while disabling email notifications.

```ts
const noEmailGuardDutyMember = await AWS.GuardDuty.Member("noEmailGuardDutyMember", {
  Email: "noNotificationMember@example.com",
  DetectorId: "1234567890abcdef1234567890abcdef",
  DisableEmailNotification: true
});
```
