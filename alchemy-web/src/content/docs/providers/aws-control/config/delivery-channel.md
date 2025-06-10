---
title: DeliveryChannel
description: Learn how to create, update, and manage AWS Config DeliveryChannels using Alchemy Cloud Control.
---


The DeliveryChannel resource lets you manage [AWS Config DeliveryChannels](https://docs.aws.amazon.com/config/latest/userguide/) which are responsible for delivering configuration snapshots and configuration history to an Amazon S3 bucket and notifying you of changes via Amazon SNS.

## Minimal Example

Create a basic DeliveryChannel with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const deliveryChannel = await AWS.Config.DeliveryChannel("basicDeliveryChannel", {
  S3BucketName: "my-config-bucket",
  S3KeyPrefix: "config-snapshots",
  ConfigSnapshotDeliveryProperties: {
    DeliveryFrequency: "One_Hour"
  }
});
```

## Advanced Configuration

Configure a DeliveryChannel with additional options such as a KMS key for encryption and SNS notifications.

```ts
const advancedDeliveryChannel = await AWS.Config.DeliveryChannel("advancedDeliveryChannel", {
  S3BucketName: "my-secure-config-bucket",
  S3KeyPrefix: "secure-config-snapshots",
  S3KmsKeyArn: "arn:aws:kms:us-east-1:123456789012:key/my-key-id",
  SnsTopicARN: "arn:aws:sns:us-east-1:123456789012:my-config-topic",
  ConfigSnapshotDeliveryProperties: {
    DeliveryFrequency: "Six_Hours"
  }
});
```

## Adoption of Existing Resources

If you want to adopt an existing DeliveryChannel instead of failing when one already exists, you can set the `adopt` property to true.

```ts
const adoptDeliveryChannel = await AWS.Config.DeliveryChannel("adoptExistingChannel", {
  S3BucketName: "my-existing-config-bucket",
  adopt: true
});
```

## Custom Configuration Snapshot Delivery Properties

Customize the delivery properties for more tailored delivery of configuration snapshots.

```ts
const customSnapshotDeliveryChannel = await AWS.Config.DeliveryChannel("customSnapshotChannel", {
  S3BucketName: "my-custom-config-bucket",
  ConfigSnapshotDeliveryProperties: {
    DeliveryFrequency: "Thirty_Minutes",
    SnsTopicARN: "arn:aws:sns:us-east-1:123456789012:my-custom-topic"
  }
});
```
