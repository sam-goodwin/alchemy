---
title: InferenceScheduler
description: Learn how to create, update, and manage AWS LookoutEquipment InferenceSchedulers using Alchemy Cloud Control.
---


The InferenceScheduler resource allows you to manage [AWS LookoutEquipment InferenceSchedulers](https://docs.aws.amazon.com/lookoutequipment/latest/userguide/) that automate the process of running inference on your equipment data.

## Minimal Example

Create a basic InferenceScheduler with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const inferenceScheduler = await AWS.LookoutEquipment.InferenceScheduler("basicScheduler", {
  InferenceSchedulerName: "BasicInferenceScheduler",
  DataUploadFrequency: "PT5M", // Data will be uploaded every 5 minutes
  ModelName: "MyEquipmentModel",
  DataInputConfiguration: {
    S3InputConfiguration: {
      Bucket: "my-input-bucket",
      Prefix: "input-data/"
    }
  },
  DataOutputConfiguration: {
    S3OutputConfiguration: {
      Bucket: "my-output-bucket",
      Prefix: "output-data/"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/MyInferenceRole"
});
```

## Advanced Configuration

Configure an InferenceScheduler with additional options for data delay and encryption settings.

```ts
import AWS from "alchemy/aws/control";

const advancedScheduler = await AWS.LookoutEquipment.InferenceScheduler("advancedScheduler", {
  InferenceSchedulerName: "AdvancedInferenceScheduler",
  DataUploadFrequency: "PT10M", // Data will be uploaded every 10 minutes
  ModelName: "AdvancedEquipmentModel",
  DataInputConfiguration: {
    S3InputConfiguration: {
      Bucket: "my-input-bucket",
      Prefix: "input-data/"
    }
  },
  DataOutputConfiguration: {
    S3OutputConfiguration: {
      Bucket: "my-output-bucket",
      Prefix: "output-data/"
    }
  },
  ServerSideKmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key",
  DataDelayOffsetInMinutes: 15, // Data will be delayed by 15 minutes
  RoleArn: "arn:aws:iam::123456789012:role/service-role/MyAdvancedInferenceRole"
});
```

## Using Tags for Management

Create an InferenceScheduler with tags to help organize and manage resources.

```ts
import AWS from "alchemy/aws/control";

const taggedScheduler = await AWS.LookoutEquipment.InferenceScheduler("taggedScheduler", {
  InferenceSchedulerName: "TaggedInferenceScheduler",
  DataUploadFrequency: "PT30M", // Data will be uploaded every 30 minutes
  ModelName: "TaggedEquipmentModel",
  DataInputConfiguration: {
    S3InputConfiguration: {
      Bucket: "my-input-bucket",
      Prefix: "input-data/"
    }
  },
  DataOutputConfiguration: {
    S3OutputConfiguration: {
      Bucket: "my-output-bucket",
      Prefix: "output-data/"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/service-role/MyTaggedInferenceRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```
