---
title: FunctionConfiguration
description: Learn how to create, update, and manage AWS AppSync FunctionConfigurations using Alchemy Cloud Control.
---


The FunctionConfiguration resource allows you to define and manage [AWS AppSync FunctionConfigurations](https://docs.aws.amazon.com/appsync/latest/userguide/) that are used to handle request and response mapping templates for AWS AppSync resolvers.

## Minimal Example

Create a basic FunctionConfiguration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicFunctionConfig = await AWS.AppSync.FunctionConfiguration("basicFunctionConfig", {
  apiId: "myApiId",
  name: "MyFunction",
  dataSourceName: "myDataSource",
  requestMappingTemplate: "{ \"version\": \"2018-05-29\", \"operation\": \"Query\" }",
  responseMappingTemplate: "$util.toJson($ctx.result)"
});
```

## Advanced Configuration

Configure a FunctionConfiguration with additional options such as a maximum batch size and a description.

```ts
const advancedFunctionConfig = await AWS.AppSync.FunctionConfiguration("advancedFunctionConfig", {
  apiId: "myApiId",
  name: "AdvancedFunction",
  dataSourceName: "myDataSource",
  requestMappingTemplate: "{ \"version\": \"2018-05-29\", \"operation\": \"GetItem\" }",
  responseMappingTemplate: "$util.toJson($ctx.result)",
  maxBatchSize: 10,
  description: "This function handles complex queries."
});
```

## Using S3 for Mapping Templates

Demonstrate how to specify S3 locations for the request and response mapping templates.

```ts
const s3FunctionConfig = await AWS.AppSync.FunctionConfiguration("s3FunctionConfig", {
  apiId: "myApiId",
  name: "S3Function",
  dataSourceName: "myDataSource",
  requestMappingTemplateS3Location: "s3://my-bucket/request-mapping-template.vtl",
  responseMappingTemplateS3Location: "s3://my-bucket/response-mapping-template.vtl"
});
```

## Incorporating Sync Configurations

Show how to include a sync configuration in the FunctionConfiguration.

```ts
const syncConfigFunctionConfig = await AWS.AppSync.FunctionConfiguration("syncConfigFunctionConfig", {
  apiId: "myApiId",
  name: "SyncConfigFunction",
  dataSourceName: "myDataSource",
  requestMappingTemplate: "{ \"version\": \"2018-05-29\", \"operation\": \"Query\" }",
  responseMappingTemplate: "$util.toJson($ctx.result)",
  syncConfig: {
    conflictHandler: "AUTOMERGE",
    conflictDetection: "VERSION"
  }
});
```
