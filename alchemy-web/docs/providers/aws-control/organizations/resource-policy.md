---
title: Managing AWS Organizations ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS Organizations ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource allows you to manage [AWS Organizations ResourcePolicies](https://docs.aws.amazon.com/organizations/latest/userguide/) to control access to your AWS resources across your organization.

## Minimal Example

Create a basic ResourcePolicy with required properties and a couple of common optional tags.

```ts
import AWS from "alchemy/aws/control";

const basicResourcePolicy = await AWS.Organizations.ResourcePolicy("BasicResourcePolicy", {
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "sts:AssumeRole",
        Resource: "*"
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Engineering" }
  ]
});
```

## Advanced Configuration

Configure a ResourcePolicy with a more complex policy statement and additional properties.

```ts
const advancedResourcePolicy = await AWS.Organizations.ResourcePolicy("AdvancedResourcePolicy", {
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "ec2.amazonaws.com"
        },
        Action: "sts:AssumeRole",
        Resource: "arn:aws:iam::123456789012:role/MyRole",
        Condition: {
          StringEquals: {
            "aws:SourceAccount": "123456789012"
          }
        }
      }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Compliance", Value: "PCI-DSS" }
  ]
});
```

## Policy with Multiple Statements

Demonstrate a ResourcePolicy that includes multiple statements for different services.

```ts
const multiStatementPolicy = await AWS.Organizations.ResourcePolicy("MultiStatementPolicy", {
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: "arn:aws:s3:::my-bucket/*"
      },
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/Alice"
        },
        Action: "dynamodb:PutItem",
        Resource: "arn:aws:dynamodb:us-west-2:123456789012:table/MyTable"
      }
    ]
  }
});
```