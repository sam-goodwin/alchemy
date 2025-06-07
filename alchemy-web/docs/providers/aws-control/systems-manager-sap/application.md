---
title: Managing AWS SystemsManagerSAP Applications with Alchemy
description: Learn how to create, update, and manage AWS SystemsManagerSAP Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS SystemsManagerSAP Applications](https://docs.aws.amazon.com/systemsmanagersap/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-systemsmanagersap-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.SystemsManagerSAP.Application("application-example", {
  ApplicationType: "example-applicationtype",
  ApplicationId: "example-applicationid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.SystemsManagerSAP.Application("advanced-application", {
  ApplicationType: "example-applicationtype",
  ApplicationId: "example-applicationid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

