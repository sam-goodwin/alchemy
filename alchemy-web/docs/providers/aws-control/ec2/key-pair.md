---
title: Managing AWS EC2 KeyPairs with Alchemy
description: Learn how to create, update, and manage AWS EC2 KeyPairs using Alchemy Cloud Control.
---

# KeyPair

The KeyPair resource lets you manage [AWS EC2 KeyPairs](https://docs.aws.amazon.com/ec2/latest/userguide/) for securely accessing your EC2 instances.

## Minimal Example

Create a basic EC2 KeyPair with a specified name and a public key material:

```ts
import AWS from "alchemy/aws/control";

const MyKeyPair = await AWS.EC2.KeyPair("MyKeyPair", {
  KeyName: "MyFirstKeyPair",
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3... user@hostname",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

Create an EC2 KeyPair with additional configurations such as key type and format:

```ts
const AdvancedKeyPair = await AWS.EC2.KeyPair("AdvancedKeyPair", {
  KeyName: "AdvancedKeyPair",
  KeyType: "rsa",
  KeyFormat: "pem",
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3... user@hostname",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Backend" }
  ]
});
```

## Adopting Existing KeyPair

If you want to adopt an existing KeyPair without failing if it already exists, use the `adopt` property:

```ts
const AdoptedKeyPair = await AWS.EC2.KeyPair("AdoptedKeyPair", {
  KeyName: "ExistingKeyPair",
  adopt: true
});
```

## KeyPair with Custom Tagging

Create a KeyPair and apply custom tags for better resource management:

```ts
const TaggedKeyPair = await AWS.EC2.KeyPair("TaggedKeyPair", {
  KeyName: "MyTaggedKeyPair",
  PublicKeyMaterial: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3... user@hostname",
  Tags: [
    { Key: "Purpose", Value: "testing" },
    { Key: "Owner", Value: "QA" },
    { Key: "Project", Value: "CloudMigration" }
  ]
});
```