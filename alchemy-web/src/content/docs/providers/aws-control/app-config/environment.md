---
title: Environment
description: Learn how to create, update, and manage AWS AppConfig Environments using Alchemy Cloud Control.
---


The Environment resource allows you to manage [AWS AppConfig Environments](https://docs.aws.amazon.com/appconfig/latest/userguide/) within your applications. An environment is a set of configurations that can be deployed to various application instances.

## Minimal Example

Create a basic AppConfig Environment with required properties and a common optional property for description:

```ts
import AWS from "alchemy/aws/control";

const appConfigEnvironment = await AWS.AppConfig.Environment("myAppConfigEnv", {
  ApplicationId: "myApplicationId",
  Name: "Production",
  Description: "Production environment for the main application"
});
```

## Advanced Configuration

Configure an AppConfig Environment with monitoring and deletion protection settings:

```ts
const monitoredEnvironment = await AWS.AppConfig.Environment("monitoredEnv", {
  ApplicationId: "myApplicationId",
  Name: "Staging",
  Description: "Staging environment with monitoring",
  Monitors: [
    {
      AlarmArn: "arn:aws:cloudwatch:us-west-2:123456789012:alarm:myAlarm",
      AlarmRoleArn: "arn:aws:iam::123456789012:role/myRole"
    }
  ],
  DeletionProtectionCheck: "ENABLED"
});
```

## Using Tags for Organization

Create an AppConfig Environment with tags for better organization and management:

```ts
const taggedEnvironment = await AWS.AppConfig.Environment("taggedEnv", {
  ApplicationId: "myApplicationId",
  Name: "Development",
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    },
    {
      Key: "Team",
      Value: "DevOps"
    }
  ]
});
```

## Adoption of Existing Resources

Adopt an existing AppConfig Environment instead of failing if it already exists:

```ts
const existingEnvironment = await AWS.AppConfig.Environment("existingEnv", {
  ApplicationId: "myApplicationId",
  Name: "ExistingEnvironment",
  adopt: true
});
```
