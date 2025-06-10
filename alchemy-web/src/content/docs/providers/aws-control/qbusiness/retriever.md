---
title: Retriever
description: Learn how to create, update, and manage AWS QBusiness Retrievers using Alchemy Cloud Control.
---


The Retriever resource lets you manage [AWS QBusiness Retrievers](https://docs.aws.amazon.com/qbusiness/latest/userguide/) which enable you to retrieve data from various sources and integrate it into your applications.

## Minimal Example

Create a basic QBusiness Retriever with required properties and one optional role ARN.

```ts
import AWS from "alchemy/aws/control";

const basicRetriever = await AWS.QBusiness.Retriever("basicRetriever", {
  Type: "DataSource",
  Configuration: {
    // Configuration details go here
  },
  DisplayName: "Basic Data Retriever",
  ApplicationId: "myAppId",
  RoleArn: "arn:aws:iam::123456789012:role/MyRetrieverRole"
});
```

## Advanced Configuration

Configure a QBusiness Retriever with detailed configuration settings.

```ts
const advancedRetriever = await AWS.QBusiness.Retriever("advancedRetriever", {
  Type: "DataSource",
  Configuration: {
    Source: "S3",
    BucketName: "my-data-bucket",
    Format: "json",
    Schema: {
      fields: [
        { name: "id", type: "string" },
        { name: "value", type: "number" }
      ]
    }
  },
  DisplayName: "Advanced Data Retriever",
  ApplicationId: "myAppId",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Adoption of Existing Resources

Create a QBusiness Retriever and adopt an existing resource if it already exists.

```ts
const adoptedRetriever = await AWS.QBusiness.Retriever("adoptedRetriever", {
  Type: "DataSource",
  Configuration: {
    Source: "API",
    Endpoint: "https://api.example.com/data",
    Auth: {
      Type: "Bearer",
      Token: alchemy.secret(process.env.API_TOKEN!)
    }
  },
  DisplayName: "Adopted Data Retriever",
  ApplicationId: "myAppId",
  adopt: true
});
```

## Using Tags for Resource Organization

Create a QBusiness Retriever with multiple tags for better organization and tracking.

```ts
const taggedRetriever = await AWS.QBusiness.Retriever("taggedRetriever", {
  Type: "DataSource",
  Configuration: {
    Source: "Database",
    DatabaseId: "myDatabase",
    Query: "SELECT * FROM my_table"
  },
  DisplayName: "Tagged Data Retriever",
  ApplicationId: "myAppId",
  Tags: [
    { Key: "Project", Value: "QBusiness" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```
