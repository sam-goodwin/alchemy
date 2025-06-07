---
title: Managing AWS CloudTrail ResourcePolicys with Alchemy
description: Learn how to create, update, and manage AWS CloudTrail ResourcePolicys using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource allows you to manage access control policies for AWS CloudTrail resources. This enables you to specify who can access your CloudTrail data and what actions they can perform. For more detailed information, refer to the [AWS CloudTrail ResourcePolicys documentation](https://docs.aws.amazon.com/cloudtrail/latest/userguide/).

## Minimal Example

Create a basic ResourcePolicy for a CloudTrail resource, specifying the required properties along with one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicResourcePolicy = await AWS.CloudTrail.ResourcePolicy("BasicPolicy", {
  ResourceArn: "arn:aws:cloudtrail:us-west-2:123456789012:trail/MyTrail",
  ResourcePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "cloudtrail:LookupEvents",
        Resource: "*"
      }
    ]
  }),
  adopt: true // Optionally adopt an existing resource
});
```

## Advanced Configuration

Configure a ResourcePolicy with a more complex policy that includes multiple statements and conditions.

```ts
const AdvancedResourcePolicy = await AWS.CloudTrail.ResourcePolicy("AdvancedPolicy", {
  ResourceArn: "arn:aws:cloudtrail:us-west-2:123456789012:trail/MyTrail",
  ResourcePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "arn:aws:iam::098765432109:user/ExampleUser" },
        Action: "cloudtrail:DescribeTrails",
        Resource: "*",
        Condition: {
          StringEquals: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "cloudtrail:DeleteTrail",
        Resource: "arn:aws:cloudtrail:us-west-2:123456789012:trail/MyTrail"
      }
    ]
  })
});
```

## Specific Use Case: Restricting Access

Create a ResourcePolicy that restricts access to a specific AWS account and limits actions to only those necessary for auditing.

```ts
const RestrictedAccessPolicy = await AWS.CloudTrail.ResourcePolicy("RestrictedAccess", {
  ResourceArn: "arn:aws:cloudtrail:us-west-2:123456789012:trail/MyTrail",
  ResourcePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "arn:aws:iam::123456789012:role/AuditorRole" },
        Action: [
          "cloudtrail:LookupEvents",
          "cloudtrail:GetTrailStatus"
        ],
        Resource: "*"
      }
    ]
  })
});
```

## Specific Use Case: Cross-Account Access

Set up a ResourcePolicy that allows cross-account access for specific actions.

```ts
const CrossAccountPolicy = await AWS.CloudTrail.ResourcePolicy("CrossAccountAccess", {
  ResourceArn: "arn:aws:cloudtrail:us-west-2:123456789012:trail/MyTrail",
  ResourcePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: "arn:aws:iam::987654321098:role/ExternalAuditorRole" },
        Action: "cloudtrail:LookupEvents",
        Resource: "*",
        Condition: {
          StringEquals: {
            "aws:SourceAccount": "123456789012"
          }
        }
      }
    ]
  })
});
```