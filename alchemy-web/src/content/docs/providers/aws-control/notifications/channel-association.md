---
title: ChannelAssociation
description: Learn how to create, update, and manage AWS Notifications ChannelAssociations using Alchemy Cloud Control.
---


The ChannelAssociation resource allows you to manage [AWS Notifications ChannelAssociations](https://docs.aws.amazon.com/notifications/latest/userguide/) which enable notifications to be sent to various channels based on specified configurations.

## Minimal Example

This example demonstrates how to create a basic ChannelAssociation with the required properties.

```ts
import AWS from "alchemy/aws/control";

const basicChannelAssociation = await AWS.Notifications.ChannelAssociation("basicChannelAssociation", {
  NotificationConfigurationArn: "arn:aws:notifications:us-east-1:123456789012:notification-configuration/example",
  Arn: "arn:aws:notifications:us-east-1:123456789012:channel-association/example",
  adopt: true // Adopts existing resource if it already exists
});
```

## Advanced Configuration

In this example, we configure a ChannelAssociation with additional properties such as `CreationTime` and `LastUpdateTime`.

```ts
const advancedChannelAssociation = await AWS.Notifications.ChannelAssociation("advancedChannelAssociation", {
  NotificationConfigurationArn: "arn:aws:notifications:us-west-2:123456789012:notification-configuration/example-advanced",
  Arn: "arn:aws:notifications:us-west-2:123456789012:channel-association/example-advanced",
  adopt: false // Do not adopt existing resources
});
```

## Use Case: Associating with a Lambda Function

This example shows how to create a ChannelAssociation that is configured to work with an AWS Lambda function for sending notifications.

```ts
const lambdaChannelAssociation = await AWS.Notifications.ChannelAssociation("lambdaChannelAssociation", {
  NotificationConfigurationArn: "arn:aws:notifications:us-east-1:123456789012:notification-configuration/lambda-function",
  Arn: "arn:aws:notifications:us-east-1:123456789012:channel-association/lambda-function",
});
```

## Use Case: Associating with an SNS Topic

This example demonstrates how to associate a ChannelAssociation with an SNS topic for notifications.

```ts
const snsChannelAssociation = await AWS.Notifications.ChannelAssociation("snsChannelAssociation", {
  NotificationConfigurationArn: "arn:aws:sns:us-east-1:123456789012:my-sns-topic",
  Arn: "arn:aws:notifications:us-east-1:123456789012:channel-association/sns-topic",
  adopt: true // Adopts existing resource
});
```
