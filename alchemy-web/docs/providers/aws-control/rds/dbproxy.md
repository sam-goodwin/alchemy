---
title: Managing AWS RDS DBProxys with Alchemy
description: Learn how to create, update, and manage AWS RDS DBProxys using Alchemy Cloud Control.
---

# DBProxy

The DBProxy resource allows you to create and manage an Amazon RDS DB Proxy, which provides a connection pool and management to improve application scalability and availability. For more details, refer to the [AWS RDS DBProxys documentation](https://docs.aws.amazon.com/rds/latest/userguide/).

## Minimal Example

Create a basic RDS DB Proxy with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicDBProxy = await AWS.RDS.DBProxy("BasicDBProxy", {
  DBProxyName: "my-db-proxy",
  RoleArn: "arn:aws:iam::123456789012:role/my-db-proxy-role",
  EngineFamily: "MYSQL",
  VpcSubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef1234567890"],
  Auth: [{
    AuthScheme: "SECRETS",
    SecretArn: "arn:aws:secretsmanager:region:123456789012:secret:my-secret",
    IAMAuth: "DISABLED"
  }],
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"],
  IdleClientTimeout: 1800,
  RequireTLS: true
});
```

## Advanced Configuration

Configure an RDS DB Proxy with enhanced settings for debugging and logging.

```ts
const advancedDBProxy = await AWS.RDS.DBProxy("AdvancedDBProxy", {
  DBProxyName: "my-advanced-db-proxy",
  RoleArn: "arn:aws:iam::123456789012:role/my-advanced-db-proxy-role",
  EngineFamily: "POSTGRESQL",
  VpcSubnetIds: ["subnet-0abcdef1234567890"],
  Auth: [{
    AuthScheme: "SECRETS",
    SecretArn: "arn:aws:secretsmanager:region:123456789012:secret:my-advanced-secret",
    IAMAuth: "DISABLED"
  }],
  DebugLogging: true,
  VpcSecurityGroupIds: ["sg-0123456789abcdef1"],
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Database" }
  ]
});
```

## Using Multiple Authentication Methods

Set up an RDS DB Proxy that uses both IAM authentication and Secrets Manager.

```ts
const multiAuthDBProxy = await AWS.RDS.DBProxy("MultiAuthDBProxy", {
  DBProxyName: "my-multi-auth-db-proxy",
  RoleArn: "arn:aws:iam::123456789012:role/my-multi-auth-db-proxy-role",
  EngineFamily: "MYSQL",
  VpcSubnetIds: ["subnet-0123456789abcdef0"],
  Auth: [
    {
      AuthScheme: "SECRETS",
      SecretArn: "arn:aws:secretsmanager:region:123456789012:secret:my-secret",
      IAMAuth: "DISABLED"
    },
    {
      AuthScheme: "IAM",
      IAMAuth: "ENABLED"
    }
  ],
  DebugLogging: false,
  VpcSecurityGroupIds: ["sg-0123456789abcdef2"],
  IdleClientTimeout: 600
});
```