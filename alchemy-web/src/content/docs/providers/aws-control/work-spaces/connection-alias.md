---
title: ConnectionAlias
description: Learn how to create, update, and manage AWS WorkSpaces ConnectionAliass using Alchemy Cloud Control.
---


The ConnectionAlias resource allows you to manage [AWS WorkSpaces ConnectionAliases](https://docs.aws.amazon.com/workspaces/latest/userguide/) which are used for associating a connection string with your WorkSpaces environment.

## Minimal Example

Create a basic ConnectionAlias with the required connection string.

```ts
import AWS from "alchemy/aws/control";

const basicConnectionAlias = await AWS.WorkSpaces.ConnectionAlias("basic-connection-alias", {
  ConnectionString: "ws-1234567890abcdef",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure a ConnectionAlias with adoption of existing resources.

```ts
const advancedConnectionAlias = await AWS.WorkSpaces.ConnectionAlias("advanced-connection-alias", {
  ConnectionString: "ws-abcdef1234567890",
  Tags: [
    { Key: "Project", Value: "ProjectX" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using ConnectionAlias in WorkSpaces Configuration

Create a WorkSpaces configuration that utilizes the ConnectionAlias.

```ts
const workSpacesConfig = await AWS.WorkSpaces.ConnectionAlias("workspaces-config", {
  ConnectionString: "ws-0987654321fedcba",
  Tags: [
    { Key: "UseCase", Value: "Testing" },
    { Key: "Owner", Value: "DevTeam" }
  ],
  adopt: false // Create new resource, do not adopt
});
```
