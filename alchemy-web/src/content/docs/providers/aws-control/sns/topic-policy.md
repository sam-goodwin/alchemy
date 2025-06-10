---
title: TopicPolicy
description: Learn how to create, update, and manage AWS SNS TopicPolicys using Alchemy Cloud Control.
---


The TopicPolicy resource allows you to manage access policies for Amazon Simple Notification Service (SNS) topics. This resource is essential for controlling permissions and ensuring secure access to your SNS topics. For more information, refer to the [AWS SNS TopicPolicys documentation](https://docs.aws.amazon.com/sns/latest/userguide/).

## Minimal Example

Create a basic SNS TopicPolicy that allows publishing from a specific AWS service.

```ts
import AWS from "alchemy/aws/control";

const snsTopicPolicy = await AWS.SNS.TopicPolicy("myTopicPolicy", {
  Topics: ["arn:aws:sns:us-east-1:123456789012:myTopic"],
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com"
        },
        Action: "SNS:Publish",
        Resource: "arn:aws:sns:us-east-1:123456789012:myTopic"
      }
    ]
  },
  adopt: false // Default is false; adopt existing resource if true
});
```

## Advanced Configuration

Configure a TopicPolicy with an additional statement for allowing a specific IAM role to publish to the SNS topic.

```ts
const advancedSnsTopicPolicy = await AWS.SNS.TopicPolicy("advancedTopicPolicy", {
  Topics: ["arn:aws:sns:us-east-1:123456789012:myAdvancedTopic"],
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "lambda.amazonaws.com"
        },
        Action: "SNS:Publish",
        Resource: "arn:aws:sns:us-east-1:123456789012:myAdvancedTopic"
      },
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyPublishRole"
        },
        Action: "SNS:Publish",
        Resource: "arn:aws:sns:us-east-1:123456789012:myAdvancedTopic"
      }
    ]
  }
});
```

## Example with Multiple Topics

Manage policies for multiple SNS topics using a single TopicPolicy resource.

```ts
const multiTopicPolicy = await AWS.SNS.TopicPolicy("multiTopicPolicy", {
  Topics: [
    "arn:aws:sns:us-east-1:123456789012:myFirstTopic",
    "arn:aws:sns:us-east-1:123456789012:mySecondTopic"
  ],
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "s3.amazonaws.com"
        },
        Action: "SNS:Publish",
        Resource: [
          "arn:aws:sns:us-east-1:123456789012:myFirstTopic",
          "arn:aws:sns:us-east-1:123456789012:mySecondTopic"
        ]
      }
    ]
  }
});
```
