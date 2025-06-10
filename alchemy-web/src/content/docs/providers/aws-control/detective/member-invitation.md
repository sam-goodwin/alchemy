---
title: MemberInvitation
description: Learn how to create, update, and manage AWS Detective MemberInvitations using Alchemy Cloud Control.
---


The MemberInvitation resource allows you to manage [AWS Detective MemberInvitations](https://docs.aws.amazon.com/detective/latest/userguide/) for inviting members to your AWS Detective graph.

## Minimal Example

Create a basic member invitation with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const memberInvitation = await AWS.Detective.MemberInvitation("inviteMember", {
  MemberId: "123456789012",
  GraphArn: "arn:aws:detective:us-west-2:123456789012:graph:abcd1234-5678-90ef-ghij-klmnopqrstuv",
  MemberEmailAddress: "member@example.com",
  Message: "You are invited to join the Detective graph."
});
```

## Advanced Configuration

Configure a member invitation with email notification disabled.

```ts
const advancedMemberInvitation = await AWS.Detective.MemberInvitation("advancedInviteMember", {
  MemberId: "098765432109",
  GraphArn: "arn:aws:detective:us-west-2:123456789012:graph:wxyz1234-5678-90ef-ghij-klmnopqrstuv",
  MemberEmailAddress: "advanced-member@example.com",
  Message: "You have been invited to join the Detective graph.",
  DisableEmailNotification: true
});
```

## Adoption of Existing Resources

Create a member invitation while adopting an existing member if it already exists.

```ts
const adoptExistingMemberInvitation = await AWS.Detective.MemberInvitation("adoptInviteMember", {
  MemberId: "112233445566",
  GraphArn: "arn:aws:detective:us-west-2:123456789012:graph:mnop1234-5678-90ef-ghij-klmnopqrstuv",
  MemberEmailAddress: "adoptive-member@example.com",
  Message: "Invitation to join the Detective graph, adopting existing resource.",
  adopt: true
});
```
