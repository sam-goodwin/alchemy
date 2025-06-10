---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS Organizations ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource lets you manage [AWS Organizations ResourcePolicys](https://docs.aws.amazon.com/organizations/latest/userguide/) to define permissions for your AWS accounts and organizational units.

## Minimal Example

Create a basic resource policy with necessary content and tags.

```ts
import AWS from "alchemy/aws/control";

const resourcePolicy = await AWS.Organizations.ResourcePolicy("basicResourcePolicy", {
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "organizations:DescribeAccounts",
        Resource: "*"
      }
    ]
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

Define a more complex resource policy with multiple statements and additional properties.

```ts
const advancedResourcePolicy = await AWS.Organizations.ResourcePolicy("advancedResourcePolicy", {
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "cloudformation.amazonaws.com"
        },
        Action: "organizations:ListAccounts",
        Resource: "*"
      },
      {
        Effect: "Deny",
        Principal: {
          AWS: "arn:aws:iam::123456789012:root"
        },
        Action: "organizations:DeleteOrganization",
        Resource: "*"
      }
    ]
  },
  Tags: [
    {
      Key: "Project",
      Value: "ResourceManagement"
    }
  ],
  adopt: true
});
```

## Use Case: Restricting Access

Implement a resource policy to restrict access to a specific account.

```ts
const restrictedAccessPolicy = await AWS.Organizations.ResourcePolicy("restrictedAccessPolicy", {
  Content: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::098765432109:user/SpecificUser"
        },
        Action: [
          "organizations:DescribeOrganizationalUnits",
          "organizations:ListAccounts"
        ],
        Resource: "*"
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "organizations:DescribeOrganizationalUnits",
        Resource: "arn:aws:organizations::123456789012:ou/o-exampleorgid/ou-exampleouid"
      }
    ]
  }
});
```
