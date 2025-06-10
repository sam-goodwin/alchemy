---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS VpcLattice ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource lets you manage AWS VpcLattice ResourcePolicys to control access to your resources. For more information, refer to the [AWS VpcLattice ResourcePolicys documentation](https://docs.aws.amazon.com/vpclattice/latest/userguide/).

## Minimal Example

Create a basic ResourcePolicy with the required properties to allow access from a specific IP range.

```ts
import AWS from "alchemy/aws/control";

const resourcePolicy = await AWS.VpcLattice.ResourcePolicy("basicResourcePolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "vpclattice:Access",
        Resource: "arn:aws:vpclattice:us-west-2:123456789012:service/my-service",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  },
  ResourceArn: "arn:aws:vpclattice:us-west-2:123456789012:resource/my-resource"
});
```

## Advanced Configuration

Configure a ResourcePolicy with more complex IAM policy statements including multiple actions and conditions.

```ts
const advancedResourcePolicy = await AWS.VpcLattice.ResourcePolicy("advancedResourcePolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: [
          "vpclattice:Access",
          "vpclattice:Modify"
        ],
        Resource: "arn:aws:vpclattice:us-west-2:123456789012:service/my-service",
        Condition: {
          StringEquals: {
            "aws:RequestTag/Project": "ProjectX"
          }
        }
      }
    ]
  },
  ResourceArn: "arn:aws:vpclattice:us-west-2:123456789012:resource/my-resource",
  adopt: true // Adopts existing resource if it exists
});
```

## Conditional Access Control

Set up a ResourcePolicy that allows access based on specific tags assigned to the resource.

```ts
const taggedResourcePolicy = await AWS.VpcLattice.ResourcePolicy("taggedResourcePolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "vpclattice:Access",
        Resource: "arn:aws:vpclattice:us-west-2:123456789012:service/my-service",
        Condition: {
          StringEquals: {
            "aws:ResourceTag/Environment": "Production"
          }
        }
      }
    ]
  },
  ResourceArn: "arn:aws:vpclattice:us-west-2:123456789012:resource/my-resource"
});
```

## Using Adopt Option

Demonstrate how to create a ResourcePolicy while adopting an existing resource if it already exists.

```ts
const adoptResourcePolicy = await AWS.VpcLattice.ResourcePolicy("adoptResourcePolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "vpclattice:Access",
        Resource: "arn:aws:vpclattice:us-west-2:123456789012:service/my-service"
      }
    ]
  },
  ResourceArn: "arn:aws:vpclattice:us-west-2:123456789012:resource/my-resource",
  adopt: true // This will adopt the existing resource if it exists
});
```
