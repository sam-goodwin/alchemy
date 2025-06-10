---
title: App
description: Learn how to create, update, and manage AWS ResilienceHub Apps using Alchemy Cloud Control.
---


The App resource lets you manage [AWS ResilienceHub Apps](https://docs.aws.amazon.com/resiliencehub/latest/userguide/) for assessing and improving the resiliency of your applications.

## Minimal Example

Create a basic ResilienceHub app with essential properties.

```ts
import AWS from "alchemy/aws/control";

const resilienceHubApp = await AWS.ResilienceHub.App("basicApp", {
  name: "MyResilienceApp",
  appTemplateBody: JSON.stringify({
    version: "1.0",
    resources: []
  }),
  resourceMappings: [
    {
      resourceName: "MyEC2Instance",
      resourceType: "AWS::EC2::Instance"
    }
  ],
  description: "This is a minimal ResilienceHub app."
});
```

## Advanced Configuration

Configure a ResilienceHub app with an assessment schedule and event subscriptions.

```ts
const advancedResilienceHubApp = await AWS.ResilienceHub.App("advancedApp", {
  name: "AdvancedResilienceApp",
  appTemplateBody: JSON.stringify({
    version: "1.0",
    resources: []
  }),
  resourceMappings: [
    {
      resourceName: "MyDynamoDBTable",
      resourceType: "AWS::DynamoDB::Table"
    }
  ],
  appAssessmentSchedule: "rate(1 day)",
  eventSubscriptions: [
    {
      event: "Creation",
      target: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
    }
  ],
  tags: {
    Environment: "Production",
    Team: "DevOps"
  }
});
```

## Adoption of Existing Resources

Create a ResilienceHub app that adopts existing resources without failure if they already exist.

```ts
const adoptExistingApp = await AWS.ResilienceHub.App("adoptApp", {
  name: "AdoptExistingApp",
  appTemplateBody: JSON.stringify({
    version: "1.0",
    resources: []
  }),
  resourceMappings: [
    {
      resourceName: "MyS3Bucket",
      resourceType: "AWS::S3::Bucket"
    }
  ],
  adopt: true // Adopt existing resources if they exist
});
```

## Resiliency Policy Association

Set a Resiliency Policy ARN while creating the app to ensure compliance with defined policies.

```ts
const policyAssociatedApp = await AWS.ResilienceHub.App("policyApp", {
  name: "PolicyAssociatedApp",
  appTemplateBody: JSON.stringify({
    version: "1.0",
    resources: []
  }),
  resourceMappings: [
    {
      resourceName: "MyLambdaFunction",
      resourceType: "AWS::Lambda::Function"
    }
  ],
  resiliencyPolicyArn: "arn:aws:resiliencehub:us-west-2:123456789012:policy/MyResiliencyPolicy"
});
```
