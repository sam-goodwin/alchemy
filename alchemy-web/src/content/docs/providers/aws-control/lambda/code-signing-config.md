---
title: CodeSigningConfig
description: Learn how to create, update, and manage AWS Lambda CodeSigningConfigs using Alchemy Cloud Control.
---


The CodeSigningConfig resource lets you manage [AWS Lambda CodeSigningConfigs](https://docs.aws.amazon.com/lambda/latest/userguide/) for validating the code integrity of your Lambda functions.

## Resource Documentation

The CodeSigningConfig allows you to define a configuration that specifies the allowed publishers of your Lambda code and the policies regarding the code signing. This is essential for maintaining the integrity and security of your serverless applications.

## Minimal Example

Create a basic CodeSigningConfig with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const codeSigningConfig = await AWS.Lambda.CodeSigningConfig("basicCodeSigningConfig", {
  Description: "Basic Code Signing Configuration for my Lambda functions",
  AllowedPublishers: {
    SigningProfileVersionArns: [
      "arn:aws:signer:us-west-2:123456789012:signing-profiles/my-signing-profile"
    ]
  }
});
```

## Advanced Configuration

Configure a CodeSigningConfig with custom signing policies and tags for management:

```ts
const advancedCodeSigningConfig = await AWS.Lambda.CodeSigningConfig("advancedCodeSigningConfig", {
  Description: "Advanced Code Signing Configuration with policies",
  AllowedPublishers: {
    SigningProfileVersionArns: [
      "arn:aws:signer:us-west-2:123456789012:signing-profiles/my-signing-profile"
    ]
  },
  CodeSigningPolicies: {
    UntrustedArtifactOnDeployment: "Enforce"
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "LambdaSecurity" }
  ]
});
```

## Example with Custom Policies

Define a CodeSigningConfig that includes specific code signing policies for untrusted artifacts:

```ts
const policyCodeSigningConfig = await AWS.Lambda.CodeSigningConfig("policyCodeSigningConfig", {
  Description: "Code Signing Config with strict policies",
  AllowedPublishers: {
    SigningProfileVersionArns: [
      "arn:aws:signer:us-west-2:123456789012:signing-profiles/my-other-signing-profile"
    ]
  },
  CodeSigningPolicies: {
    UntrustedArtifactOnDeployment: "Warn",
    UntrustedArtifactOnUpdate: "Enforce"
  }
});
```

This example demonstrates how to set up a CodeSigningConfig that warns when untrusted artifacts are deployed but enforces policies on updates, providing a balance between security and flexibility.
