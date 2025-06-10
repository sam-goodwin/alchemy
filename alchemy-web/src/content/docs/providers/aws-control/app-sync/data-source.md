---
title: DataSource
description: Learn how to create, update, and manage AWS AppSync DataSources using Alchemy Cloud Control.
---


The DataSource resource allows you to manage [AWS AppSync DataSources](https://docs.aws.amazon.com/appsync/latest/userguide/) which serve as the integration points for your GraphQL API. You can connect to various data sources, including DynamoDB, Lambda functions, HTTP endpoints, and more.

## Minimal Example

Create a basic AppSync DataSource with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicDataSource = await AWS.AppSync.DataSource("basicDataSource", {
  name: "MyDynamoDBDataSource",
  type: "AMAZON_DYNAMODB",
  apiId: "YOUR_APPSYNC_API_ID",
  description: "A DataSource connected to DynamoDB",
  serviceRoleArn: "arn:aws:iam::123456789012:role/service-role/service-role-name"
});
```

## Advanced Configuration

Configure an AppSync DataSource with additional options such as OpenSearchServiceConfig and MetricsConfig.

```ts
const advancedDataSource = await AWS.AppSync.DataSource("advancedDataSource", {
  name: "MyOpenSearchDataSource",
  type: "AMAZON_OPENSEARCH",
  apiId: "YOUR_APPSYNC_API_ID",
  description: "A DataSource connected to OpenSearch",
  openSearchServiceConfig: {
    endpoint: "https://search-my-domain.us-west-2.es.amazonaws.com",
    region: "us-west-2"
  },
  metricsConfig: "metrics-enabled",
  serviceRoleArn: "arn:aws:iam::123456789012:role/service-role/service-role-name"
});
```

## Lambda DataSource Example

Create an AppSync DataSource that connects to a Lambda function.

```ts
const lambdaDataSource = await AWS.AppSync.DataSource("lambdaDataSource", {
  name: "MyLambdaDataSource",
  type: "AWS_LAMBDA",
  apiId: "YOUR_APPSYNC_API_ID",
  lambdaConfig: {
    lambdaFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction"
  },
  serviceRoleArn: "arn:aws:iam::123456789012:role/service-role/service-role-name"
});
```

## HTTP DataSource Example

Set up an AppSync DataSource to connect to an HTTP endpoint.

```ts
const httpDataSource = await AWS.AppSync.DataSource("httpDataSource", {
  name: "MyHttpDataSource",
  type: "HTTP",
  apiId: "YOUR_APPSYNC_API_ID",
  httpConfig: {
    endpoint: "https://api.example.com/data",
    authorizationConfig: {
      authorizationType: "AWS_IAM",
      awsIamConfig: {
        signingRegion: "us-west-2",
        signingServiceName: "execute-api"
      }
    }
  },
  serviceRoleArn: "arn:aws:iam::123456789012:role/service-role/service-role-name"
});
```
