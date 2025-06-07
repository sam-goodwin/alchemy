---
title: Managing AWS QBusiness Applications with Alchemy
description: Learn how to create, update, and manage AWS QBusiness Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS QBusiness Applications](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.QBusiness.Application("application-example", {
  DisplayName: "application-display",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A application resource managed by Alchemy",
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.QBusiness.Application("advanced-application", {
  DisplayName: "application-display",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A application resource managed by Alchemy",
});
```

