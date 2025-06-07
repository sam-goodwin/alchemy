---
title: Managing AWS RefactorSpaces Routes with Alchemy
description: Learn how to create, update, and manage AWS RefactorSpaces Routes using Alchemy Cloud Control.
---

# Route

The Route resource lets you create and manage [AWS RefactorSpaces Routes](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-refactorspaces-route.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const route = await AWS.RefactorSpaces.Route("route-example", {
  EnvironmentIdentifier: "example-environmentidentifier",
  RouteType: "example-routetype",
  ServiceIdentifier: "example-serviceidentifier",
  ApplicationIdentifier: "example-applicationidentifier",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a route with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedRoute = await AWS.RefactorSpaces.Route("advanced-route", {
  EnvironmentIdentifier: "example-environmentidentifier",
  RouteType: "example-routetype",
  ServiceIdentifier: "example-serviceidentifier",
  ApplicationIdentifier: "example-applicationidentifier",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

