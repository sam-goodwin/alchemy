---
title: Resolver
description: Learn how to create, update, and manage AWS AppSync Resolvers using Alchemy Cloud Control.
---


The Resolver resource lets you manage [AWS AppSync Resolvers](https://docs.aws.amazon.com/appsync/latest/userguide/) for connecting GraphQL operations to data sources.

## Minimal Example

Create a basic AppSync resolver with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicResolver = await AWS.AppSync.Resolver("basicResolver", {
  TypeName: "Query",
  FieldName: "getUser",
  ApiId: "your-api-id",
  DataSourceName: "UserDataSource",
  RequestMappingTemplate: `
    {
      "version": "2017-02-28",
      "operation": "GetItem",
      "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.id)
      }
    }
  `,
  ResponseMappingTemplate: `
    $util.toJson($ctx.result)
  `
});
```

## Advanced Configuration

Configure a resolver with additional options, including caching and a pipeline configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedResolver = await AWS.AppSync.Resolver("advancedResolver", {
  TypeName: "Mutation",
  FieldName: "createUser",
  ApiId: "your-api-id",
  DataSourceName: "UserDataSource",
  MaxBatchSize: 10,
  CachingConfig: {
    Ttl: 300,
    CacheKeys: ["$ctx.args.id"]
  },
  RequestMappingTemplate: `
    {
      "version": "2017-02-28",
      "operation": "PutItem",
      "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.id)
      },
      "attributeValues": {
        "name": $util.dynamodb.toDynamoDBJson($ctx.args.name),
        "email": $util.dynamodb.toDynamoDBJson($ctx.args.email)
      }
    }
  `,
  ResponseMappingTemplate: `
    $util.toJson($ctx.result)
  `
});
```

## Pipeline Resolver Example

Create a resolver that utilizes a pipeline configuration to handle complex logic:

```ts
import AWS from "alchemy/aws/control";

const pipelineResolver = await AWS.AppSync.Resolver("pipelineResolver", {
  TypeName: "Query",
  FieldName: "searchUsers",
  ApiId: "your-api-id",
  DataSourceName: "UserDataSource",
  PipelineConfig: {
    Functions: ["function1", "function2"]
  },
  RequestMappingTemplate: `
    $util.toJson($ctx.args)
  `,
  ResponseMappingTemplate: `
    $util.toJson($ctx.result)
  `
});
```

## Using S3 for Mapping Templates

Leverage S3 for storing request and response mapping templates:

```ts
import AWS from "alchemy/aws/control";

const s3Resolver = await AWS.AppSync.Resolver("s3Resolver", {
  TypeName: "Mutation",
  FieldName: "updateUser",
  ApiId: "your-api-id",
  DataSourceName: "UserDataSource",
  RequestMappingTemplateS3Location: "s3://your-bucket/request-mapping-template.vtl",
  ResponseMappingTemplateS3Location: "s3://your-bucket/response-mapping-template.vtl"
});
``` 

This document provides a comprehensive overview of how to manage AWS AppSync Resolvers using Alchemy, showcasing different configurations and use cases for effective integration with your GraphQL APIs.
