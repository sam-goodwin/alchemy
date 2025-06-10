---
title: Webhook
description: Learn how to create, update, and manage AWS CodePipeline Webhooks using Alchemy Cloud Control.
---


The Webhook resource allows you to create and manage [AWS CodePipeline Webhooks](https://docs.aws.amazon.com/codepipeline/latest/userguide/) which enable you to trigger a pipeline execution in response to changes in a source repository.

## Minimal Example

Create a basic webhook that triggers a pipeline on a push event to a GitHub repository.

```ts
import AWS from "alchemy/aws/control";

const webhook = await AWS.CodePipeline.Webhook("githubWebhook", {
  AuthenticationConfiguration: {
    AllowedIPRange: "192.168.1.0/24",
    SecretToken: "mySecretToken"
  },
  Filters: [
    {
      JsonPath: "$.ref",
      MatchEquals: "refs/heads/main"
    }
  ],
  Authentication: "GITHUB_HMAC",
  TargetPipeline: "myPipeline",
  TargetAction: "source",
  TargetPipelineVersion: 1,
  RegisterWithThirdParty: true
});
```

## Advanced Configuration

Configure a webhook with multiple filters and advanced authentication settings.

```ts
const advancedWebhook = await AWS.CodePipeline.Webhook("advancedWebhook", {
  AuthenticationConfiguration: {
    AllowedIPRange: "203.0.113.0/24",
    SecretToken: "myAdvancedSecretToken"
  },
  Filters: [
    {
      JsonPath: "$.ref",
      MatchEquals: "refs/heads/release"
    },
    {
      JsonPath: "$.repository.name",
      MatchEquals: "my-repo"
    }
  ],
  Authentication: "GITHUB_HMAC",
  TargetPipeline: "releasePipeline",
  TargetAction: "build",
  TargetPipelineVersion: 2,
  RegisterWithThirdParty: true
});
```

## Specific Use Case: Trigger on Pull Requests

Set up a webhook specifically to trigger the pipeline on pull request events.

```ts
const pullRequestWebhook = await AWS.CodePipeline.Webhook("pullRequestWebhook", {
  AuthenticationConfiguration: {
    AllowedIPRange: "198.51.100.0/24",
    SecretToken: "pullRequestSecret"
  },
  Filters: [
    {
      JsonPath: "$.action",
      MatchEquals: "opened"
    },
    {
      JsonPath: "$.pull_request.base.ref",
      MatchEquals: "main"
    }
  ],
  Authentication: "GITHUB_HMAC",
  TargetPipeline: "pullRequestPipeline",
  TargetAction: "source",
  TargetPipelineVersion: 1,
  RegisterWithThirdParty: true
});
```
