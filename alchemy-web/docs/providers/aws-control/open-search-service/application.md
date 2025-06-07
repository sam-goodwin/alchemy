---
title: Managing AWS OpenSearchService Applications with Alchemy
description: Learn how to create, update, and manage AWS OpenSearchService Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS OpenSearchService Applications](https://docs.aws.amazon.com/opensearchservice/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-opensearchservice-application.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const application = await AWS.OpenSearchService.Application("application-example", {
  Name: "application-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a application with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedApplication = await AWS.OpenSearchService.Application("advanced-application", {
  Name: "application-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

