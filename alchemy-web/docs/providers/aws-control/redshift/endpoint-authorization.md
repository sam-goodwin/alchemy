---
title: Managing AWS Redshift EndpointAuthorizations with Alchemy
description: Learn how to create, update, and manage AWS Redshift EndpointAuthorizations using Alchemy Cloud Control.
---

# EndpointAuthorization

The EndpointAuthorization resource allows you to manage [AWS Redshift EndpointAuthorizations](https://docs.aws.amazon.com/redshift/latest/userguide/) for granting access to your Redshift clusters from other AWS accounts. This is particularly useful for organizations that need to share data across accounts while maintaining security.

## Minimal Example

Create a basic EndpointAuthorization with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const EndpointAuth = await AWS.Redshift.EndpointAuthorization("MyEndpointAuth", {
  Account: "123456789012",
  ClusterIdentifier: "my-redshift-cluster",
  VpcIds: ["vpc-123abc45"]
});
```

## Advanced Configuration

Configure an EndpointAuthorization with force option to override existing authorizations.

```ts
const ForceEndpointAuth = await AWS.Redshift.EndpointAuthorization("ForceEndpointAuth", {
  Account: "123456789012",
  ClusterIdentifier: "my-redshift-cluster",
  Force: true,
  VpcIds: ["vpc-123abc45", "vpc-678def90"]
});
```

## Adoption of Existing Resource

Adopt an existing EndpointAuthorization instead of failing if it already exists.

```ts
const AdoptExistingEndpointAuth = await AWS.Redshift.EndpointAuthorization("AdoptExistingEndpointAuth", {
  Account: "123456789012",
  ClusterIdentifier: "my-redshift-cluster",
  adopt: true
});
```

## Multiple VPCs Authorization

Manage EndpointAuthorization for multiple VPCs associated with a Redshift cluster.

```ts
const MultiVpcEndpointAuth = await AWS.Redshift.EndpointAuthorization("MultiVpcEndpointAuth", {
  Account: "123456789012",
  ClusterIdentifier: "my-redshift-cluster",
  VpcIds: ["vpc-123abc45", "vpc-678def90"]
});
```