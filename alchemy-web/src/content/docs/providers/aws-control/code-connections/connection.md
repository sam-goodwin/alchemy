---
title: Connection
description: Learn how to create, update, and manage AWS CodeConnections Connections using Alchemy Cloud Control.
---


The Connection resource allows you to manage [AWS CodeConnections Connections](https://docs.aws.amazon.com/codeconnections/latest/userguide/) that facilitate integrations between AWS services and external tools.

## Minimal Example

Create a basic connection with the required properties and an optional host ARN.

```ts
import AWS from "alchemy/aws/control";

const basicConnection = await AWS.CodeConnections.Connection("myBasicConnection", {
  ConnectionName: "MyBasicConnection",
  HostArn: "arn:aws:codeconnections:us-east-1:123456789012:host/my-host"
});
```

## Advanced Configuration

Configure a connection with additional properties like provider type and tags.

```ts
const advancedConnection = await AWS.CodeConnections.Connection("myAdvancedConnection", {
  ConnectionName: "MyAdvancedConnection",
  HostArn: "arn:aws:codeconnections:us-east-1:123456789012:host/my-host",
  ProviderType: "GitHub",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resources

Create a connection that adopts an existing resource if it already exists.

```ts
const adoptConnection = await AWS.CodeConnections.Connection("myAdoptedConnection", {
  ConnectionName: "MyAdoptedConnection",
  HostArn: "arn:aws:codeconnections:us-east-1:123456789012:host/my-host",
  ProviderType: "GitLab",
  adopt: true
});
```

## Updating a Connection

Update an existing connection by specifying its name and new properties.

```ts
const updatedConnection = await AWS.CodeConnections.Connection("myUpdatedConnection", {
  ConnectionName: "MyUpdatedConnection",
  HostArn: "arn:aws:codeconnections:us-east-1:123456789012:host/my-updated-host",
  ProviderType: "Bitbucket",
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```
