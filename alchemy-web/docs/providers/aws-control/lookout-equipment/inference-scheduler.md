---
title: Managing AWS LookoutEquipment InferenceSchedulers with Alchemy
description: Learn how to create, update, and manage AWS LookoutEquipment InferenceSchedulers using Alchemy Cloud Control.
---

# InferenceScheduler

The InferenceScheduler resource allows you to automate the scheduling of inference jobs for AWS LookoutEquipment, enabling you to analyze equipment data efficiently. For more information, refer to the [AWS LookoutEquipment InferenceSchedulers documentation](https://docs.aws.amazon.com/lookoutequipment/latest/userguide/).

## Minimal Example

Create a basic InferenceScheduler with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicInferenceScheduler = await AWS.LookoutEquipment.InferenceScheduler("BasicScheduler", {
  InferenceSchedulerName: "DailyEquipmentInference",
  DataUploadFrequency: "PT1H", // Upload data every hour
  ModelName: "EquipmentAnomalyModel",
  DataInputConfiguration: {
    S3InputConfiguration: {
      Bucket: "my-equipment-data-bucket",
      Prefix: "data/"
    }
  },
  DataOutputConfiguration: {
    S3OutputConfiguration: {
      Bucket: "my-output-data-bucket",
      Prefix: "output/"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyLookoutRole"
});
```

## Advanced Configuration

Configure an InferenceScheduler with advanced settings, such as server-side encryption and data delay offset.

```ts
const advancedInferenceScheduler = await AWS.LookoutEquipment.InferenceScheduler("AdvancedScheduler", {
  InferenceSchedulerName: "WeeklyEquipmentInference",
  DataUploadFrequency: "PT6H", // Upload data every six hours
  ModelName: "AdvancedAnomalyDetectionModel",
  DataInputConfiguration: {
    S3InputConfiguration: {
      Bucket: "my-advanced-equipment-data-bucket",
      Prefix: "advanced-data/"
    }
  },
  DataOutputConfiguration: {
    S3OutputConfiguration: {
      Bucket: "my-advanced-output-data-bucket",
      Prefix: "advanced-output/"
    }
  },
  ServerSideKmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-kms-key",
  DataDelayOffsetInMinutes: 10, // Delay data processing by 10 minutes
  RoleArn: "arn:aws:iam::123456789012:role/MyAdvancedLookoutRole"
});
```

## Scheduled Inference with Tags

Create an InferenceScheduler that is tagged for easy identification and management.

```ts
const taggedInferenceScheduler = await AWS.LookoutEquipment.InferenceScheduler("TaggedScheduler", {
  InferenceSchedulerName: "MonthlyEquipmentInference",
  DataUploadFrequency: "PT24H", // Upload data once a day
  ModelName: "MonthlyAnomalyDetectionModel",
  DataInputConfiguration: {
    S3InputConfiguration: {
      Bucket: "my-tagged-equipment-data-bucket",
      Prefix: "tagged-data/"
    }
  },
  DataOutputConfiguration: {
    S3OutputConfiguration: {
      Bucket: "my-tagged-output-data-bucket",
      Prefix: "tagged-output/"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyTaggedLookoutRole",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```