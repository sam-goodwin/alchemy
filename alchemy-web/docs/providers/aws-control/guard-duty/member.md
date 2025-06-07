---
title: Managing AWS GuardDuty Members with Alchemy
description: Learn how to create, update, and manage AWS GuardDuty Members using Alchemy Cloud Control.
---

# Member

The Member resource allows you to manage [AWS GuardDuty Members](https://docs.aws.amazon.com/guardduty/latest/userguide/) within your AWS account. This includes inviting members to a GuardDuty detector and managing their statuses.

## Minimal Example

Create a basic GuardDuty member with essential properties.

```ts
import AWS from "alchemy/aws/control";

const guardDutyMember = await AWS.GuardDuty.Member("BasicGuardDutyMember", {
  Email: "member@example.com",
  DetectorId: "detector-1234567890abcdef",
  Status: "INVITED",
  DisableEmailNotification: false
});
```

## Advanced Configuration

Configure additional properties such as a welcome message and adopting existing resources.

```ts
const advancedGuardDutyMember = await AWS.GuardDuty.Member("AdvancedGuardDutyMember", {
  Email: "advanced.member@example.com",
  DetectorId: "detector-0987654321abcdef",
  Status: "ACTIVE",
  Message: "Welcome to our GuardDuty team!",
  adopt: true // Adopt existing resource if it already exists
});
```

## Inviting Multiple Members

You can also invite multiple members by creating separate resources for each.

```ts
const firstMember = await AWS.GuardDuty.Member("FirstGuardDutyMember", {
  Email: "first.member@example.com",
  DetectorId: "detector-1234567890abcdef",
  Status: "INVITED"
});

const secondMember = await AWS.GuardDuty.Member("SecondGuardDutyMember", {
  Email: "second.member@example.com",
  DetectorId: "detector-1234567890abcdef",
  Status: "INVITED"
});
```

## Updating Member Status

Update the status of an existing member when they accept the invitation.

```ts
const updatedMember = await AWS.GuardDuty.Member("UpdatedGuardDutyMember", {
  Email: "member@example.com",
  DetectorId: "detector-1234567890abcdef",
  Status: "ACTIVE"
});
```