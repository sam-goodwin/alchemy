---
title: Managing AWS EC2 RouteTables with Alchemy
description: Learn how to create, update, and manage AWS EC2 RouteTables using Alchemy Cloud Control.
---

# RouteTable

The RouteTable resource allows you to create and manage [AWS EC2 RouteTables](https://docs.aws.amazon.com/ec2/latest/userguide/) for routing network traffic within your VPC.

## Minimal Example

Create a basic RouteTable with the required VPC ID and a tag.

```ts
import AWS from "alchemy/aws/control";

const BasicRouteTable = await AWS.EC2.RouteTable("BasicRouteTable", {
  VpcId: "vpc-1234abcd", 
  Tags: [{ Key: "Environment", Value: "Development" }]
});
```

## Enhanced Configuration

Configure a RouteTable with multiple tags for better organization and management.

```ts
const TaggedRouteTable = await AWS.EC2.RouteTable("TaggedRouteTable", {
  VpcId: "vpc-5678efgh", 
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Networking" },
    { Key: "Project", Value: "API Development" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing RouteTable without creating a new one, useful in scenarios where resources need to be managed without duplication.

```ts
const ExistingRouteTable = await AWS.EC2.RouteTable("ExistingRouteTable", {
  VpcId: "vpc-abcde123", 
  adopt: true // Adopt the existing RouteTable if it already exists
});
```

## Customizing RouteTable with Additional Properties

Demonstrate how to access additional properties of the RouteTable after creation, like ARN and creation time.

```ts
const CustomRouteTable = await AWS.EC2.RouteTable("CustomRouteTable", {
  VpcId: "vpc-ijkl456", 
  Tags: [{ Key: "Environment", Value: "Staging" }]
});

// Accessing additional properties
console.log(`RouteTable ARN: ${CustomRouteTable.Arn}`);
console.log(`Created At: ${CustomRouteTable.CreationTime}`);
```