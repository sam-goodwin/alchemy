---
title: MultiRegionAccessPointPolicy
description: Learn how to create, update, and manage AWS S3 MultiRegionAccessPointPolicys using Alchemy Cloud Control.
---


The MultiRegionAccessPointPolicy resource lets you manage policies associated with AWS S3 Multi-Region Access Points, allowing you to control access to your S3 data across multiple regions. For more information, refer to the [AWS S3 MultiRegionAccessPointPolicys documentation](https://docs.aws.amazon.com/s3/latest/userguide/).

## Minimal Example

Create a basic MultiRegionAccessPointPolicy with required properties.

```ts
import AWS from "alchemy/aws/control";

const multiRegionAccessPointPolicy = await AWS.S3.MultiRegionAccessPointPolicy("myAccessPointPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3::my-multi-region-access-point/*",
        Condition: {
          StringEquals: {
            "aws:SourceAccount": "123456789012"
          }
        }
      }
    ]
  },
  MrapName: "myMultiRegionAccessPoint",
  adopt: true
});
```

## Advanced Configuration

Configure a MultiRegionAccessPointPolicy with a more complex policy structure.

```ts
const advancedPolicy = await AWS.S3.MultiRegionAccessPointPolicy("advancedAccessPointPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: [
          "s3:GetObject",
          "s3:PutObject"
        ],
        Resource: "arn:aws:s3:::my-multi-region-access-point/*",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  },
  MrapName: "myAdvancedMultiRegionAccessPoint",
  adopt: false
});
```

## Example with Conditional Access

This example demonstrates a policy that restricts access based on the time of day.

```ts
const timeRestrictedPolicy = await AWS.S3.MultiRegionAccessPointPolicy("timeRestrictedPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-multi-region-access-point/*",
        Condition: {
          NumericLessThanEquals: {
            "aws:CurrentTime": "16:00:00"
          }
        }
      }
    ]
  },
  MrapName: "myTimeRestrictedAccessPoint",
  adopt: true
});
```
