---
title: DBProxyEndpoint
description: Learn how to create, update, and manage AWS RDS DBProxyEndpoints using Alchemy Cloud Control.
---


The DBProxyEndpoint resource allows you to manage AWS RDS DB Proxy Endpoints, which serve as an entry point for applications to connect to a DB Proxy. For more information, refer to the [AWS RDS DBProxyEndpoints documentation](https://docs.aws.amazon.com/rds/latest/userguide/).

## Minimal Example

Create a basic DB Proxy Endpoint with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const dbProxyEndpoint = await AWS.RDS.DBProxyEndpoint("myDbProxyEndpoint", {
  DBProxyEndpointName: "my-endpoint",
  DBProxyName: "my-db-proxy",
  VpcSubnetIds: ["subnet-0a1b2c3d", "subnet-0e4f5g6h"],
  TargetRole: "READ_WRITE"
});
```

## Advanced Configuration

Configure a DB Proxy Endpoint with additional optional properties such as VPC security groups and tags.

```ts
const advancedDbProxyEndpoint = await AWS.RDS.DBProxyEndpoint("advancedDbProxyEndpoint", {
  DBProxyEndpointName: "my-advanced-endpoint",
  DBProxyName: "my-db-proxy",
  VpcSubnetIds: ["subnet-0a1b2c3d", "subnet-0e4f5g6h"],
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Read-Only Endpoint Configuration

Create a read-only DB Proxy Endpoint for applications that only need to read data.

```ts
const readOnlyDbProxyEndpoint = await AWS.RDS.DBProxyEndpoint("readOnlyDbProxyEndpoint", {
  DBProxyEndpointName: "my-read-only-endpoint",
  DBProxyName: "my-db-proxy",
  VpcSubnetIds: ["subnet-0a1b2c3d", "subnet-0e4f5g6h"],
  TargetRole: "READ_ONLY"
});
```

## Testing Environment Configuration

Set up a DB Proxy Endpoint for a testing environment with specific security group settings.

```ts
const testDbProxyEndpoint = await AWS.RDS.DBProxyEndpoint("testDbProxyEndpoint", {
  DBProxyEndpointName: "my-test-endpoint",
  DBProxyName: "my-db-proxy",
  VpcSubnetIds: ["subnet-0a1b2c3d", "subnet-0e4f5g6h"],
  VpcSecurityGroupIds: ["sg-abcdef0123456789"],
  Tags: [
    { Key: "Environment", Value: "Testing" }
  ]
});
```
