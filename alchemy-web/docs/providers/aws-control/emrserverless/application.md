---
title: Managing AWS EMRServerless Applications with Alchemy
description: Learn how to create, update, and manage AWS EMRServerless Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS EMRServerless Applications](https://docs.aws.amazon.com/emrserverless/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-emrserverless-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.EMRServerless.Application("application-example", {
  Type: "example-type",
  ReleaseLabel: "example-releaselabel",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.EMRServerless.Application("advanced-application", {
  Type: "example-type",
  ReleaseLabel: "example-releaselabel",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

