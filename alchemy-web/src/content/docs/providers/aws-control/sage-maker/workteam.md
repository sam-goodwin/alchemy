---
title: Workteam
description: Learn how to create, update, and manage AWS SageMaker Workteams using Alchemy Cloud Control.
---


The Workteam resource allows you to manage [AWS SageMaker Workteams](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for building and training machine learning models with human labeling tasks.

## Minimal Example

Create a basic workteam with a description and workforce name.

```ts
import AWS from "alchemy/aws/control";

const basicWorkteam = await AWS.SageMaker.Workteam("basic-workteam", {
  Description: "A basic workteam for labeling tasks",
  WorkforceName: "default-workforce",
  WorkteamName: "basic-workteam"
});
```

## Advanced Configuration

Configure a workteam with member definitions and notification settings.

```ts
const advancedWorkteam = await AWS.SageMaker.Workteam("advanced-workteam", {
  Description: "An advanced workteam with member definitions",
  WorkforceName: "default-workforce",
  WorkteamName: "advanced-workteam",
  MemberDefinitions: [
    {
      CognitoMemberDefinition: {
        CognitoClientId: "your-cognito-client-id",
        CognitoUserPool: "your-cognito-user-pool-id"
      }
    },
    {
      OidcMemberDefinition: {
        OidcClientId: "your-oidc-client-id",
        OidcProvider: "https://your-oidc-provider.com"
      }
    }
  ],
  NotificationConfiguration: {
    NotificationTopicArn: "arn:aws:sns:us-east-1:123456789012:your-topic",
    NotificationStatus: "Enabled"
  },
  Tags: [
    {
      Key: "Project",
      Value: "Machine Learning"
    },
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Adding Member Definitions

Demonstrate how to add multiple member definitions to a workteam.

```ts
const multiMemberWorkteam = await AWS.SageMaker.Workteam("multi-member-workteam", {
  Description: "Workteam with multiple member definitions",
  WorkforceName: "default-workforce",
  WorkteamName: "multi-member-workteam",
  MemberDefinitions: [
    {
      CognitoMemberDefinition: {
        CognitoClientId: "your-first-cognito-client-id",
        CognitoUserPool: "your-first-cognito-user-pool-id"
      }
    },
    {
      OidcMemberDefinition: {
        OidcClientId: "your-second-oidc-client-id",
        OidcProvider: "https://your-second-oidc-provider.com"
      }
    }
  ]
});
```

## Tagging Workteams

Show how to create a workteam with specific tags for resource management.

```ts
const taggedWorkteam = await AWS.SageMaker.Workteam("tagged-workteam", {
  Description: "Workteam with specific tags for organization",
  WorkforceName: "default-workforce",
  WorkteamName: "tagged-workteam",
  Tags: [
    {
      Key: "Department",
      Value: "Data Science"
    },
    {
      Key: "CostCenter",
      Value: "123456"
    }
  ]
});
```
