---
title: Managing AWS AppSync Resolvers with Alchemy
description: Learn how to create, update, and manage AWS AppSync Resolvers using Alchemy Cloud Control.
---

# Resolver

The Resolver resource allows you to manage [AWS AppSync Resolvers](https://docs.aws.amazon.com/appsync/latest/userguide/) which are responsible for connecting your GraphQL fields to data sources.

## Minimal Example

Create a basic Resolver to connect a GraphQL field to a data source:

```ts
import AWS from "alchemy/aws/control";

const BasicResolver = await AWS.AppSync.Resolver("BasicResolver", {
  ApiId: "your-api-id",
  TypeName: "Query",
  FieldName: "getUser",
  DataSourceName: "UserDataSource",
  RequestMappingTemplate: `{
    "version": "2018-05-29",
    "operation": "GetItem",
    "key": {
      "userId": $util.dynamodb.toDynamoDBJson($ctx.args.id)
    }
  }`,
  ResponseMappingTemplate: `$util.toJson($ctx.result)`
});
```

## Advanced Configuration

Configure a Resolver with advanced options such as caching and pipeline configuration:

```ts
const AdvancedResolver = await AWS.AppSync.Resolver("AdvancedResolver", {
  ApiId: "your-api-id",
  TypeName: "Query",
  FieldName: "listUsers",
  DataSourceName: "UserDataSource",
  RequestMappingTemplate: `{
    "version": "2018-05-29",
    "operation": "Scan"
  }`,
  ResponseMappingTemplate: `$util.toJson($ctx.result.items)`,
  CachingConfig: {
    Ttl: 300,
    CachingKeys: ["$ctx.args.status"]
  },
  PipelineConfig: {
    Functions: ["myPipelineFunctionId"]
  }
});
```

## Using S3 for Mapping Templates

Create a Resolver that utilizes S3 for storing mapping templates:

```ts
const S3Resolver = await AWS.AppSync.Resolver("S3Resolver", {
  ApiId: "your-api-id",
  TypeName: "Mutation",
  FieldName: "createUser",
  DataSourceName: "UserDataSource",
  RequestMappingTemplateS3Location: "s3://your-bucket-name/request-mapping-template.vtl",
  ResponseMappingTemplateS3Location: "s3://your-bucket-name/response-mapping-template.vtl"
});
```

## Sync Configuration for Real-time Updates

Set up a Resolver with sync configuration for real-time updates:

```ts
const SyncConfiguredResolver = await AWS.AppSync.Resolver("SyncConfiguredResolver", {
  ApiId: "your-api-id",
  TypeName: "Mutation",
  FieldName: "updateUser",
  DataSourceName: "UserDataSource",
  RequestMappingTemplate: `{
    "version": "2018-05-29",
    "operation": "PutItem",
    "key": {
      "userId": $util.dynamodb.toDynamoDBJson($ctx.args.userId)
    },
    "attributeValues": $util.dynamodb.toMapValues($ctx.args.input)
  }`,
  ResponseMappingTemplate: `$util.toJson($ctx.result)`,
  SyncConfig: {
    ConflictHandler: "AUTOMERGE",
    ConflictDetection: "VERSION"
  }
});
```