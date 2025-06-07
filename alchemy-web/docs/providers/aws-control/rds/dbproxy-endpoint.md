---
title: Managing AWS RDS DBProxyEndpoints with Alchemy
description: Learn how to create, update, and manage AWS RDS DBProxyEndpoints using Alchemy Cloud Control.
---

# DBProxyEndpoint

The DBProxyEndpoint resource allows you to manage [AWS RDS DBProxyEndpoints](https://docs.aws.amazon.com/rds/latest/userguide/) which serve as an intermediary between your application and RDS database instances, enhancing connection management and scalability.

## Minimal Example

Create a basic DBProxyEndpoint with essential properties.

```ts
import AWS from "alchemy/aws/control";

const BasicDBProxyEndpoint = await AWS.RDS.DBProxyEndpoint("BasicDBProxyEndpoint", {
  DBProxyEndpointName: "MyDBProxyEndpoint",
  DBProxyName: "MyDBProxy",
  VpcSubnetIds: ["subnet-12345678", "subnet-87654321"],
  VpcSecurityGroupIds: ["sg-12345678"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Advanced Configuration

Configure a DBProxyEndpoint with specific roles and multiple security groups for enhanced security.

```ts
const AdvancedDBProxyEndpoint = await AWS.RDS.DBProxyEndpoint("AdvancedDBProxyEndpoint", {
  DBProxyEndpointName: "AdvancedDBProxyEndpoint",
  DBProxyName: "AdvancedDBProxy",
  VpcSubnetIds: ["subnet-12345678", "subnet-87654321"],
  VpcSecurityGroupIds: ["sg-12345678", "sg-87654321"],
  TargetRole: "READ_WRITE",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Connection Management Example

Demonstrate how to create a DBProxyEndpoint focused on connection management with role settings.

```ts
const ConnectionManagementDBProxyEndpoint = await AWS.RDS.DBProxyEndpoint("ConnectionManagementDBProxyEndpoint", {
  DBProxyEndpointName: "ConnectionManagementEndpoint",
  DBProxyName: "ConnectionManagementProxy",
  VpcSubnetIds: ["subnet-12345678", "subnet-87654321"],
  VpcSecurityGroupIds: ["sg-12345678"],
  TargetRole: "READ_ONLY",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Custom Security Groups Example

Set up a DBProxyEndpoint with custom security groups for tighter network security.

```ts
const CustomSecurityGroupsDBProxyEndpoint = await AWS.RDS.DBProxyEndpoint("CustomSecurityGroupsDBProxyEndpoint", {
  DBProxyEndpointName: "CustomSecurityGroupsEndpoint",
  DBProxyName: "CustomSecurityGroupsProxy",
  VpcSubnetIds: ["subnet-abcdef12", "subnet-fedcba21"],
  VpcSecurityGroupIds: ["sg-abcdef12", "sg-fedcba21"],
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "Integration" }
  ]
});
```