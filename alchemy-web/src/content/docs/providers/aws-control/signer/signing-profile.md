---
title: SigningProfile
description: Learn how to create, update, and manage AWS Signer SigningProfiles using Alchemy Cloud Control.
---


The SigningProfile resource allows you to create and manage signing profiles in AWS Signer, which are used to specify the signing configurations for your code and binaries. For more details, refer to the [AWS Signer SigningProfiles documentation](https://docs.aws.amazon.com/signer/latest/userguide/).

## Minimal Example

Create a basic signing profile with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const signingProfile = await AWS.Signer.SigningProfile("mySigningProfile", {
  PlatformId: "aws-eu-west-1-x86_64", // Specify the platform ID for your signing profile
  SignatureValidityPeriod: {
    Type: "DAYS",
    Value: 7 // Validity period of 7 days
  }
});
```

## Advanced Configuration

Configure a signing profile with tags for better resource management.

```ts
const advancedSigningProfile = await AWS.Signer.SigningProfile("advancedSigningProfile", {
  PlatformId: "aws-us-east-1-arm64", // Specify the platform ID for ARM64 architecture
  SignatureValidityPeriod: {
    Type: "DAYS",
    Value: 30 // Validity period of 30 days
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Using Existing Resources

Create a signing profile that adopts an existing resource if it already exists.

```ts
const existingProfile = await AWS.Signer.SigningProfile("existingProfile", {
  PlatformId: "aws-us-west-2-x86_64", // Specify the platform ID for existing signing profile
  adopt: true // Attempt to adopt the existing signing profile
});
```
