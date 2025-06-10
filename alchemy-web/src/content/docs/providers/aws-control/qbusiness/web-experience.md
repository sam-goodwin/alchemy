---
title: WebExperience
description: Learn how to create, update, and manage AWS QBusiness WebExperiences using Alchemy Cloud Control.
---


The WebExperience resource allows you to create and manage [AWS QBusiness WebExperiences](https://docs.aws.amazon.com/qbusiness/latest/userguide/) for building interactive web applications. This resource provides configuration options to tailor the user experience.

## Minimal Example

Create a basic WebExperience with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicWebExperience = await AWS.QBusiness.WebExperience("basicWebExperience", {
  applicationId: "app-123456",
  title: "Basic Web Experience",
  origins: ["https://example.com"],
  welcomeMessage: "Welcome to our basic web experience!"
});
```

## Advanced Configuration

Configure a WebExperience with advanced settings including customization and identity provider configuration.

```ts
const advancedWebExperience = await AWS.QBusiness.WebExperience("advancedWebExperience", {
  applicationId: "app-654321",
  title: "Advanced Web Experience",
  origins: ["https://example.com"],
  customizationConfiguration: {
    themeColor: "#ff5733",
    logoUrl: "https://example.com/logo.png"
  },
  identityProviderConfiguration: {
    provider: "Cognito",
    userPoolId: "us-east-1_ABCDEFG",
    appClientId: "abcdefgh12345678"
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "WebApp" }
  ]
});
```

## Sample Prompts Control Mode

Customize the sample prompts control mode for a specific WebExperience.

```ts
const samplePromptsWebExperience = await AWS.QBusiness.WebExperience("samplePromptsWebExperience", {
  applicationId: "app-789012",
  title: "Sample Prompts Experience",
  samplePromptsControlMode: "active",
  origins: ["https://example.com"],
  welcomeMessage: "Explore our features with guided prompts!"
});
```

## Browser Extension Configuration

Set up a WebExperience with browser extension configuration.

```ts
const browserExtensionWebExperience = await AWS.QBusiness.WebExperience("browserExtensionWebExperience", {
  applicationId: "app-345678",
  title: "Browser Extension Experience",
  origins: ["https://example.com"],
  browserExtensionConfiguration: {
    extensionId: "com.example.extension",
    permissions: ["tabs", "storage"]
  },
  roleArn: "arn:aws:iam::123456789012:role/WebExperienceRole"
});
```
