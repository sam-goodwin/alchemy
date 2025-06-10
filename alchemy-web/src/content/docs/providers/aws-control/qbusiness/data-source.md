---
title: DataSource
description: Learn how to create, update, and manage AWS QBusiness DataSources using Alchemy Cloud Control.
---


The DataSource resource allows you to manage [AWS QBusiness DataSources](https://docs.aws.amazon.com/qbusiness/latest/userguide/) and their configuration settings for various applications.

## Minimal Example

Create a basic QBusiness DataSource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDataSource = await AWS.QBusiness.DataSource("basicDataSource", {
  IndexId: "qbusiness-index-123",
  Configuration: {
    dataSourceType: "S3",
    dataSourceUri: "s3://my-data-bucket/data/"
  },
  DisplayName: "Basic DataSource"
});
```

## Advanced Configuration

Configure a QBusiness DataSource with additional optional properties like synchronization schedule and document enrichment configuration.

```ts
const advancedDataSource = await AWS.QBusiness.DataSource("advancedDataSource", {
  IndexId: "qbusiness-index-456",
  Configuration: {
    dataSourceType: "RDS",
    dataSourceUri: "rds://my-database-instance/data/"
  },
  SyncSchedule: "rate(1 hour)",
  DocumentEnrichmentConfiguration: {
    documentAttributeKey: "title",
    documentAttributeValue: "my-document-title"
  },
  DisplayName: "Advanced DataSource",
  ApplicationId: "myAppId"
});
```

## VPC Configuration

Set up a QBusiness DataSource with VPC configuration for enhanced security and access control.

```ts
const vpcDataSource = await AWS.QBusiness.DataSource("vpcDataSource", {
  IndexId: "qbusiness-index-789",
  Configuration: {
    dataSourceType: "DynamoDB",
    dataSourceUri: "dynamodb://my-table"
  },
  VpcConfiguration: {
    SecurityGroupIds: ["sg-0123456789abcdef0"],
    SubnetIds: ["subnet-0123456789abcdef0", "subnet-abcdef0123456789"]
  },
  DisplayName: "VPC DataSource",
  ApplicationId: "myAppId"
});
```

## Tagging Resources

Create a QBusiness DataSource with tagging to help identify resources easily.

```ts
const taggedDataSource = await AWS.QBusiness.DataSource("taggedDataSource", {
  IndexId: "qbusiness-index-101112",
  Configuration: {
    dataSourceType: "S3",
    dataSourceUri: "s3://my-tagged-bucket/data/"
  },
  DisplayName: "Tagged DataSource",
  ApplicationId: "myAppId",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Data Science" }
  ]
});
```
