---
title: AccessPoint
description: Learn how to create, update, and manage AWS S3Outposts AccessPoints using Alchemy Cloud Control.
---


The AccessPoint resource lets you manage [AWS S3Outposts AccessPoints](https://docs.aws.amazon.com/s3outposts/latest/userguide/) for your S3Outposts buckets, providing specific access control and network configuration.

## Minimal Example

Create a basic S3Outposts AccessPoint with required properties and a simple policy:

```ts
import AWS from "alchemy/aws/control";

const accessPoint = await AWS.S3Outposts.AccessPoint("myAccessPoint", {
  bucket: "myS3OutpostBucket",
  vpcConfiguration: {
    vpcId: "vpc-0abcd1234efgh5678",
    subnetIds: ["subnet-0abcd1234efgh5678"],
    securityGroupIds: ["sg-0abcd1234efgh5678"]
  },
  name: "MyAccessPoint",
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3-outposts:us-west-2:123456789012:outpost/myS3OutpostBucket/*"
      }
    ]
  }
});
```

## Advanced Configuration

Configure an AccessPoint with additional settings such as a more complex policy and multiple network configurations:

```ts
const advancedAccessPoint = await AWS.S3Outposts.AccessPoint("advancedAccessPoint", {
  bucket: "myAdvancedS3OutpostBucket",
  vpcConfiguration: {
    vpcId: "vpc-0abcd1234efgh5678",
    subnetIds: ["subnet-0abcd1234efgh5678", "subnet-0ijkl9012mnop3456"],
    securityGroupIds: ["sg-0abcd1234efgh5678", "sg-0ijkl9012mnop3456"]
  },
  name: "AdvancedAccessPoint",
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "s3:*",
        Resource: "arn:aws:s3-outposts:us-west-2:123456789012:outpost/myAdvancedS3OutpostBucket/*"
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "s3:DeleteObject",
        Resource: "arn:aws:s3-outposts:us-west-2:123456789012:outpost/myAdvancedS3OutpostBucket/sensitive-data/*"
      }
    ]
  }
});
```

## VPC Configuration Example

Demonstrate creating an AccessPoint with a focus on the VPC configuration:

```ts
const vpcAccessPoint = await AWS.S3Outposts.AccessPoint("vpcAccessPoint", {
  bucket: "myVpcAccessBucket",
  vpcConfiguration: {
    vpcId: "vpc-0abcd1234efgh5678",
    subnetIds: ["subnet-0abcd1234efgh5678"],
    securityGroupIds: ["sg-0abcd1234efgh5678"]
  },
  name: "VpcAccessPoint"
});
```

This example highlights how to set up an AccessPoint within a specific VPC, ensuring that only resources within that VPC can access the bucket.
