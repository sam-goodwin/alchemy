---
title: DBProxy
description: Learn how to create, update, and manage AWS RDS DBProxys using Alchemy Cloud Control.
---


The DBProxy resource lets you manage [AWS RDS DBProxys](https://docs.aws.amazon.com/rds/latest/userguide/) for improved application scalability and performance by pooling and sharing database connections.

## Minimal Example

Create a basic DBProxy with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const dbProxy = await AWS.RDS.DBProxy("myDbProxy", {
  DBProxyName: "my-db-proxy",
  Auth: [{
    AuthScheme: "SECRETS",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mysecret",
    Username: "dbuser"
  }],
  VpcSubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef0123456789"],
  RoleArn: "arn:aws:iam::123456789012:role/myDbProxyRole"
});
```

## Advanced Configuration

Configure a DBProxy with additional options for enhanced security and debugging.

```ts
const advancedDbProxy = await AWS.RDS.DBProxy("advancedDbProxy", {
  DBProxyName: "secure-db-proxy",
  Auth: [{
    AuthScheme: "SECRETS",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mysecret",
    Username: "dbuser"
  }],
  VpcSubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef0123456789"],
  RoleArn: "arn:aws:iam::123456789012:role/myDbProxyRole",
  RequireTLS: true,
  IdleClientTimeout: 30,
  DebugLogging: true,
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"]
});
```

## Connection Pooling Example

Create a DBProxy configured specifically for connection pooling to optimize database interactions.

```ts
const connectionPoolingDbProxy = await AWS.RDS.DBProxy("connectionPoolingDbProxy", {
  DBProxyName: "connection-pooling-proxy",
  Auth: [{
    AuthScheme: "SECRETS",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mysecret",
    Username: "dbuser"
  }],
  VpcSubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef0123456789"],
  RoleArn: "arn:aws:iam::123456789012:role/myDbProxyRole",
  RequireTLS: true,
  IdleClientTimeout: 60,
  VpcSecurityGroupIds: ["sg-0123456789abcdef0"]
});
```

## Security Group Configuration

Configure a DBProxy with specific security groups for enhanced network security.

```ts
const secureDbProxy = await AWS.RDS.DBProxy("secureDbProxy", {
  DBProxyName: "secure-db-proxy",
  Auth: [{
    AuthScheme: "SECRETS",
    SecretArn: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mysecret",
    Username: "dbuser"
  }],
  VpcSubnetIds: ["subnet-0123456789abcdef0", "subnet-0abcdef0123456789"],
  RoleArn: "arn:aws:iam::123456789012:role/myDbProxyRole",
  VpcSecurityGroupIds: ["sg-0123456789abcdef0", "sg-0abcdef0123456789"],
  Tags: [{
    Key: "Environment",
    Value: "Production"
  }]
});
```
