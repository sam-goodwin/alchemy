---
title: Api
description: Learn how to create, update, and manage AWS AppSync Apis using Alchemy Cloud Control.
---


The Api resource allows you to manage [AWS AppSync Apis](https://docs.aws.amazon.com/appsync/latest/userguide/) for building scalable GraphQL applications. With AppSync, you can easily connect your applications to data sources, manage real-time subscriptions, and handle offline scenarios.

## Minimal Example

Create a basic AppSync API with a name and owner contact.

```ts
import AWS from "alchemy/aws/control";

const basicApi = await AWS.AppSync.Api("basicApi", {
  name: "MyAppSyncAPI",
  ownerContact: "admin@example.com"
});
```

## Advanced Configuration

Configure an AppSync API with event configurations and tags for better management and monitoring.

```ts
const advancedApi = await AWS.AppSync.Api("advancedApi", {
  name: "MyAdvancedAppSyncAPI",
  ownerContact: "support@example.com",
  eventConfig: {
    // Configure event settings here
    // For example, you can set up logging or monitoring configurations
  },
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Adoption of Existing Resources

If you want to adopt an existing AppSync API instead of failing when it already exists, you can set the `adopt` property.

```ts
const adoptedApi = await AWS.AppSync.Api("adoptedApi", {
  name: "ExistingAppSyncAPI",
  adopt: true // This will adopt the existing resource
});
```
