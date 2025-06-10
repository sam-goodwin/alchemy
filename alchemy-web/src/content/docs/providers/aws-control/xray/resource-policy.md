---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS XRay ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource lets you manage [AWS XRay ResourcePolicys](https://docs.aws.amazon.com/xray/latest/userguide/) that define permissions for your XRay data.

## Minimal Example

Create a basic resource policy with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicResourcePolicy = await AWS.XRay.ResourcePolicy("basicPolicy", {
  PolicyName: "MyBasicPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "xray:PutTelemetryRecords",
        Resource: "*"
      }
    ]
  }),
  BypassPolicyLockoutCheck: false
});
```

## Advanced Configuration

Configure a resource policy with a more complex IAM policy document that allows specific actions from a certain AWS account.

```ts
const advancedResourcePolicy = await AWS.XRay.ResourcePolicy("advancedPolicy", {
  PolicyName: "MyAdvancedPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:root"
        },
        Action: [
          "xray:PutTelemetryRecords",
          "xray:PutTraceSegments"
        ],
        Resource: "*"
      },
      {
        Effect: "Deny",
        Principal: "*",
        Action: "xray:DeleteTrace",
        Resource: "*"
      }
    ]
  }),
  BypassPolicyLockoutCheck: true
});
```

## Policy with Specific CIDR Block

This example demonstrates creating a resource policy that restricts access to a specific CIDR block.

```ts
const cidrRestrictedPolicy = await AWS.XRay.ResourcePolicy("cidrPolicy", {
  PolicyName: "MyCIDRRestrictedPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "xray:PutTelemetryRecords",
        Resource: "*",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  }),
  BypassPolicyLockoutCheck: false
});
```

## Combining Policies

This example shows how to combine multiple statements within a single resource policy for comprehensive permissions.

```ts
const combinedPolicy = await AWS.XRay.ResourcePolicy("combinedPolicy", {
  PolicyName: "MyCombinedPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "xray:PutTelemetryRecords",
        Resource: "*"
      },
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyXRayRole"
        },
        Action: "xray:PutTraceSegments",
        Resource: "*"
      }
    ]
  }),
  BypassPolicyLockoutCheck: true
});
```
