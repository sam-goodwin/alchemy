---
title: Managing AWS CodePipeline Webhooks with Alchemy
description: Learn how to create, update, and manage AWS CodePipeline Webhooks using Alchemy Cloud Control.
---

# Webhook

The Webhook resource lets you manage [AWS CodePipeline Webhooks](https://docs.aws.amazon.com/codepipeline/latest/userguide/) that trigger pipelines on events in a source repository.

## Minimal Example

Create a basic webhook with required properties and a common optional name.

```ts
import AWS from "alchemy/aws/control";

const BasicWebhook = await AWS.CodePipeline.Webhook("BasicWebhook", {
  AuthenticationConfiguration: {
    AllowedIPRange: "203.0.113.0/24",
    SecretToken: "mySecretToken123"
  },
  Filters: [
    {
      JsonPath: "$.ref",
      MatchEquals: "refs/heads/main"
    }
  ],
  Authentication: "GITHUB_HMAC",
  TargetPipeline: "MyPipeline",
  TargetAction: "Source",
  TargetPipelineVersion: 1,
  Name: "MyWebhook"
});
```

## Advanced Configuration

Configure a webhook with additional options such as registering it with a third party.

```ts
const AdvancedWebhook = await AWS.CodePipeline.Webhook("AdvancedWebhook", {
  AuthenticationConfiguration: {
    AllowedIPRange: "192.0.2.0/24",
    SecretToken: "anotherSecretToken456"
  },
  Filters: [
    {
      JsonPath: "$.action",
      MatchEquals: "created"
    }
  ],
  Authentication: "GITHUB_HMAC",
  TargetPipeline: "AdvancedPipeline",
  TargetAction: "Source",
  TargetPipelineVersion: 2,
  RegisterWithThirdParty: true,
  Name: "AdvancedWebhookWithRegistration"
});
```

## Additional Use Case: Multiple Filters

Create a webhook that listens for multiple types of events by specifying multiple filters.

```ts
const MultiFilterWebhook = await AWS.CodePipeline.Webhook("MultiFilterWebhook", {
  AuthenticationConfiguration: {
    AllowedIPRange: "198.51.100.0/24",
    SecretToken: "multiFilterSecret789"
  },
  Filters: [
    {
      JsonPath: "$.ref",
      MatchEquals: "refs/heads/main"
    },
    {
      JsonPath: "$.action",
      MatchEquals: "pushed"
    }
  ],
  Authentication: "GITHUB_HMAC",
  TargetPipeline: "MultiFilterPipeline",
  TargetAction: "Source",
  TargetPipelineVersion: 1,
  Name: "WebhookWithMultipleFilters"
});
```

## Additional Use Case: Custom Authentication

Demonstrate how to set up a webhook with a custom authentication configuration.

```ts
const CustomAuthWebhook = await AWS.CodePipeline.Webhook("CustomAuthWebhook", {
  AuthenticationConfiguration: {
    AllowedIPRange: "172.16.0.0/12",
    SecretToken: "customAuthToken321"
  },
  Filters: [
    {
      JsonPath: "$.ref",
      MatchEquals: "refs/tags/v1.0"
    }
  ],
  Authentication: "GITHUB_HMAC",
  TargetPipeline: "CustomAuthPipeline",
  TargetAction: "Source",
  TargetPipelineVersion: 3,
  Name: "WebhookWithCustomAuth"
});
```