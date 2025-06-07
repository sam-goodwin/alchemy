---
title: Managing AWS Redshift ClusterSecurityGroups with Alchemy
description: Learn how to create, update, and manage AWS Redshift ClusterSecurityGroups using Alchemy Cloud Control.
---

# ClusterSecurityGroup

The ClusterSecurityGroup resource allows you to manage [AWS Redshift ClusterSecurityGroups](https://docs.aws.amazon.com/redshift/latest/userguide/) which control access to your Amazon Redshift clusters.

## Minimal Example

Create a basic ClusterSecurityGroup with a description and a tag.

```ts
import AWS from "alchemy/aws/control";

const securityGroup = await AWS.Redshift.ClusterSecurityGroup("MySecurityGroup", {
  Description: "Security group for my Redshift cluster",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataOps" }
  ]
});
```

## Advanced Configuration

Configure a ClusterSecurityGroup with specific CIDR rules for inbound traffic.

```ts
const advancedSecurityGroup = await AWS.Redshift.ClusterSecurityGroup("AdvancedSecurityGroup", {
  Description: "Security group with specific inbound rules",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Analytics" }
  ],
  adopt: true // Adopt existing resource if it already exists
});

// Example of adding rules would be implemented here
// Note: In this simplified example, the actual rule addition is not shown.
```

## Example with Inbound Rules

Demonstrate a ClusterSecurityGroup with inbound rules from specific IP addresses.

```ts
const ipSecurityGroup = await AWS.Redshift.ClusterSecurityGroup("IPBasedSecurityGroup", {
  Description: "Security group allowing access from specific IPs",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Dev" }
  ],
  adopt: true // Adopt existing resource if it already exists
});

// This is where you would typically add inbound rules
// Example: Adding rules would require additional properties or methods not shown in this context.
```