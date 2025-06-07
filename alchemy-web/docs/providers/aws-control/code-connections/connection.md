---
title: Managing AWS CodeConnections Connections with Alchemy
description: Learn how to create, update, and manage AWS CodeConnections Connections using Alchemy Cloud Control.
---

# Connection

The Connection resource lets you manage [AWS CodeConnections Connections](https://docs.aws.amazon.com/codeconnections/latest/userguide/) for integrating with various source control providers.

## Minimal Example

Create a basic connection with a name and optional tags.

```ts
import AWS from "alchemy/aws/control";

const BasicConnection = await AWS.CodeConnections.Connection("BasicConnection", {
  ConnectionName: "MyFirstConnection",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure a connection with additional properties like HostArn and ProviderType.

```ts
const AdvancedConnection = await AWS.CodeConnections.Connection("AdvancedConnection", {
  ConnectionName: "MyAdvancedConnection",
  HostArn: "arn:aws:codestar-connections:us-east-1:123456789012:host/abcde12345",
  ProviderType: "GitHub",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using Existing Resources

Adopt an existing connection resource without failing if it already exists.

```ts
const ExistingConnection = await AWS.CodeConnections.Connection("ExistingConnection", {
  ConnectionName: "MyExistingConnection",
  adopt: true
});
```