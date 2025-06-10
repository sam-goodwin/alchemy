---
title: GroupPolicy
description: Learn how to create, update, and manage AWS IAM GroupPolicies using Alchemy Cloud Control.
---


The GroupPolicy resource lets you manage [AWS IAM GroupPolicies](https://docs.aws.amazon.com/iam/latest/userguide/) for controlling permissions associated with IAM groups.

## Minimal Example

Create a basic IAM GroupPolicy with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicGroupPolicy = await AWS.IAM.GroupPolicy("basicGroupPolicy", {
  GroupName: "Developers",
  PolicyName: "DeveloperAccess",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["s3:ListBucket", "s3:GetObject"],
        Resource: ["arn:aws:s3:::my-application-bucket/*"]
      }
    ]
  }
});
```

## Advanced Configuration

Configure a GroupPolicy with additional permissions and a complex policy document.

```ts
const advancedGroupPolicy = await AWS.IAM.GroupPolicy("advancedGroupPolicy", {
  GroupName: "Admins",
  PolicyName: "AdminFullAccess",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "*",
        Resource: "*"
      }
    ]
  }
});
```

## Policy with Conditions

Create a GroupPolicy that restricts access based on conditions.

```ts
const conditionGroupPolicy = await AWS.IAM.GroupPolicy("conditionGroupPolicy", {
  GroupName: "Finance",
  PolicyName: "FinanceReadAccess",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::financial-reports/*",
        Condition: {
          StringEquals: {
            "s3:prefix": "2023/"
          }
        }
      }
    ]
  }
});
```

## Policy for Specific IP Addresses

Create a GroupPolicy that restricts access to specific IP addresses.

```ts
const ipRestrictedGroupPolicy = await AWS.IAM.GroupPolicy("ipRestrictedGroupPolicy", {
  GroupName: "NetworkAdmins",
  PolicyName: "NetworkAdminAccess",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "ec2:*",
        Resource: "*",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  }
});
```
