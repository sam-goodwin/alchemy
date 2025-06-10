---
title: DataSource
description: Learn how to create, update, and manage AWS Kendra DataSources using Alchemy Cloud Control.
---


The DataSource resource allows you to manage [AWS Kendra DataSources](https://docs.aws.amazon.com/kendra/latest/userguide/) to ingest data from various sources into your Kendra index.

## Minimal Example

Create a basic Kendra DataSource with required properties and a few optional ones.

```ts
import AWS from "alchemy/aws/control";

const kendraDataSource = await AWS.Kendra.DataSource("myDataSource", {
  Name: "MyDataSource",
  Type: "S3",
  IndexId: "my-kendra-index-id",
  RoleArn: "arn:aws:iam::123456789012:role/KendraDataSourceRole",
  Schedule: "cron(0 12 * * ? *)", // Run daily at noon UTC
});
```

## Advanced Configuration

Configure a Kendra DataSource with custom document enrichment and additional settings.

```ts
const advancedDataSource = await AWS.Kendra.DataSource("advancedDataSource", {
  Name: "AdvancedDataSource",
  Type: "S3",
  IndexId: "my-kendra-index-id",
  RoleArn: "arn:aws:iam::123456789012:role/KendraDataSourceRole",
  CustomDocumentEnrichmentConfiguration: {
    InlineConfigurations: [
      {
        Condition: {
          DocumentAttributeKey: "customAttribute",
          DocumentAttributeValue: "value"
        },
        DocumentLambdaFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myLambdaFunction",
      }
    ]
  },
  DataSourceConfiguration: {
    S3Configuration: {
      BucketName: "my-data-bucket",
      InclusionPrefixes: ["documents/"],
      ExclusionPatterns: ["*.tmp"],
    }
  },
  LanguageCode: "en",
});
```

## Using Tags for Resource Management

Add tags to your Kendra DataSource for better organization and management.

```ts
const taggedDataSource = await AWS.Kendra.DataSource("taggedDataSource", {
  Name: "TaggedDataSource",
  Type: "S3",
  IndexId: "my-kendra-index-id",
  RoleArn: "arn:aws:iam::123456789012:role/KendraDataSourceRole",
  Tags: [
    {
      Key: "Project",
      Value: "KendraIntegration"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Handling Document Enrichment

Configure a DataSource with specific document enrichment settings to enhance search relevancy.

```ts
const enrichmentDataSource = await AWS.Kendra.DataSource("enrichmentDataSource", {
  Name: "EnrichmentDataSource",
  Type: "S3",
  IndexId: "my-kendra-index-id",
  RoleArn: "arn:aws:iam::123456789012:role/KendraDataSourceRole",
  CustomDocumentEnrichmentConfiguration: {
    InlineConfigurations: [
      {
        Condition: {
          DocumentAttributeKey: "fileType",
          DocumentAttributeValue: "pdf"
        },
        DocumentLambdaFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:pdfProcessor",
      },
      {
        Condition: {
          DocumentAttributeKey: "fileType",
          DocumentAttributeValue: "docx"
        },
        DocumentLambdaFunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:docxProcessor",
      }
    ]
  },
});
```
