---
title: ASK
description: Learn how to create, update, and manage AWS Alexa ASKs using Alchemy Cloud Control.
---


The ASK (Alexa Skill Kit) resource lets you create and manage [AWS Alexa ASKs](https://docs.aws.amazon.com/alexa/latest/userguide/) for developing voice-driven capabilities.

## Minimal Example

Create a basic Alexa skill with required properties and adopt existing resources if necessary.

```ts
import AWS from "alchemy/aws/control";

const alexaSkill = await AWS.Alexa.ASK("basic-alexa-skill", {
  AuthenticationConfiguration: {
    // Authentication settings for the skill
    ClientId: "your-client-id",
    ClientSecret: "your-client-secret",
    RefreshToken: "your-refresh-token"
  },
  VendorId: "your-vendor-id",
  SkillPackage: {
    // Skill package settings for the skill
    S3Bucket: "your-s3-bucket",
    S3Key: "path/to/your/skill-package.zip"
  },
  adopt: true // Adopt existing resource instead of failing
});
```

## Advanced Configuration

Configure an Alexa skill with more complex settings, such as additional authentication configurations.

```ts
const advancedAlexaSkill = await AWS.Alexa.ASK("advanced-alexa-skill", {
  AuthenticationConfiguration: {
    ClientId: "your-client-id",
    ClientSecret: "your-client-secret",
    RefreshToken: "your-refresh-token",
    Permissions: [
      {
        Name: "alexa::ask:manage:skills"
      }
    ]
  },
  VendorId: "your-vendor-id",
  SkillPackage: {
    S3Bucket: "your-s3-bucket",
    S3Key: "path/to/your/skill-package.zip",
    SkillManifest: {
      // Additional manifest settings
      SkillId: "your-skill-id",
      Name: "Advanced Skill",
      Description: "An advanced Alexa skill using Alchemy.",
      ExamplePhrases: ["Open advanced skill", "Start advanced skill"]
    }
  }
});
```

## Skill Update Example

Update an existing Alexa skill's package by referencing the Vendor ID and Skill ID.

```ts
const updateAlexaSkill = await AWS.Alexa.ASK("update-alexa-skill", {
  AuthenticationConfiguration: {
    ClientId: "your-client-id",
    ClientSecret: "your-client-secret",
    RefreshToken: "your-refresh-token"
  },
  VendorId: "your-vendor-id",
  SkillPackage: {
    S3Bucket: "your-s3-bucket",
    S3Key: "path/to/your/updated-skill-package.zip"
  }
});
```

## Deployment and Testing

Deploy an Alexa skill and prepare it for testing with required configurations.

```ts
const testAlexaSkill = await AWS.Alexa.ASK("test-alexa-skill", {
  AuthenticationConfiguration: {
    ClientId: "your-client-id",
    ClientSecret: "your-client-secret",
    RefreshToken: "your-refresh-token"
  },
  VendorId: "your-vendor-id",
  SkillPackage: {
    S3Bucket: "your-s3-bucket",
    S3Key: "path/to/your/test-skill-package.zip"
  },
  adopt: true // Adopt existing resource to facilitate testing
});
```
