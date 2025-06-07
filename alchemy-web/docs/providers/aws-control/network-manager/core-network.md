---
title: Managing AWS NetworkManager CoreNetworks with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager CoreNetworks using Alchemy Cloud Control.
---

# CoreNetwork

The CoreNetwork resource allows you to manage [AWS NetworkManager CoreNetworks](https://docs.aws.amazon.com/networkmanager/latest/userguide/) which help you define a global network architecture. This resource enables you to create, modify, and manage network policies for your enterprise applications and services.

## Minimal Example

This example demonstrates how to create a basic CoreNetwork with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const MyCoreNetwork = await AWS.NetworkManager.CoreNetwork("MyCoreNetwork", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "This is my main corporate network."
});
```

## Advanced Configuration

In this example, we include a policy document that defines IAM permissions and tags for better resource management.

```ts
const AdvancedCoreNetwork = await AWS.NetworkManager.CoreNetwork("AdvancedCoreNetwork", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Advanced configuration with policies.",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "networkmanager:*",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "NetworkTeam" }
  ]
});
```

## Network Policy Example

This example demonstrates how to create a CoreNetwork with a detailed policy document that specifies network access controls.

```ts
const PolicyCoreNetwork = await AWS.NetworkManager.CoreNetwork("PolicyCoreNetwork", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Core network with strict policies.",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "networkmanager.amazonaws.com"
        },
        Action: [
          "networkmanager:CreateCoreNetwork",
          "networkmanager:UpdateCoreNetwork"
        ],
        Resource: "*"
      },
      {
        Effect: "Deny",
        Action: "networkmanager:DeleteCoreNetwork",
        Resource: "*",
        Condition: {
          StringEquals: {
            "aws:PrincipalTag/Role": "ReadOnly"
          }
        }
      }
    ]
  },
  Tags: [
    { Key: "Department", Value: "IT" },
    { Key: "Project", Value: "CloudMigration" }
  ]
});
```

## CoreNetwork with Multiple CIDR Blocks

This example shows how to set up a CoreNetwork that specifies multiple CIDR blocks for different segments.

```ts
const MultiCIDRCoreNetwork = await AWS.NetworkManager.CoreNetwork("MultiCIDRCoreNetwork", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  Description: "Core network with multiple CIDR blocks.",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "networkmanager:*",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```