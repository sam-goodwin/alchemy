---
title: EndpointAuthorization
description: Learn how to create, update, and manage AWS Redshift EndpointAuthorizations using Alchemy Cloud Control.
---


The EndpointAuthorization resource allows you to manage AWS Redshift EndpointAuthorizations, which are used to grant access to your Redshift clusters from specific AWS accounts. For more information, refer to the [AWS Redshift EndpointAuthorizations documentation](https://docs.aws.amazon.com/redshift/latest/userguide/).

## Minimal Example

Create a basic EndpointAuthorization with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const endpointAuthorization = await AWS.Redshift.EndpointAuthorization("myEndpointAuth", {
  Account: "123456789012", // Specify the AWS account ID to authorize
  ClusterIdentifier: "myRedshiftCluster", // Your existing Redshift cluster identifier
  VpcIds: ["10.0.0.0/16"], // Optional: VPC ID for the authorization
});
```

## Advanced Configuration

Configure an EndpointAuthorization with the force option to overwrite existing authorizations.

```ts
const advancedEndpointAuthorization = await AWS.Redshift.EndpointAuthorization("myAdvancedEndpointAuth", {
  Account: "987654321098", // Specify the AWS account ID to authorize
  ClusterIdentifier: "myRedshiftCluster", // Your existing Redshift cluster identifier
  VpcIds: ["10.0.1.0/24"], // Optional: VPC ID for the authorization
  Force: true, // Optional: Force the authorization even if it already exists
});
```

## Adoption of Existing Resource

Adopt an existing EndpointAuthorization instead of failing when it already exists.

```ts
const adoptEndpointAuthorization = await AWS.Redshift.EndpointAuthorization("myAdoptEndpointAuth", {
  Account: "555555555555", // Specify the AWS account ID to authorize
  ClusterIdentifier: "myRedshiftCluster", // Your existing Redshift cluster identifier
  adopt: true, // Optional: Adopt existing resource
});
```
