---
title: Master
description: Learn how to create, update, and manage AWS GuardDuty Masters using Alchemy Cloud Control.
---


The Master resource allows you to manage [AWS GuardDuty Masters](https://docs.aws.amazon.com/guardduty/latest/userguide/) and their configurations for threat detection across multiple accounts.

## Minimal Example

Create a basic GuardDuty Master with required properties.

```ts
import AWS from "alchemy/aws/control";

const guardDutyMaster = await AWS.GuardDuty.Master("myGuardDutyMaster", {
  DetectorId: "12abc34def567g8h9i0jklmnop",
  MasterId: "123456789012",
  InvitationId: "abcd1234-ef56-78gh-ijkl-9mnopqrs"
});
```

## Advanced Configuration

Configure a GuardDuty Master with the option to adopt an existing resource if it already exists.

```ts
const advancedGuardDutyMaster = await AWS.GuardDuty.Master("advancedGuardDutyMaster", {
  DetectorId: "21fedcba-9876-5432-10hg-fe54321dcba9",
  MasterId: "098765432109",
  InvitationId: "abcd5678-ef90-12gh-ijkl-3mnopqrs",
  adopt: true // Adopts existing resource instead of failing
});
```

## Use Case: Inviting Member Accounts

Demonstrate how to use the Master resource to invite member accounts for GuardDuty.

```ts
const inviteGuardDutyMaster = await AWS.GuardDuty.Master("inviteMemberAccounts", {
  DetectorId: "3abcdef456gh789ijkl0123mnopqrs",
  MasterId: "112233445566",
  InvitationId: "ijklmnop-qrst-uvwx-yz12-345678901234",
  adopt: false // This will fail if the resource already exists
});
```

## Use Case: Updating Master Properties

Show how to update existing properties of a GuardDuty Master resource.

```ts
const updateGuardDutyMaster = await AWS.GuardDuty.Master("updateMasterProperties", {
  DetectorId: "4hijklmno567pqr890stu1234vwxyz",
  MasterId: "223344556677",
  InvitationId: "mnop5678-qrst-uvwx-yz12-345678901234",
  adopt: true // Will adopt any existing resource
});
```
