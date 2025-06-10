---
title: RouteServerEndpoint
description: Learn how to create, update, and manage AWS EC2 RouteServerEndpoints using Alchemy Cloud Control.
---


The RouteServerEndpoint resource allows you to manage [AWS EC2 RouteServerEndpoints](https://docs.aws.amazon.com/ec2/latest/userguide/) which enable customers to connect to the AWS Direct Connect and transit gateway services through a centralized routing mechanism.

## Minimal Example

Create a basic RouteServerEndpoint with required properties.

```ts
import AWS from "alchemy/aws/control";

const routeServerEndpoint = await AWS.EC2.RouteServerEndpoint("myRouteServerEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a RouteServerEndpoint with additional properties, including adopting an existing resource.

```ts
const advancedRouteServerEndpoint = await AWS.EC2.RouteServerEndpoint("advancedRouteServerEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678",
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    }
  ],
  adopt: true // Adopt existing resource instead of failing if it already exists
});
```

## Connecting Multiple Networks

Create a RouteServerEndpoint to connect multiple networks through distinct subnets.

```ts
const primaryRouteServerEndpoint = await AWS.EC2.RouteServerEndpoint("primaryRouteServerEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678",
  Tags: [
    {
      Key: "Role",
      Value: "Primary"
    }
  ]
});

const secondaryRouteServerEndpoint = await AWS.EC2.RouteServerEndpoint("secondaryRouteServerEndpoint", {
  SubnetId: "subnet-1abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678",
  Tags: [
    {
      Key: "Role",
      Value: "Secondary"
    }
  ]
});
```

## Deleting a RouteServerEndpoint

Example of how to delete a RouteServerEndpoint when it is no longer needed.

```ts
await AWS.EC2.RouteServerEndpoint("deleteRouteServerEndpoint", {
  SubnetId: "subnet-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678",
  Tags: [
    {
      Key: "Action",
      Value: "Delete"
    }
  ]
});
```
