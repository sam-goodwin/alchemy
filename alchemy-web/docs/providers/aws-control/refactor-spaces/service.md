---
title: Managing AWS RefactorSpaces Services with Alchemy
description: Learn how to create, update, and manage AWS RefactorSpaces Services using Alchemy Cloud Control.
---

# Service

The Service resource lets you create and manage [AWS RefactorSpaces Services](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-refactorspaces-service.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const service = await AWS.RefactorSpaces.Service("service-example", {
  EnvironmentIdentifier: "example-environmentidentifier",
  EndpointType: "example-endpointtype",
  ApplicationIdentifier: "example-applicationidentifier",
  Name: "service-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A service resource managed by Alchemy",
});
```

## Advanced Configuration

Create a service with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedService = await AWS.RefactorSpaces.Service("advanced-service", {
  EnvironmentIdentifier: "example-environmentidentifier",
  EndpointType: "example-endpointtype",
  ApplicationIdentifier: "example-applicationidentifier",
  Name: "service-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A service resource managed by Alchemy",
});
```

