---
title: Managing AWS Config DeliveryChannels with Alchemy
description: Learn how to create, update, and manage AWS Config DeliveryChannels using Alchemy Cloud Control.
---

# DeliveryChannel

The DeliveryChannel resource lets you manage [AWS Config DeliveryChannels](https://docs.aws.amazon.com/config/latest/userguide/) for delivering configuration snapshots and configuration history to Amazon S3 and Amazon SNS.

## Minimal Example

Create a basic DeliveryChannel with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicDeliveryChannel = await AWS.Config.DeliveryChannel("BasicDeliveryChannel", {
  S3BucketName: "my-config-bucket",
  S3KeyPrefix: "config-snapshots/",
  SnsTopicARN: "arn:aws:sns:us-west-2:123456789012:MySNSTopic"
});
```

## Advanced Configuration

Configure a DeliveryChannel with advanced settings including snapshot delivery properties.

```ts
const AdvancedDeliveryChannel = await AWS.Config.DeliveryChannel("AdvancedDeliveryChannel", {
  S3BucketName: "my-config-bucket",
  S3KeyPrefix: "config-snapshots/",
  SnsTopicARN: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  ConfigSnapshotDeliveryProperties: {
    DeliveryFrequency: "Six_Hours" // Valid options include One_Hour, Three_Hours, Six_Hours, Twelve_Hours, and TwentyFour_Hours
  }
});
```

## Adoption of Existing Resource

If you want to adopt an existing DeliveryChannel rather than failing if it already exists, you can set the adopt property to true.

```ts
const AdoptedDeliveryChannel = await AWS.Config.DeliveryChannel("AdoptedDeliveryChannel", {
  S3BucketName: "my-config-bucket",
  S3KeyPrefix: "existing-config-snapshots/",
  SnsTopicARN: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  adopt: true
});
```

## Custom KMS Key for Encryption

You can also specify a KMS key for encrypting your S3 bucket contents.

```ts
const SecureDeliveryChannel = await AWS.Config.DeliveryChannel("SecureDeliveryChannel", {
  S3BucketName: "my-secure-config-bucket",
  S3KeyPrefix: "secure-config-snapshots/",
  SnsTopicARN: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  S3KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/my-key-id"
});
```