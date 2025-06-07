---
title: Managing AWS Organizations Policies with Alchemy
description: Learn how to create, update, and manage AWS Organizations Policies using Alchemy Cloud Control.
---

# Policy

The Policy resource allows you to manage [AWS Organizations Policies](https://docs.aws.amazon.com/organizations/latest/userguide/) that define permissions and controls across your AWS accounts.

## Minimal Example

Create a basic policy with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicPolicy = await AWS.Organizations.Policy("BasicPolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  Description: "Policy to restrict certain services",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Action: "ec2:*",
        Resource: "*"
      }
    ]
  },
  Name: "RestrictEC2Services"
});
```

## Advanced Configuration

Configure a policy with target IDs and additional tags for better resource management.

```ts
const AdvancedPolicy = await AWS.Organizations.Policy("AdvancedPolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  TargetIds: ["ou-1234-5678"],
  Description: "Policy to limit EC2 and S3 access",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Deny",
        Action: ["ec2:*", "s3:*"],
        Resource: "*"
      }
    ]
  },
  Name: "LimitEC2AndS3Access",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Policy with Adoption

Create a policy that adopts an existing resource if it already exists, thus avoiding failure during deployment.

```ts
const AdoptedPolicy = await AWS.Organizations.Policy("AdoptedPolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  Description: "Policy to enforce MFA on all accounts",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "sts:AssumeRole",
        Resource: "*",
        Condition: {
          "Bool": {
            "aws:MultiFactorAuthPresent": "true"
          }
        }
      }
    ]
  },
  Name: "EnforceMFA",
  adopt: true
});
```

## Policy with Comprehensive Content

Create a policy that allows access to specific services based on conditions, demonstrating more complex policy content.

```ts
const ComprehensivePolicy = await AWS.Organizations.Policy("ComprehensivePolicy", {
  Type: "SERVICE_CONTROL_POLICY",
  Description: "Policy to allow specific actions based on tags",
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-bucket/*",
        Condition: {
          StringEquals: {
            "aws:ResourceTag/Department": "Finance"
          }
        }
      }
    ]
  },
  Name: "AllowS3AccessForFinance"
});
```