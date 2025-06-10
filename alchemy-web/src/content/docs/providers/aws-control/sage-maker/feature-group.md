---
title: FeatureGroup
description: Learn how to create, update, and manage AWS SageMaker FeatureGroups using Alchemy Cloud Control.
---


The FeatureGroup resource lets you manage [AWS SageMaker FeatureGroups](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for organizing and storing features for machine learning models.

## Minimal Example

Create a basic FeatureGroup with required properties and some common optional configurations.

```ts
import AWS from "alchemy/aws/control";

const featureGroup = await AWS.SageMaker.FeatureGroup("myFeatureGroup", {
  FeatureGroupName: "CustomerFeatures",
  RecordIdentifierFeatureName: "customerId",
  EventTimeFeatureName: "eventTime",
  FeatureDefinitions: [
    {
      FeatureName: "customerId",
      FeatureType: "String"
    },
    {
      FeatureName: "eventTime",
      FeatureType: "Timestamp"
    },
    {
      FeatureName: "purchaseAmount",
      FeatureType: "Number"
    }
  ],
  Description: "Feature group for storing customer purchase information.",
  OnlineStoreConfig: {
    EnableOnlineStore: true
  },
  OfflineStoreConfig: {
    S3StorageConfig: {
      S3Uri: "s3://my-bucket/offline-store",
      KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
    }
  }
});
```

## Advanced Configuration

Configure a FeatureGroup with a custom throughput configuration and IAM role.

```ts
const advancedFeatureGroup = await AWS.SageMaker.FeatureGroup("advancedFeatureGroup", {
  FeatureGroupName: "AdvancedCustomerFeatures",
  RecordIdentifierFeatureName: "customerId",
  EventTimeFeatureName: "eventTime",
  FeatureDefinitions: [
    {
      FeatureName: "customerId",
      FeatureType: "String"
    },
    {
      FeatureName: "eventTime",
      FeatureType: "Timestamp"
    },
    {
      FeatureName: "loyaltyPoints",
      FeatureType: "Number"
    }
  ],
  Description: "Feature group for advanced customer features.",
  RoleArn: "arn:aws:iam::123456789012:role/SageMakerExecutionRole",
  ThroughputConfig: {
    VolumeSizeInGB: 5,
    KmsKeyId: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrst"
  }
});
```

## Tagging for Organization

You can add tags to your FeatureGroup for better organization and cost tracking.

```ts
const taggedFeatureGroup = await AWS.SageMaker.FeatureGroup("taggedFeatureGroup", {
  FeatureGroupName: "TaggedCustomerFeatures",
  RecordIdentifierFeatureName: "customerId",
  EventTimeFeatureName: "eventTime",
  FeatureDefinitions: [
    {
      FeatureName: "customerId",
      FeatureType: "String"
    },
    {
      FeatureName: "eventTime",
      FeatureType: "Timestamp"
    },
    {
      FeatureName: "purchaseFrequency",
      FeatureType: "Number"
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "CustomerAnalytics"
    },
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```
