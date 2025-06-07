---
title: Managing AWS Lambda CodeSigningConfigs with Alchemy
description: Learn how to create, update, and manage AWS Lambda CodeSigningConfigs using Alchemy Cloud Control.
---

# CodeSigningConfig

The CodeSigningConfig resource lets you manage [AWS Lambda CodeSigningConfigs](https://docs.aws.amazon.com/lambda/latest/userguide/) for ensuring the integrity and authenticity of your Lambda function code. Code signing helps protect your Lambda functions from malicious code by verifying the identity of the publishers.

## Minimal Example

Create a basic CodeSigningConfig with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicCodeSigningConfig = await AWS.Lambda.CodeSigningConfig("BasicCodeSigningConfig", {
  Description: "Basic Code Signing Configuration",
  AllowedPublishers: {
    SigningProfileVersionArns: [
      "arn:aws:signer:us-east-1:123456789012:signing-profile/my-signing-profile"
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Define a CodeSigningConfig with additional code signing policies to enforce stricter security.

```ts
const AdvancedCodeSigningConfig = await AWS.Lambda.CodeSigningConfig("AdvancedCodeSigningConfig", {
  Description: "Advanced Code Signing Configuration with Policies",
  AllowedPublishers: {
    SigningProfileVersionArns: [
      "arn:aws:signer:us-east-1:123456789012:signing-profile/my-signing-profile"
    ]
  },
  CodeSigningPolicies: {
    UntrustedArtifactOnDeployment: "Enforce"
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Using Multiple Signing Profiles

Create a CodeSigningConfig that allows multiple signing profiles for flexibility in code signing.

```ts
const MultiProfileCodeSigningConfig = await AWS.Lambda.CodeSigningConfig("MultiProfileCodeSigningConfig", {
  Description: "Code Signing Configuration with Multiple Signing Profiles",
  AllowedPublishers: {
    SigningProfileVersionArns: [
      "arn:aws:signer:us-east-1:123456789012:signing-profile/my-signing-profile-1",
      "arn:aws:signer:us-east-1:123456789012:signing-profile/my-signing-profile-2"
    ]
  },
  CodeSigningPolicies: {
    UntrustedArtifactOnDeployment: "Warn"
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```