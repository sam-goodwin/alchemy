---
title: Managing AWS AppSync FunctionConfigurations with Alchemy
description: Learn how to create, update, and manage AWS AppSync FunctionConfigurations using Alchemy Cloud Control.
---

# FunctionConfiguration

The FunctionConfiguration resource allows you to define and manage AWS AppSync function configurations, which are used to execute business logic as part of a GraphQL API. For more information, refer to the [AWS AppSync FunctionConfigurations documentation](https://docs.aws.amazon.com/appsync/latest/userguide/).

## Minimal Example

Create a basic FunctionConfiguration with the required properties `Name`, `ApiId`, and `DataSourceName`, along with a `Description`.

```ts
import AWS from "alchemy/aws/control";

const basicFunctionConfig = await AWS.AppSync.FunctionConfiguration("BasicFunctionConfig", {
  Name: "BasicFunction",
  ApiId: "your-api-id",
  DataSourceName: "your-data-source",
  Description: "A basic function configuration for AppSync."
});
```

## Advanced Configuration

Define a FunctionConfiguration with additional options such as `RequestMappingTemplate`, `ResponseMappingTemplate`, and `MaxBatchSize`.

```ts
const advancedFunctionConfig = await AWS.AppSync.FunctionConfiguration("AdvancedFunctionConfig", {
  Name: "AdvancedFunction",
  ApiId: "your-api-id",
  DataSourceName: "your-data-source",
  RequestMappingTemplate: `{
    "version": "2018-05-29",
    "operation": "Query",
    "query": {
      "expression": "id = :id",
      "expressionValues": {
        ":id": {
          "S": "$ctx.args.id"
        }
      }
    }
  }`,
  ResponseMappingTemplate: `$util.toJson($ctx.result)`,
  MaxBatchSize: 10,
  Description: "An advanced function configuration with mapping templates."
});
```

## Using S3 Locations for Templates

Configure a FunctionConfiguration that references mapping templates stored in S3 using `RequestMappingTemplateS3Location` and `ResponseMappingTemplateS3Location`.

```ts
const s3FunctionConfig = await AWS.AppSync.FunctionConfiguration("S3FunctionConfig", {
  Name: "S3Function",
  ApiId: "your-api-id",
  DataSourceName: "your-data-source",
  RequestMappingTemplateS3Location: "s3://your-bucket/request-mapping-template.vtl",
  ResponseMappingTemplateS3Location: "s3://your-bucket/response-mapping-template.vtl",
  Description: "A function configuration using S3 for mapping templates."
});
```

## Using Sync Configuration

Define a FunctionConfiguration that includes a `SyncConfig` for real-time data synchronization.

```ts
const syncFunctionConfig = await AWS.AppSync.FunctionConfiguration("SyncFunctionConfig", {
  Name: "SyncFunction",
  ApiId: "your-api-id",
  DataSourceName: "your-data-source",
  SyncConfig: {
    ConflictHandler: "AUTOMERGE",
    ConflictDetection: "VERSION",
  },
  Description: "A function configuration with sync capabilities."
});
```