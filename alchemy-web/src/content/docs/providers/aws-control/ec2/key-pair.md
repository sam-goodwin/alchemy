---
title: KeyPair
description: Learn how to create, update, and manage AWS EC2 KeyPairs using Alchemy Cloud Control.
---


The KeyPair resource lets you manage [AWS EC2 KeyPairs](https://docs.aws.amazon.com/ec2/latest/userguide/) used for secure access to your EC2 instances.

## Minimal Example

Create a basic EC2 KeyPair with a specified name and default options.

```ts
import AWS from "alchemy/aws/control";

const basicKeyPair = await AWS.EC2.KeyPair("myKeyPair", {
  KeyName: "my-key-pair",
  KeyType: "rsa" // Optional: Specifies the type of key
});
```

## Advanced Configuration

Create an EC2 KeyPair with a public key material to import an existing key.

```ts
const importedKeyPair = await AWS.EC2.KeyPair("importedKeyPair", {
  KeyName: "imported-key-pair",
  PublicKeyMaterial: "ssh-rsa AAAAB3...your-public-key..." // Replace with your actual public key
});
```

## Using Tags for Resource Management

Create a KeyPair and apply tags for better resource management.

```ts
const taggedKeyPair = await AWS.EC2.KeyPair("taggedKeyPair", {
  KeyName: "tagged-key-pair",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Adopting an Existing KeyPair

If you want to adopt an existing EC2 KeyPair without failing if it already exists, set the adopt property to true.

```ts
const adoptedKeyPair = await AWS.EC2.KeyPair("adoptedKeyPair", {
  KeyName: "existing-key-pair",
  adopt: true // Set to true to adopt an existing resource
});
```
