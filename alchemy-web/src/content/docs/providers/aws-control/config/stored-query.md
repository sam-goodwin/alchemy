---
title: StoredQuery
description: Learn how to create, update, and manage AWS Config StoredQuerys using Alchemy Cloud Control.
---


The StoredQuery resource allows you to manage [AWS Config StoredQuerys](https://docs.aws.amazon.com/config/latest/userguide/) that enable you to retrieve and analyze configuration data based on specific criteria.

## Minimal Example

Create a basic StoredQuery with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicStoredQuery = await AWS.Config.StoredQuery("basicStoredQuery", {
  QueryName: "MyBasicQuery",
  QueryExpression: "SELECT * FROM AWS::EC2::Instance",
  QueryDescription: "A basic query to select all EC2 instances"
});
```

## Advanced Configuration

Create a StoredQuery with additional tags for better resource management.

```ts
const taggedStoredQuery = await AWS.Config.StoredQuery("taggedStoredQuery", {
  QueryName: "MyAdvancedQuery",
  QueryExpression: "SELECT * FROM AWS::S3::Bucket WHERE bucketName = 'my-bucket'",
  QueryDescription: "Query to find a specific S3 bucket",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyProject" }
  ]
});
```

## Adoption of Existing Resource

Create a StoredQuery while adopting an existing resource if it already exists.

```ts
const adoptStoredQuery = await AWS.Config.StoredQuery("adoptedStoredQuery", {
  QueryName: "MyAdoptedQuery",
  QueryExpression: "SELECT * FROM AWS::RDS::DBInstance",
  QueryDescription: "Query to select all RDS instances",
  adopt: true // Adopt existing resource if it exists
});
```

## Query for Specific Configuration

Create a StoredQuery to filter AWS Lambda functions with specific properties.

```ts
const lambdaFunctionQuery = await AWS.Config.StoredQuery("lambdaFunctionQuery", {
  QueryName: "MyLambdaFunctions",
  QueryExpression: "SELECT * FROM AWS::Lambda::Function WHERE Runtime = 'nodejs14.x'",
  QueryDescription: "Query to retrieve all Lambda functions using Node.js 14 runtime"
});
```
