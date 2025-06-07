---
title: Managing AWS GuardDuty Masters with Alchemy
description: Learn how to create, update, and manage AWS GuardDuty Masters using Alchemy Cloud Control.
---

# Master

The Master resource allows you to manage [AWS GuardDuty Masters](https://docs.aws.amazon.com/guardduty/latest/userguide/) which are used to manage multiple GuardDuty detectors across accounts.

## Minimal Example

Create a basic GuardDuty Master with required properties:

```ts
import AWS from "alchemy/aws/control";

const guardDutyMaster = await AWS.GuardDuty.Master("GuardDutyMaster", {
  DetectorId: "abcd1234efgh5678ijkl9101mnopqrstu", // Your GuardDuty Detector ID
  MasterId: "123456789012" // The AWS account ID of the master account
});
```

## Advanced Configuration

Configure the GuardDuty Master with an invitation ID and enable resource adoption:

```ts
const advancedGuardDutyMaster = await AWS.GuardDuty.Master("AdvancedGuardDutyMaster", {
  DetectorId: "abcd1234efgh5678ijkl9101mnopqrstu",
  MasterId: "123456789012",
  InvitationId: "invitation-1234567890",
  adopt: true // Adopt existing GuardDuty resource if it already exists
});
```

## Adoption of Existing Resources

Use the adoption feature to handle existing resources without failure:

```ts
const adoptGuardDutyMaster = await AWS.GuardDuty.Master("AdoptGuardDutyMaster", {
  DetectorId: "abcd1234efgh5678ijkl9101mnopqrstu",
  MasterId: "123456789012",
  adopt: true // This will adopt the existing resource if it already exists
});
```