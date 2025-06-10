---
title: Subscriber
description: Learn how to create, update, and manage AWS SecurityLake Subscribers using Alchemy Cloud Control.
---


The Subscriber resource allows you to manage [AWS SecurityLake Subscribers](https://docs.aws.amazon.com/securitylake/latest/userguide/) for accessing and consuming security data stored in AWS Security Lake.

## Minimal Example

Create a basic SecurityLake subscriber with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicSubscriber = await AWS.SecurityLake.Subscriber("basic-subscriber", {
  SubscriberIdentity: {
    Type: "AWS_ACCOUNT",
    Value: "123456789012"
  },
  SubscriberName: "MySecuritySubscriber",
  AccessTypes: ["FULL_ACCESS"],
  Sources: [
    {
      SourceType: "AWS_S3",
      SourceArn: "arn:aws:s3:::my-security-logs"
    }
  ],
  DataLakeArn: "arn:aws:securitylake:us-east-1:123456789012:data-lake"
});
```

## Advanced Configuration

Configure a subscriber with additional optional properties, such as a description and tags.

```ts
const advancedSubscriber = await AWS.SecurityLake.Subscriber("advanced-subscriber", {
  SubscriberIdentity: {
    Type: "AWS_ACCOUNT",
    Value: "987654321098"
  },
  SubscriberName: "AdvancedSecuritySubscriber",
  SubscriberDescription: "This subscriber accesses advanced security data.",
  AccessTypes: ["READ_ONLY"],
  Sources: [
    {
      SourceType: "AWS_S3",
      SourceArn: "arn:aws:s3:::advanced-security-logs"
    }
  ],
  DataLakeArn: "arn:aws:securitylake:us-east-1:987654321098:data-lake",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Department",
      Value: "Security"
    }
  ]
});
```

## Multiple Sources Configuration

Create a subscriber that listens to multiple sources for diverse log types.

```ts
const multiSourceSubscriber = await AWS.SecurityLake.Subscriber("multi-source-subscriber", {
  SubscriberIdentity: {
    Type: "AWS_ACCOUNT",
    Value: "123456789012"
  },
  SubscriberName: "MultiSourceSecuritySubscriber",
  AccessTypes: ["FULL_ACCESS"],
  Sources: [
    {
      SourceType: "AWS_S3",
      SourceArn: "arn:aws:s3:::security-logs-bucket"
    },
    {
      SourceType: "AWS_KINESIS",
      SourceArn: "arn:aws:kinesis:us-east-1:123456789012:stream/security-logs-stream"
    }
  ],
  DataLakeArn: "arn:aws:securitylake:us-east-1:123456789012:data-lake"
});
```

## Subscriber Identity with IAM Policy

Define a subscriber with a specific IAM policy for access control.

```ts
const iamPolicySubscriber = await AWS.SecurityLake.Subscriber("iam-policy-subscriber", {
  SubscriberIdentity: {
    Type: "AWS_ACCOUNT",
    Value: "234567890123"
  },
  SubscriberName: "IAMPolicySecuritySubscriber",
  AccessTypes: ["FULL_ACCESS"],
  Sources: [
    {
      SourceType: "AWS_S3",
      SourceArn: "arn:aws:s3:::iam-security-logs"
    }
  ],
  DataLakeArn: "arn:aws:securitylake:us-east-1:234567890123:data-lake",
  Tags: [
    {
      Key: "AccessLevel",
      Value: "Admin"
    }
  ]
});
```
