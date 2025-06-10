---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS SSM ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource lets you manage [AWS SSM ResourcePolicys](https://docs.aws.amazon.com/ssm/latest/userguide/) to define access controls for your AWS Systems Manager resources.

## Minimal Example

Create a basic SSM ResourcePolicy with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicResourcePolicy = await AWS.SSM.ResourcePolicy("basicPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "ssm.amazonaws.com"
        },
        Action: "ssm:SendCommand",
        Resource: "*"
      }
    ]
  },
  ResourceArn: "arn:aws:ssm:us-east-1:123456789012:document/MyDocument",
  adopt: true // Adopt existing resource if it exists
});
```

## Advanced Configuration

Configure a ResourcePolicy with multiple statements for more complex access control.

```ts
const advancedResourcePolicy = await AWS.SSM.ResourcePolicy("advancedPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "ssm.amazonaws.com"
        },
        Action: "ssm:SendCommand",
        Resource: "arn:aws:ssm:us-west-2:123456789012:document/MyDocument"
      },
      {
        Effect: "Deny",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/SomeUser"
        },
        Action: "ssm:SendCommand",
        Resource: "*"
      }
    ]
  },
  ResourceArn: "arn:aws:ssm:us-west-2:123456789012:document/MyDocument"
});
```

## Restricting Access by IP Address

Create a ResourcePolicy that restricts access based on specific IP addresses.

```ts
const ipRestrictedPolicy = await AWS.SSM.ResourcePolicy("ipRestrictedPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "ssm.amazonaws.com"
        },
        Action: "ssm:SendCommand",
        Resource: "arn:aws:ssm:us-east-1:123456789012:document/MyDocument",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "203.0.113.0/24" // Allow access only from this CIDR block
          }
        }
      }
    ]
  },
  ResourceArn: "arn:aws:ssm:us-east-1:123456789012:document/MyDocument"
});
```

## Configuring Multiple Actions

Demonstrate a ResourcePolicy that allows multiple actions for a single resource.

```ts
const multiActionPolicy = await AWS.SSM.ResourcePolicy("multiActionPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          Service: "ssm.amazonaws.com"
        },
        Action: [
          "ssm:SendCommand",
          "ssm:ListCommands"
        ],
        Resource: "arn:aws:ssm:us-east-1:123456789012:document/MyDocument"
      }
    ]
  },
  ResourceArn: "arn:aws:ssm:us-east-1:123456789012:document/MyDocument"
});
```
