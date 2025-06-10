---
title: DataIntegration
description: Learn how to create, update, and manage AWS AppIntegrations DataIntegrations using Alchemy Cloud Control.
---


The DataIntegration resource allows you to manage AWS AppIntegrations DataIntegrations, enabling seamless data flow between AWS services and applications. For more detailed information, refer to the [AWS AppIntegrations DataIntegrations documentation](https://docs.aws.amazon.com/appintegrations/latest/userguide/).

## Minimal Example

Create a basic DataIntegration with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const minimalDataIntegration = await AWS.AppIntegrations.DataIntegration("basicDataIntegration", {
  sourceURI: "s3://my-data-source-bucket/data.csv",
  kmsKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  name: "BasicDataIntegration",
  scheduleConfig: {
    scheduleExpression: "rate(5 minutes)"
  }
});
```

## Advanced Configuration

Configure a DataIntegration with advanced settings, including object configuration and tagging.

```ts
const advancedDataIntegration = await AWS.AppIntegrations.DataIntegration("advancedDataIntegration", {
  sourceURI: "s3://my-data-source-bucket/advanced-data.csv",
  kmsKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  name: "AdvancedDataIntegration",
  objectConfiguration: {
    objectType: "MyCustomObject",
    fieldMappings: {
      "field1": "sourceField1",
      "field2": "sourceField2"
    }
  },
  tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "DataIngestion" }
  ]
});
```

## Using File Configuration

Create a DataIntegration that uses file configuration for data processing.

```ts
const fileConfiguredDataIntegration = await AWS.AppIntegrations.DataIntegration("fileConfiguredDataIntegration", {
  sourceURI: "s3://my-file-data-source-bucket/files/",
  kmsKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  name: "FileConfiguredDataIntegration",
  fileConfiguration: {
    fileType: "CSV",
    delimiter: ","
  }
});
```

## Tagging for Resource Management

Demonstrate how to utilize tagging for better resource management.

```ts
const taggedDataIntegration = await AWS.AppIntegrations.DataIntegration("taggedDataIntegration", {
  sourceURI: "s3://my-tagged-data-source-bucket/data.json",
  kmsKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst",
  name: "TaggedDataIntegration",
  tags: [
    { Key: "Department", Value: "Analytics" },
    { Key: "Owner", Value: "DataTeam" }
  ]
});
```
