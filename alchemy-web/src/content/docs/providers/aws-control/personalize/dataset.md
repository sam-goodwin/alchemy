---
title: Dataset
description: Learn how to create, update, and manage AWS Personalize Datasets using Alchemy Cloud Control.
---


The Dataset resource allows you to manage [AWS Personalize Datasets](https://docs.aws.amazon.com/personalize/latest/userguide/) for building recommendation systems.

## Minimal Example

Create a basic Personalize Dataset with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const dataset = await AWS.Personalize.Dataset("userDataset", {
  DatasetGroupArn: "arn:aws:personalize:us-east-1:123456789012:dataset-group/my-dataset-group",
  DatasetType: "USER_DATA",
  SchemaArn: "arn:aws:personalize:us-east-1:123456789012:schema/my-schema",
  Name: "UserDataset",
  DatasetImportJob: {
    // Optional: Define dataset import job details here
    JobName: "UserDatasetImportJob",
    DataSource: {
      DataLocation: "s3://my-bucket/user-data/"
    },
    RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonPersonalize-ExecutionRole-20200101T123456"
  }
});
```

## Advanced Configuration

Configure a dataset with additional properties like DatasetImportJob for importing data from S3.

```ts
const advancedDataset = await AWS.Personalize.Dataset("itemDataset", {
  DatasetGroupArn: "arn:aws:personalize:us-east-1:123456789012:dataset-group/my-dataset-group",
  DatasetType: "ITEM_DATA",
  SchemaArn: "arn:aws:personalize:us-east-1:123456789012:schema/my-item-schema",
  Name: "ItemDataset",
  DatasetImportJob: {
    JobName: "ItemDatasetImportJob",
    DataSource: {
      DataLocation: "s3://my-bucket/item-data/"
    },
    RoleArn: "arn:aws:iam::123456789012:role/service-role/AmazonPersonalize-ExecutionRole-20200101T123456",
    Format: "CSV", // Optional: Specify the format of the data
    ImportMode: "FULL" // Optional: Choose the import mode (FULL or INCREMENTAL)
  }
});
```

## Example with Existing Resource Adoption

Create a dataset that adopts an existing resource instead of failing if the resource already exists.

```ts
const adoptDataset = await AWS.Personalize.Dataset("existingDataset", {
  DatasetGroupArn: "arn:aws:personalize:us-east-1:123456789012:dataset-group/my-dataset-group",
  DatasetType: "USER_DATA",
  SchemaArn: "arn:aws:personalize:us-east-1:123456789012:schema/my-schema",
  Name: "AdoptedUserDataset",
  adopt: true // Enables adoption of the existing resource
});
```
