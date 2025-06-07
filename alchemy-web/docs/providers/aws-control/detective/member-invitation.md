---
title: Managing AWS Detective MemberInvitations with Alchemy
description: Learn how to create, update, and manage AWS Detective MemberInvitations using Alchemy Cloud Control.
---

# MemberInvitation

The MemberInvitation resource lets you manage [AWS Detective MemberInvitations](https://docs.aws.amazon.com/detective/latest/userguide/) for inviting new member accounts to your AWS Detective graph.

## Minimal Example

Create a basic member invitation with required properties and one optional message.

```ts
import AWS from "alchemy/aws/control";

const memberInvitation = await AWS.Detective.MemberInvitation("BasicMemberInvitation", {
  MemberId: "123456789012",
  Message: "You are invited to join the AWS Detective graph.",
  GraphArn: "arn:aws:detective:us-west-2:123456789012:graph:abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  MemberEmailAddress: "newmember@example.com"
});
```

## Advanced Configuration

Configure a member invitation with email notifications disabled.

```ts
const advancedMemberInvitation = await AWS.Detective.MemberInvitation("AdvancedMemberInvitation", {
  MemberId: "987654321098",
  GraphArn: "arn:aws:detective:us-west-2:123456789012:graph:abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  MemberEmailAddress: "anothermember@example.com",
  DisableEmailNotification: true
});
```

## Adoption of Existing Resource

Create a member invitation that adopts an existing resource if it already exists.

```ts
const adoptedMemberInvitation = await AWS.Detective.MemberInvitation("AdoptedMemberInvitation", {
  MemberId: "555555555555",
  GraphArn: "arn:aws:detective:us-west-2:123456789012:graph:abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  MemberEmailAddress: "adoptedmember@example.com",
  adopt: true
});
```

## Example with Custom Message

Send a member invitation with a customized message to the new member.

```ts
const customMessageMemberInvitation = await AWS.Detective.MemberInvitation("CustomMessageMemberInvitation", {
  MemberId: "444444444444",
  Message: "Welcome! Please join our AWS Detective graph for enhanced security insights.",
  GraphArn: "arn:aws:detective:us-west-2:123456789012:graph:abcdefgh-ijkl-mnop-qrst-uvwxyz123456",
  MemberEmailAddress: "custommessage@example.com"
});
```