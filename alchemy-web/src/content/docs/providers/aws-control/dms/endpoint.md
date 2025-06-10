---
title: Endpoint
description: Learn how to create, update, and manage AWS DMS Endpoints using Alchemy Cloud Control.
---


The Endpoint resource lets you manage [AWS DMS Endpoints](https://docs.aws.amazon.com/dms/latest/userguide/) used for database migration services, enabling connections to various database sources and targets.

## Minimal Example

Create a basic AWS DMS Endpoint with required properties and some common optional properties.

```ts
import AWS from "alchemy/aws/control";

const dmsEndpoint = await AWS.DMS.Endpoint("myDmsEndpoint", {
  EndpointType: "source",
  EngineName: "mysql",
  ServerName: "mysql.example.com",
  Port: 3306,
  DatabaseName: "myDatabase",
  Username: "admin",
  Password: "securePassword123",
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Advanced Configuration

Configure an AWS DMS Endpoint with advanced options such as SSL mode and additional connection attributes.

```ts
const secureDmsEndpoint = await AWS.DMS.Endpoint("secureDmsEndpoint", {
  EndpointType: "target",
  EngineName: "postgres",
  ServerName: "postgres.example.com",
  Port: 5432,
  DatabaseName: "targetDatabase",
  Username: "dbUser",
  Password: "superSecurePassword456",
  SslMode: "require",
  ExtraConnectionAttributes: "ssl=true;sslcafile=/path/to/certificate",
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Using Different Database Engines

Create endpoints for different database engines like Oracle and MongoDB.

### Oracle Endpoint

Here's how to create an endpoint for an Oracle database:

```ts
const oracleDmsEndpoint = await AWS.DMS.Endpoint("oracleDmsEndpoint", {
  EndpointType: "source",
  EngineName: "oracle",
  ServerName: "oracle.example.com",
  Port: 1521,
  DatabaseName: "oracleDb",
  Username: "oracleUser",
  Password: "oraclePassword789",
  OracleSettings: {
    AccessRoleArn: "arn:aws:iam::123456789012:role/dms-access-role",
    OraclePath: "myPath",
    UseBimodal: true
  },
  Tags: [
    { Key: "DatabaseType", Value: "Oracle" }
  ]
});
```

### MongoDB Endpoint

Create an endpoint for a MongoDB database:

```ts
const mongoDmsEndpoint = await AWS.DMS.Endpoint("mongoDmsEndpoint", {
  EndpointType: "target",
  EngineName: "mongodb",
  ServerName: "mongodb.example.com",
  Port: 27017,
  DatabaseName: "mongoDb",
  Username: "mongoUser",
  Password: "mongoPassword101112",
  MongoDbSettings: {
    AuthMechanism: "SCRAM_SHA_1",
    AuthSource: "admin"
  },
  Tags: [
    { Key: "DatabaseType", Value: "MongoDB" }
  ]
});
```
