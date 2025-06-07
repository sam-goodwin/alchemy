---
title: Managing AWS Redshift ClusterSecurityGroupIngresss with Alchemy
description: Learn how to create, update, and manage AWS Redshift ClusterSecurityGroupIngresss using Alchemy Cloud Control.
---

# ClusterSecurityGroupIngress

The ClusterSecurityGroupIngress resource allows you to manage ingress rules for AWS Redshift Cluster Security Groups. This enables you to control access to your Redshift clusters by specifying which IP addresses or EC2 security groups can connect to your cluster. For more information, visit the [AWS Redshift ClusterSecurityGroupIngresss documentation](https://docs.aws.amazon.com/redshift/latest/userguide/).

## Minimal Example

Create a basic ClusterSecurityGroupIngress with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const SecurityGroupIngress = await AWS.Redshift.ClusterSecurityGroupIngress("MyClusterSecurityGroupIngress", {
  ClusterSecurityGroupName: "MyClusterSecurityGroup",
  CIDRIP: "192.168.1.0/24"
});
```

## Advanced Configuration

Configure a ClusterSecurityGroupIngress with additional properties such as an EC2 security group and its owner ID.

```ts
const AdvancedSecurityGroupIngress = await AWS.Redshift.ClusterSecurityGroupIngress("AdvancedClusterSecurityGroupIngress", {
  ClusterSecurityGroupName: "MyAdvancedClusterSecurityGroup",
  EC2SecurityGroupName: "MyEC2SecurityGroup",
  EC2SecurityGroupOwnerId: "123456789012"
});
```

## Using Existing Resources

Adopt existing resources by setting the `adopt` flag to true, which will create a new resource only if it does not already exist.

```ts
const AdoptExistingSecurityGroupIngress = await AWS.Redshift.ClusterSecurityGroupIngress("ExistingSecurityGroupIngress", {
  ClusterSecurityGroupName: "MyExistingClusterSecurityGroup",
  CIDRIP: "10.0.0.0/16",
  adopt: true
});
```

## Multiple Ingress Rules

You can create multiple ingress rules for a single Cluster Security Group by invoking the resource multiple times.

```ts
const IngressRule1 = await AWS.Redshift.ClusterSecurityGroupIngress("IngressRule1", {
  ClusterSecurityGroupName: "MyMultiIngressClusterSecurityGroup",
  CIDRIP: "172.16.0.0/12"
});

const IngressRule2 = await AWS.Redshift.ClusterSecurityGroupIngress("IngressRule2", {
  ClusterSecurityGroupName: "MyMultiIngressClusterSecurityGroup",
  EC2SecurityGroupName: "AnotherEC2SecurityGroup",
  EC2SecurityGroupOwnerId: "987654321098"
});
```