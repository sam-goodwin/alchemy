---
title: Managing AWS AppConfig Applications with Alchemy
description: Learn how to create, update, and manage AWS AppConfig Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS AppConfig Applications](https://docs.aws.amazon.com/appconfig/latest/userguide/) for dynamic configuration management in your applications.

## Minimal Example

This example demonstrates how to create a basic AWS AppConfig Application with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const MyAppConfigApplication = await AWS.AppConfig.Application("MyApplication", {
  Name: "MyApplication",
  Description: "This application manages configurations for my microservices.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "DevTeam" }
  ]
});
```

## Advanced Configuration

In this example, we create an application with additional tags for better resource management.

```ts
const AdvancedAppConfigApplication = await AWS.AppConfig.Application("AdvancedApplication", {
  Name: "AdvancedApplication",
  Description: "This application handles multiple configurations for various services.",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "DevOps" },
    { Key: "Project", Value: "ProjectX" }
  ],
  adopt: true // This allows adopting an existing resource if it already exists
});
```

## Application Creation with Only Required Properties

Here’s how to create an application using only the required properties.

```ts
const BasicAppConfigApplication = await AWS.AppConfig.Application("BasicApplication", {
  Name: "BasicApplication"
});
```

## Application with Descriptive Tagging

This example shows how to create an application with descriptive tagging for better identification.

```ts
const TaggedAppConfigApplication = await AWS.AppConfig.Application("TaggedApplication", {
  Name: "TaggedApplication",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Service", Value: "API" }
  ]
});
```