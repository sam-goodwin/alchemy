---
title: DRTAccess
description: Learn how to create, update, and manage AWS Shield DRTAccess using Alchemy Cloud Control.
---


The DRTAccess resource allows you to manage access to the AWS Shield DDoS Response Team (DRT) for your AWS resources. This resource is essential for enabling AWS Shield to log and monitor your resources for potential DDoS attacks. For more information, visit the [AWS Shield DRTAccess](https://docs.aws.amazon.com/shield/latest/userguide/).

## Minimal Example

Create a DRTAccess resource with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const drtAccess = await AWS.Shield.DRTAccess("drtAccessResource", {
  LogBucketList: ["arn:aws:s3:::my-log-bucket"],
  RoleArn: "arn:aws:iam::123456789012:role/myShieldRole"
});
```

## Advanced Configuration

Configure a DRTAccess resource with additional options, such as adopting existing resources.

```ts
const advancedDrtAccess = await AWS.Shield.DRTAccess("advancedDrtAccessResource", {
  LogBucketList: ["arn:aws:s3:::my-log-bucket", "arn:aws:s3:::my-additional-log-bucket"],
  RoleArn: "arn:aws:iam::123456789012:role/myAdvancedShieldRole",
  adopt: true
});
```

## Logging Configuration

Set up a DRTAccess resource specifically for logging access with multiple log buckets.

```ts
const loggingDrtAccess = await AWS.Shield.DRTAccess("loggingDrtAccessResource", {
  LogBucketList: [
    "arn:aws:s3:::my-log-bucket",
    "arn:aws:s3:::my-backup-log-bucket"
  ],
  RoleArn: "arn:aws:iam::123456789012:role/myLoggingShieldRole"
});
```

## Role Permissions Example

Define a DRTAccess resource with specific IAM role permissions for enhanced security.

```ts
const permissionsDrtAccess = await AWS.Shield.DRTAccess("permissionsDrtAccessResource", {
  LogBucketList: ["arn:aws:s3:::my-secure-log-bucket"],
  RoleArn: "arn:aws:iam::123456789012:role/myPermissionsShieldRole",
  adopt: false
});

// IAM Policy for the Role
const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "shield:AssociateDRTAccess",
        "shield:DisassociateDRTAccess",
        "shield:GetDRTAccess",
        "shield:ListDRTAccess"
      ],
      Resource: "*"
    }
  ]
};
```
