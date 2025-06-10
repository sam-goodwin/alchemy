---
title: Connection
description: Learn how to create, update, and manage AWS CodeStarConnections Connections using Alchemy Cloud Control.
---


The Connection resource lets you manage [AWS CodeStarConnections Connections](https://docs.aws.amazon.com/codestarconnections/latest/userguide/) for integrating third-party source control providers with AWS CodeStar.

## Minimal Example

Create a basic connection with a name and provider type.

```ts
import AWS from "alchemy/aws/control";

const basicConnection = await AWS.CodeStarConnections.Connection("basic-connection", {
  ConnectionName: "MyGitHubConnection",
  ProviderType: "GitHub"
});
```

## Advanced Configuration

Configure a connection with additional properties such as a host ARN and tags.

```ts
const advancedConnection = await AWS.CodeStarConnections.Connection("advanced-connection", {
  ConnectionName: "MyGitLabConnection",
  HostArn: "arn:aws:codestar-connections:us-east-1:123456789012:host/host-id",
  ProviderType: "GitLab",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Connection with Existing Resource Adoption

Create a connection while adopting an existing resource if it already exists.

```ts
const adoptedConnection = await AWS.CodeStarConnections.Connection("adopted-connection", {
  ConnectionName: "MyExistingConnection",
  adopt: true
});
```

## Connection with Host ARN

Demonstrate creating a connection with a specified host ARN for integration with a self-hosted provider.

```ts
const hostedConnection = await AWS.CodeStarConnections.Connection("hosted-connection", {
  ConnectionName: "MySelfHostedConnection",
  HostArn: "arn:aws:codestar-connections:us-west-2:123456789012:host/host-id",
  ProviderType: "GitHub"
});
```
