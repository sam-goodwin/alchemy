---
title: Managing AWS Route53RecoveryControl Clusters with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryControl Clusters using Alchemy Cloud Control.
---

# Cluster

The Cluster resource lets you manage [AWS Route53RecoveryControl Clusters](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) which are essential for controlling and monitoring failover of your applications across AWS regions.

## Minimal Example

Create a basic Route53RecoveryControl Cluster with required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const BasicCluster = await AWS.Route53RecoveryControl.Cluster("BasicCluster", {
  Name: "PrimaryCluster",
  NetworkType: "CLOUDFRONT",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure a Cluster with additional properties for better management and identification.

```ts
const AdvancedCluster = await AWS.Route53RecoveryControl.Cluster("AdvancedCluster", {
  Name: "SecondaryCluster",
  NetworkType: "CLOUDFRONT",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "SRE" }
  ],
  adopt: true // Adopts the existing resource if it already exists
});
```

## Cluster with Multiple Tags

Create a Cluster demonstrating the use of multiple tags for better resource organization.

```ts
const TaggedCluster = await AWS.Route53RecoveryControl.Cluster("TaggedCluster", {
  Name: "TaggedResourceCluster",
  NetworkType: "CLOUDFRONT",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Owner", Value: "DevTeam" },
    { Key: "Project", Value: "NewApp" }
  ]
});
```