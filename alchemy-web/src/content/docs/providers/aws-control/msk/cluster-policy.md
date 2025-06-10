---
title: ClusterPolicy
description: Learn how to create, update, and manage AWS MSK ClusterPolicys using Alchemy Cloud Control.
---


The ClusterPolicy resource allows you to manage [AWS MSK ClusterPolicys](https://docs.aws.amazon.com/msk/latest/userguide/) that define the access controls and policies for your Amazon MSK clusters.

## Minimal Example

Create a basic ClusterPolicy with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicClusterPolicy = await AWS.MSK.ClusterPolicy("basicClusterPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "kafka:Connect",
        Resource: "*"
      }
    ]
  },
  ClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcd1234-5678-90ef-ghij-klmnopqrstuv"
});
```

## Advanced Configuration

Configure a ClusterPolicy with a more complex IAM policy, specifying multiple actions and conditions.

```ts
const advancedClusterPolicy = await AWS.MSK.ClusterPolicy("advancedClusterPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyMSKRole"
        },
        Action: [
          "kafka:Connect",
          "kafka:DescribeCluster"
        ],
        Resource: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcd1234-5678-90ef-ghij-klmnopqrstuv",
        Condition: {
          StringEquals: {
            "kafka:ClientAuthentication": "true"
          }
        }
      }
    ]
  },
  ClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  adopt: true // If true, adopts existing resource instead of failing when resource already exists
});
```

## Specific Use Case: Restricting Access Based on IP Address

Create a ClusterPolicy that grants permissions based on a specific CIDR block for enhanced security.

```ts
const ipRestrictedClusterPolicy = await AWS.MSK.ClusterPolicy("ipRestrictedClusterPolicy", {
  Policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "*"
        },
        Action: "kafka:Connect",
        Resource: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcd1234-5678-90ef-ghij-klmnopqrstuv",
        Condition: {
          IpAddress: {
            "aws:SourceIp": "203.0.113.0/24"
          }
        }
      }
    ]
  },
  ClusterArn: "arn:aws:kafka:us-east-1:123456789012:cluster/my-cluster/abcd1234-5678-90ef-ghij-klmnopqrstuv"
});
```
