---
title: Flywheel
description: Learn how to create, update, and manage AWS Comprehend Flywheels using Alchemy Cloud Control.
---


The Flywheel resource allows you to manage [AWS Comprehend Flywheels](https://docs.aws.amazon.com/comprehend/latest/userguide/) which are used for automating the model training and deployment process in AWS Comprehend.

## Minimal Example

Create a basic Flywheel with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const flywheel = await AWS.Comprehend.Flywheel("myFlywheel", {
  DataLakeS3Uri: "s3://my-comprehend-data-lake",
  DataAccessRoleArn: "arn:aws:iam::123456789012:role/MyComprehendRole",
  FlywheelName: "MyComprehendFlywheel",
  ModelType: "NER" // Named Entity Recognition
});
```

## Advanced Configuration

Configure a Flywheel with additional properties for task configuration and data security.

```ts
const advancedFlywheel = await AWS.Comprehend.Flywheel("advancedFlywheel", {
  DataLakeS3Uri: "s3://my-comprehend-data-lake",
  DataAccessRoleArn: "arn:aws:iam::123456789012:role/MyComprehendRole",
  FlywheelName: "AdvancedComprehendFlywheel",
  ModelType: "CUSTOM",
  TaskConfig: {
    DocumentClassifier: {
      DocumentClassifierArn: "arn:aws:comprehend:us-east-1:123456789012:document-classifier/MyClassifier"
    }
  },
  DataSecurityConfig: {
    DataAccessRoleArn: "arn:aws:iam::123456789012:role/MyDataAccessRole",
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key"
  },
  Tags: [
    { Key: "Project", Value: "ComprehendDemo" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Using an Active Model

Create a Flywheel and specify an active model ARN to utilize an existing trained model.

```ts
const flywheelWithActiveModel = await AWS.Comprehend.Flywheel("flywheelWithActiveModel", {
  DataLakeS3Uri: "s3://my-comprehend-data-lake",
  DataAccessRoleArn: "arn:aws:iam::123456789012:role/MyComprehendRole",
  FlywheelName: "FlywheelWithActiveModel",
  ActiveModelArn: "arn:aws:comprehend:us-east-1:123456789012:model/MyActiveModel"
});
```
