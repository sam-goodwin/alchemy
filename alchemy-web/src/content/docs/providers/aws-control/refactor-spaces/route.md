---
title: Route
description: Learn how to create, update, and manage AWS RefactorSpaces Routes using Alchemy Cloud Control.
---


The Route resource lets you manage [AWS RefactorSpaces Routes](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) for directing traffic to various services in your application. This resource allows you to define the environment and application context for your routes.

## Minimal Example

Create a basic route with required properties and a default route configuration.

```ts
import AWS from "alchemy/aws/control";

const basicRoute = await AWS.RefactorSpaces.Route("basicRoute", {
  EnvironmentIdentifier: "env-123456",
  ApplicationIdentifier: "app-abcde",
  ServiceIdentifier: "service-xyz",
  RouteType: "URI_PATH",
  DefaultRoute: {
    Status: "ACTIVE",
    Priority: 1
  }
});
```

## Advanced Configuration

Configure a route with a URI path route specification and additional tags.

```ts
const advancedRoute = await AWS.RefactorSpaces.Route("advancedRoute", {
  EnvironmentIdentifier: "env-123456",
  ApplicationIdentifier: "app-abcde",
  ServiceIdentifier: "service-xyz",
  RouteType: "URI_PATH",
  UriPathRoute: {
    Path: "/api/v1/resource",
    Methods: ["GET", "POST"]
  },
  Tags: [
    { Key: "Project", Value: "RefactorSpaces" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Route with Detailed URI Path

Create a route that specifies a detailed URI path and supports multiple HTTP methods.

```ts
const detailedUriRoute = await AWS.RefactorSpaces.Route("detailedUriRoute", {
  EnvironmentIdentifier: "env-123456",
  ApplicationIdentifier: "app-abcde",
  ServiceIdentifier: "service-xyz",
  RouteType: "URI_PATH",
  UriPathRoute: {
    Path: "/api/v1/users",
    Methods: ["GET", "POST", "DELETE"]
  },
  DefaultRoute: {
    Status: "ACTIVE",
    Priority: 2
  }
});
```

## Route for Specific Service

Define a route that targets a specific service within an application.

```ts
const serviceRoute = await AWS.RefactorSpaces.Route("serviceRoute", {
  EnvironmentIdentifier: "env-123456",
  ApplicationIdentifier: "app-abcde",
  ServiceIdentifier: "service-xyz",
  RouteType: "DEFAULT",
  DefaultRoute: {
    Status: "ACTIVE",
    Priority: 3
  },
  Tags: [
    { Key: "Service", Value: "UserManagement" }
  ]
});
```
