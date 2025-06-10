---
title: EndpointAccess
description: Learn how to create, update, and manage AWS Redshift EndpointAccesss using Alchemy Cloud Control.
---


The EndpointAccess resource allows you to manage [AWS Redshift EndpointAccess](https://docs.aws.amazon.com/redshift/latest/userguide/) configurations for your Redshift clusters, enabling secure access through specified VPC security groups and subnet groups.

## Minimal Example

Create a basic EndpointAccess with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const endpointAccess = await AWS.Redshift.EndpointAccess("myEndpointAccess", {
  EndpointName: "my-redshift-endpoint",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetGroupName: "my-subnet-group",
  ClusterIdentifier: "my-cluster-id",
  ResourceOwner: "123456789012" // Optional: Specify the account ID of the resource owner
});
```

## Advanced Configuration

Configure an EndpointAccess with additional options such as adopting an existing resource.

```ts
const advancedEndpointAccess = await AWS.Redshift.EndpointAccess("advancedEndpointAccess", {
  EndpointName: "my-advanced-endpoint",
  VpcSecurityGroupIds: ["sg-abcdef0123456789"],
  SubnetGroupName: "my-advanced-subnet-group",
  ClusterIdentifier: "my-cluster-id",
  adopt: true // Optional: Adopt existing resource instead of failing
});
```

## Using Multiple Security Groups

Demonstrate how to set up an EndpointAccess with multiple VPC security groups for enhanced security.

```ts
const multiSecurityGroupEndpointAccess = await AWS.Redshift.EndpointAccess("multiSecurityGroupEndpointAccess", {
  EndpointName: "my-multi-sg-endpoint",
  VpcSecurityGroupIds: [
    "sg-0123456789abcdef0",
    "sg-abcdef0123456789"
  ],
  SubnetGroupName: "my-multi-sg-subnet-group",
  ClusterIdentifier: "my-cluster-id"
});
```

## Custom Subnet Group Configuration

Create an EndpointAccess with a custom subnet group that is tailored for specific network configurations.

```ts
const customSubnetGroupEndpointAccess = await AWS.Redshift.EndpointAccess("customSubnetGroupEndpointAccess", {
  EndpointName: "my-custom-subnet-endpoint",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetGroupName: "custom-subnet-group",
  ClusterIdentifier: "my-cluster-id"
});
```
