---
title: Managing AWS Amplify Apps with Alchemy
description: Learn how to create, update, and manage AWS Amplify Apps using Alchemy Cloud Control.
---

# App

The App resource lets you create and manage [AWS Amplify Apps](https://docs.aws.amazon.com/amplify/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplify-app.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const app = await AWS.Amplify.App("app-example", {
  Name: "app-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A app resource managed by Alchemy",
});
```

## Advanced Configuration

Create a app with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApp = await AWS.Amplify.App("advanced-app", {
  Name: "app-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A app resource managed by Alchemy",
});
```

