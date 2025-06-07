---
title: Managing AWS WorkSpaces ConnectionAliases with Alchemy
description: Learn how to create, update, and manage AWS WorkSpaces ConnectionAliases using Alchemy Cloud Control.
---

# ConnectionAlias

The ConnectionAlias resource allows you to manage [AWS WorkSpaces ConnectionAliases](https://docs.aws.amazon.com/workspaces/latest/userguide/) for your WorkSpaces environment, enabling you to seamlessly connect to your WorkSpaces.

## Minimal Example

Create a basic ConnectionAlias with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicConnectionAlias = await AWS.WorkSpaces.ConnectionAlias("BasicConnectionAlias", {
  ConnectionString: "ws://example-workspace-connection.com",
  Tags: [{ Key: "Environment", Value: "development" }]
});
```

## Advanced Configuration

Configure a ConnectionAlias with additional properties, including tags for better organization.

```ts
const advancedConnectionAlias = await AWS.WorkSpaces.ConnectionAlias("AdvancedConnectionAlias", {
  ConnectionString: "ws://secure-workspace-connection.com",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Engineering" }
  ],
  adopt: true // Adopts existing resource if it already exists
});
```

## Existing Resource Adoption

This example demonstrates how to adopt an existing ConnectionAlias without creating a new one.

```ts
const existingConnectionAlias = await AWS.WorkSpaces.ConnectionAlias("ExistingConnectionAlias", {
  ConnectionString: "ws://existing-workspace-connection.com",
  adopt: true // This will adopt the existing resource
});
```

## Tagging for Better Management

This example shows how to create a ConnectionAlias with multiple tags for enhanced resource management.

```ts
const taggedConnectionAlias = await AWS.WorkSpaces.ConnectionAlias("TaggedConnectionAlias", {
  ConnectionString: "ws://tagged-workspace-connection.com",
  Tags: [
    { Key: "Project", Value: "ProjectA" },
    { Key: "Owner", Value: "JohnDoe" },
    { Key: "Status", Value: "active" }
  ]
});
```