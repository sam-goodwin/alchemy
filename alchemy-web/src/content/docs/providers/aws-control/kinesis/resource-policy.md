---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS Kinesis ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource allows you to define resource-based policies for AWS Kinesis, enabling fine-grained access control. For more information, refer to the [AWS Kinesis ResourcePolicys documentation](https://docs.aws.amazon.com/kinesis/latest/userguide/).

## Minimal Example

Create a basic resource policy for a Kinesis stream that allows specific IAM users to access it.

```ts
import AWS from "alchemy/aws/control";

const kinesisResourcePolicy = await AWS.Kinesis.ResourcePolicy("myKinesisPolicy", {
  ResourceArn: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        AWS: "arn:aws:iam::123456789012:user/my-user"
      },
      Action: "kinesis:GetRecords",
      Resource: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
      Condition: {
        "StringEquals": {
          "kinesis:StreamName": "my-stream"
        }
      }
    }]
  },
  adopt: true // If true, adopt existing resource instead of failing when resource already exists
});
```

## Advanced Configuration

Define a more complex policy that enables cross-account access to the Kinesis stream.

```ts
const crossAccountPolicy = await AWS.Kinesis.ResourcePolicy("crossAccountPolicy", {
  ResourceArn: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: {
        AWS: "arn:aws:iam::098765432109:user/another-user"
      },
      Action: "kinesis:PutRecord",
      Resource: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
      Condition: {
        "StringEquals": {
          "kinesis:StreamName": "my-stream"
        }
      }
    }]
  }
});
```

## Specific Use Case: Restricting Access by IP Address

Create a policy that restricts access to a Kinesis stream based on the requester's IP address.

```ts
const ipRestrictedPolicy = await AWS.Kinesis.ResourcePolicy("ipRestrictedPolicy", {
  ResourceArn: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: "*",
      Action: "kinesis:DescribeStream",
      Resource: "arn:aws:kinesis:us-east-1:123456789012:stream/my-stream",
      Condition: {
        "IpAddress": {
          "aws:SourceIp": "203.0.113.0/24"
        }
      }
    }]
  }
});
```
