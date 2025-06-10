---
title: TransitGatewayRouteTable
description: Learn how to create, update, and manage AWS EC2 TransitGatewayRouteTables using Alchemy Cloud Control.
---


The TransitGatewayRouteTable resource allows you to manage [AWS EC2 Transit Gateway Route Tables](https://docs.aws.amazon.com/ec2/latest/userguide/) which are essential for controlling the routing of traffic between your VPCs and on-premises networks.

## Minimal Example

This example demonstrates how to create a basic Transit Gateway Route Table with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const transitGatewayRouteTable = await AWS.EC2.TransitGatewayRouteTable("myTransitGatewayRouteTable", {
  TransitGatewayId: "tgw-0abcd1234efgh5678", // Specify your Transit Gateway ID
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

In this example, we adopt an existing Transit Gateway Route Table if it already exists, while also adding multiple tags for better resource organization.

```ts
const advancedTransitGatewayRouteTable = await AWS.EC2.TransitGatewayRouteTable("advancedTransitGatewayRouteTable", {
  TransitGatewayId: "tgw-0abcd1234efgh5678", // Specify your Transit Gateway ID
  Tags: [
    {
      Key: "Environment",
      Value: "Staging"
    },
    {
      Key: "Project",
      Value: "CloudMigration"
    }
  ],
  adopt: true // Set to true to adopt existing resource
});
```

## Custom Route Table Management

Here’s how to create a Transit Gateway Route Table tailored for specific routing requirements by adding relevant tags.

```ts
const customTransitGatewayRouteTable = await AWS.EC2.TransitGatewayRouteTable("customTransitGatewayRouteTable", {
  TransitGatewayId: "tgw-0abcd1234efgh5678", // Specify your Transit Gateway ID
  Tags: [
    {
      Key: "Department",
      Value: "Engineering"
    },
    {
      Key: "Owner",
      Value: "TeamA"
    }
  ]
});
```

This example allows for better management and tracking of resources by tagging them with department and ownership information.
