---
title: ClusterSecurityGroupIngress
description: Learn how to create, update, and manage AWS Redshift ClusterSecurityGroupIngresss using Alchemy Cloud Control.
---


The ClusterSecurityGroupIngress resource allows you to manage ingress rules for Amazon Redshift cluster security groups. This resource is essential for controlling access to your Redshift clusters based on CIDR/IP address ranges or EC2 security groups. For more details, refer to the [AWS Redshift ClusterSecurityGroupIngresss documentation](https://docs.aws.amazon.com/redshift/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic ingress rule using a CIDR block to allow traffic from a specific IP range.

```ts
import AWS from "alchemy/aws/control";

const ingressRule = await AWS.Redshift.ClusterSecurityGroupIngress("basicIngressRule", {
  ClusterSecurityGroupName: "my-redshift-cluster-sg",
  CIDRIP: "192.168.1.0/24" // Allow traffic from this CIDR range
});
```

## Advanced Configuration

In this example, we include both an EC2 security group and a CIDR block to manage access from multiple sources.

```ts
const advancedIngressRule = await AWS.Redshift.ClusterSecurityGroupIngress("advancedIngressRule", {
  ClusterSecurityGroupName: "my-redshift-cluster-sg",
  CIDRIP: "10.0.0.0/16", // Allow traffic from this CIDR range
  EC2SecurityGroupName: "my-ec2-security-group",
  EC2SecurityGroupOwnerId: "123456789012" // Owner ID of the EC2 security group
});
```

## Use Case: Adopting Existing Resources

This example shows how to adopt an existing ingress rule instead of failing if the resource already exists.

```ts
const adoptIngressRule = await AWS.Redshift.ClusterSecurityGroupIngress("adoptIngressRule", {
  ClusterSecurityGroupName: "my-redshift-cluster-sg",
  CIDRIP: "172.16.0.0/12", // Allow traffic from this CIDR range
  adopt: true // Enable adoption of existing ingress rule
});
```

## Use Case: Combining Multiple Ingress Rules

Here we create multiple ingress rules to allow access from various CIDR blocks and EC2 security groups.

```ts
const ingressRule1 = await AWS.Redshift.ClusterSecurityGroupIngress("ingressRule1", {
  ClusterSecurityGroupName: "my-redshift-cluster-sg",
  CIDRIP: "203.0.113.0/24" // First ingress rule
});

const ingressRule2 = await AWS.Redshift.ClusterSecurityGroupIngress("ingressRule2", {
  ClusterSecurityGroupName: "my-redshift-cluster-sg",
  EC2SecurityGroupName: "another-ec2-security-group",
  EC2SecurityGroupOwnerId: "987654321098" // Second ingress rule
});
```
