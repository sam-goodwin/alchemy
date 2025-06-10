---
title: SecurityProfile
description: Learn how to create, update, and manage AWS Connect SecurityProfiles using Alchemy Cloud Control.
---


The SecurityProfile resource allows you to manage [AWS Connect SecurityProfiles](https://docs.aws.amazon.com/connect/latest/userguide/) that define permissions and access controls for users in your AWS Connect instances.

## Minimal Example

Create a basic security profile with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const basicSecurityProfile = await AWS.Connect.SecurityProfile("basicSecurityProfile", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-abcd-efghijklmnop",
  SecurityProfileName: "BasicProfile",
  Description: "A basic security profile with limited permissions.",
  Permissions: [
    "connect:StartChatContact",
    "connect:StopContact"
  ]
});
```

## Advanced Configuration

Configure a security profile with additional permissions and access control tags.

```ts
const advancedSecurityProfile = await AWS.Connect.SecurityProfile("advancedSecurityProfile", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-abcd-efghijklmnop",
  SecurityProfileName: "AdvancedProfile",
  Description: "An advanced security profile with comprehensive permissions.",
  Permissions: [
    "connect:StartOutboundVoiceContact",
    "connect:UpdateContactAttributes",
    "connect:ViewContact"
  ],
  AllowedAccessControlTags: [
    { Key: "Department", Value: "Support" },
    { Key: "Region", Value: "US-East" }
  ]
});
```

## Tagging and Resource Restrictions

Create a security profile with tagging restrictions on resources.

```ts
const taggedSecurityProfile = await AWS.Connect.SecurityProfile("taggedSecurityProfile", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-abcd-efghijklmnop",
  SecurityProfileName: "TaggedProfile",
  Permissions: [
    "connect:CreateUser",
    "connect:DeleteUser"
  ],
  TagRestrictedResources: [
    "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-abcd-efghijklmnop/user/12345678"
  ],
  HierarchyRestrictedResources: [
    "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-abcd-efghijklmnop/hierarchy/1"
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing security profile instead of failing, you can set the `adopt` property to true.

```ts
const adoptedSecurityProfile = await AWS.Connect.SecurityProfile("adoptedSecurityProfile", {
  InstanceArn: "arn:aws:connect:us-east-1:123456789012:instance/abcdefg-1234-5678-abcd-efghijklmnop",
  SecurityProfileName: "AdoptedProfile",
  adopt: true
});
```
