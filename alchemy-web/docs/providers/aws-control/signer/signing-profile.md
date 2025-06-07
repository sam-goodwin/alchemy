---
title: Managing AWS Signer SigningProfiles with Alchemy
description: Learn how to create, update, and manage AWS Signer SigningProfiles using Alchemy Cloud Control.
---

# SigningProfile

The SigningProfile resource allows you to manage [AWS Signer SigningProfiles](https://docs.aws.amazon.com/signer/latest/userguide/) for creating and managing code-signing configurations.

## Minimal Example

Create a basic SigningProfile with the required properties and a common optional one.

```ts
import AWS from "alchemy/aws/control";

const BasicSigningProfile = await AWS.Signer.SigningProfile("BasicSigningProfile", {
  PlatformId: "aws-sdk-android",
  SignatureValidityPeriod: {
    Type: "DAYS",
    Value: 30
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Dev" }
  ]
});
```

## Advanced Configuration

Configure a SigningProfile with additional settings for extended validity period.

```ts
const AdvancedSigningProfile = await AWS.Signer.SigningProfile("AdvancedSigningProfile", {
  PlatformId: "aws-sdk-ios",
  SignatureValidityPeriod: {
    Type: "MONTHS",
    Value: 12
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Custom Tags Example

Create a SigningProfile with custom tags to categorize resources effectively.

```ts
const TaggedSigningProfile = await AWS.Signer.SigningProfile("TaggedSigningProfile", {
  PlatformId: "aws-sdk-dotnet",
  SignatureValidityPeriod: {
    Type: "DAYS",
    Value: 90
  },
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Project", Value: "InternalTool" }
  ]
});
```

## Platform-Specific SigningProfile

Configure a SigningProfile for a specific platform with minimal settings.

```ts
const PlatformSpecificSigningProfile = await AWS.Signer.SigningProfile("PlatformSpecificSigningProfile", {
  PlatformId: "aws-sdk-javascript",
  SignatureValidityPeriod: {
    Type: "DAYS",
    Value: 7
  }
});
```

This documentation provides a comprehensive overview of the SigningProfile resource, demonstrating how to create and manage signing profiles using various configurations suitable for different use cases.