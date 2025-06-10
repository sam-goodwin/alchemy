---
title: Policy
description: Learn how to create, update, and manage AWS Organizations Policies using Alchemy Cloud Control.
---


The Policy resource lets you manage [AWS Organizations Policies](https://docs.aws.amazon.com/organizations/latest/userguide/) to enforce specific controls across your organization.

## Minimal Example

Create a basic policy with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.Organizations.Policy("basicPolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  Description: "A policy to restrict access to certain AWS services.",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Action: [
          "ec2:*",
          "s3:*"
        ],
        Resource: "*"
      }
    ]
  },
  Name: "RestrictEC2andS3"
});
```

## Advanced Configuration

Configure a policy with multiple target IDs and tags.

```ts
const advancedPolicy = await AWS.Organizations.Policy("advancedPolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  TargetIds: ["ou-1234-abcd", "ou-5678-efgh"],
  Description: "A policy to manage access at the organizational unit level.",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "*",
        Resource: "*"
      }
    ]
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "DevOps"
    }
  ],
  Name: "AllowAllServicesForOU"
});
```

## Policy for Cross-Account Access

Create a policy that allows specific actions across accounts while denying all others.

```ts
const crossAccountPolicy = await AWS.Organizations.Policy("crossAccountPolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  Description: "Allows cross-account access for specific actions.",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "sts:AssumeRole",
          "logs:CreateLogGroup"
        ],
        Resource: "*"
      },
      {
        Effect: "Deny",
        Action: "*",
        Resource: "*"
      }
    ]
  },
  Name: "CrossAccountAccessPolicy"
});
```

## Policy to Enforce Encryption

Create a policy that enforces encryption for all S3 buckets.

```ts
const encryptionPolicy = await AWS.Organizations.Policy("encryptionPolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  Description: "Enforces encryption for all S3 buckets.",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Action: "s3:PutBucketEncryption",
        Resource: "*",
        Condition: {
          "StringEquals": {
            "s3:x-amz-server-side-encryption": "AES256"
          }
        }
      }
    ]
  },
  Name: "EnforceS3Encryption"
});
```
