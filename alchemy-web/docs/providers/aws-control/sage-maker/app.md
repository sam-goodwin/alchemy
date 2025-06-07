---
title: Managing AWS SageMaker Apps with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Apps using Alchemy Cloud Control.
---

# App

The App resource lets you create and manage [AWS SageMaker Apps](https://docs.aws.amazon.com/sagemaker/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sagemaker-app.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const app = await AWS.SageMaker.App("app-example", {
  DomainId: "example-domainid",
  AppType: "example-apptype",
  UserProfileName: "app-userprofile",
  AppName: "app-app",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a app with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApp = await AWS.SageMaker.App("advanced-app", {
  DomainId: "example-domainid",
  AppType: "example-apptype",
  UserProfileName: "app-userprofile",
  AppName: "app-app",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

