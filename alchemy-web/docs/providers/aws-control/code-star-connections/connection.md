---
title: Managing AWS CodeStarConnections Connections with Alchemy
description: Learn how to create, update, and manage AWS CodeStarConnections Connections using Alchemy Cloud Control.
---

# Connection

The Connection resource lets you manage [AWS CodeStarConnections Connections](https://docs.aws.amazon.com/codestarconnections/latest/userguide/) for integrating with third-party source control systems such as GitHub or Bitbucket.

## Minimal Example

Create a basic connection with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicConnection = await AWS.CodeStarConnections.Connection("BasicConnection", {
  ConnectionName: "MyGitHubConnection",
  HostArn: "arn:aws:codestar-connections:us-east-1:123456789012:host/1a2b3c4d-5678-90ab-cdef-EXAMPLE11111",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Advanced Configuration

Configure a connection with additional properties for provider type and tags.

```ts
const AdvancedConnection = await AWS.CodeStarConnections.Connection("AdvancedConnection", {
  ConnectionName: "MyBitbucketConnection",
  HostArn: "arn:aws:codestar-connections:us-east-1:123456789012:host/1a2b3c4d-5678-90ab-cdef-EXAMPLE22222",
  ProviderType: "Bitbucket",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resource

Create a connection that adopts an existing resource instead of failing if it already exists.

```ts
const AdoptConnection = await AWS.CodeStarConnections.Connection("AdoptConnection", {
  ConnectionName: "ExistingGitHubConnection",
  HostArn: "arn:aws:codestar-connections:us-east-1:123456789012:host/1a2b3c4d-5678-90ab-cdef-EXAMPLE33333",
  adopt: true
});
```