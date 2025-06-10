---
title: Application
description: Learn how to create, update, and manage AWS AppConfig Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS AppConfig Applications](https://docs.aws.amazon.com/appconfig/latest/userguide/) for deploying application configurations in a controlled manner.

## Minimal Example

Create a basic AppConfig application with a name and description.

```ts
import AWS from "alchemy/aws/control";

const appConfigApplication = await AWS.AppConfig.Application("myAppConfigApp", {
  name: "MyApplication",
  description: "This application manages configurations for my service."
});
```

## Advanced Configuration

Configure an AppConfig application with tags for better organization and management.

```ts
const taggedAppConfigApplication = await AWS.AppConfig.Application("taggedAppConfigApp", {
  name: "TaggedApplication",
  description: "This application manages configurations with tags.",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Team", value: "DevOps" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing AppConfig application without failing if it already exists.

```ts
const adoptedAppConfigApplication = await AWS.AppConfig.Application("existingAppConfigApp", {
  name: "ExistingApplication",
  description: "This will adopt an existing application.",
  adopt: true
});
```

## Update Application Description

Update the description of an existing AppConfig application.

```ts
const updatedAppConfigApplication = await AWS.AppConfig.Application("updateAppConfigApp", {
  name: "MyApplication",
  description: "Updated description for my application."
});
```
