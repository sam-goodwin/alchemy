---
title: UserProfile
description: Learn how to create, update, and manage AWS OpsWorks UserProfiles using Alchemy Cloud Control.
---


The UserProfile resource allows you to manage [AWS OpsWorks UserProfiles](https://docs.aws.amazon.com/opsworks/latest/userguide/) for your applications, providing options for SSH access and management capabilities.

## Minimal Example

Create a basic UserProfile with required properties and one optional setting for self-management.

```ts
import AWS from "alchemy/aws/control";

const userProfile = await AWS.OpsWorks.UserProfile("userProfile1", {
  IamUserArn: "arn:aws:iam::123456789012:user/johndoe",
  AllowSelfManagement: true
});
```

## Advanced Configuration

Configure a UserProfile with SSH access by specifying the SSH username and public key.

```ts
const advancedUserProfile = await AWS.OpsWorks.UserProfile("userProfile2", {
  IamUserArn: "arn:aws:iam::123456789012:user/janedoe",
  AllowSelfManagement: true,
  SshUsername: "jane.doe",
  SshPublicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC..."
});
```

## Adopt Existing UserProfile

If you want to adopt an existing UserProfile without failing if it already exists, you can set the `adopt` property to true.

```ts
const adoptedUserProfile = await AWS.OpsWorks.UserProfile("userProfile3", {
  IamUserArn: "arn:aws:iam::123456789012:user/smith",
  AllowSelfManagement: false,
  adopt: true
});
```

## Example with Custom SSH Configuration

Create a UserProfile that specifies custom SSH settings and allows for self-management.

```ts
const customSshUserProfile = await AWS.OpsWorks.UserProfile("userProfile4", {
  IamUserArn: "arn:aws:iam::123456789012:user/alex",
  AllowSelfManagement: true,
  SshUsername: "alex.smith",
  SshPublicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAr5..."
});
```
