---
title: RouteServerAssociation
description: Learn how to create, update, and manage AWS EC2 RouteServerAssociations using Alchemy Cloud Control.
---


The RouteServerAssociation resource allows you to manage associations between a Route Server and a VPC within AWS EC2. This resource is essential for enabling dynamic routing capabilities in your network. For more details, visit the [AWS EC2 RouteServerAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic RouteServerAssociation with required properties and an optional adoption flag.

```ts
import AWS from "alchemy/aws/control";

const routeServerAssociation = await AWS.EC2.RouteServerAssociation("myRouteServerAssociation", {
  VpcId: "vpc-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678",
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Advanced Configuration

Here, we configure a RouteServerAssociation with just the essential properties, demonstrating how to create an association without optional parameters.

```ts
const advancedRouteServerAssociation = await AWS.EC2.RouteServerAssociation("advancedRouteServerAssociation", {
  VpcId: "vpc-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678"
});
```

## Handling Updates

In this example, we update an existing RouteServerAssociation by changing the RouteServerId.

```ts
const updatedRouteServerAssociation = await AWS.EC2.RouteServerAssociation("updatedRouteServerAssociation", {
  VpcId: "vpc-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678", // New Route Server ID
  adopt: true
});
```

## Deleting a RouteServerAssociation

This example shows how to remove a RouteServerAssociation, demonstrating proper resource cleanup.

```ts
await AWS.EC2.RouteServerAssociation("deleteRouteServerAssociation", {
  VpcId: "vpc-0abcd1234efgh5678",
  RouteServerId: "rs-0abcd1234efgh5678",
  adopt: false // Ensure this does not adopt an existing resource
});
```
