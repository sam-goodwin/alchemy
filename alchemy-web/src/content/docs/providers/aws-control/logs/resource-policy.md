---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS Logs ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource allows you to create and manage resource policies for AWS CloudWatch Logs. Resource policies enable you to grant cross-account permissions for your CloudWatch Logs, allowing other AWS accounts or services to access your logs. For more information, refer to the [AWS Logs ResourcePolicys documentation](https://docs.aws.amazon.com/logs/latest/userguide/).

## Minimal Example

Create a basic resource policy for CloudWatch Logs with required properties and an optional adoption flag.

```ts
import AWS from "alchemy/aws/control";

const logResourcePolicy = await AWS.Logs.ResourcePolicy("myLogResourcePolicy", {
  PolicyName: "MyLogPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:root"
        },
        Action: "logs:PutLogEvents",
        Resource: "arn:aws:logs:us-west-2:123456789012:log-group:MyLogGroup:*"
      }
    ]
  }),
  adopt: false // Default is false: Fails if the resource already exists
});
```

## Advanced Configuration

Configure a resource policy with a more complex IAM policy document that allows multiple actions and principals.

```ts
const advancedLogResourcePolicy = await AWS.Logs.ResourcePolicy("advancedLogResourcePolicy", {
  PolicyName: "AdvancedLogPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: [
            "arn:aws:iam::123456789012:role/MyCrossAccountRole",
            "arn:aws:iam::987654321098:root"
          ]
        },
        Action: [
          "logs:PutLogEvents",
          "logs:CreateLogStream"
        ],
        Resource: "arn:aws:logs:us-west-2:123456789012:log-group:MyLogGroup:*"
      }
    ]
  })
});
```

## Cross-Account Access Example

Allow another AWS account to put log events into your log group by creating a specific resource policy.

```ts
const crossAccountLogPolicy = await AWS.Logs.ResourcePolicy("crossAccountLogPolicy", {
  PolicyName: "CrossAccountLogPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::987654321098:root"
        },
        Action: "logs:PutLogEvents",
        Resource: "arn:aws:logs:us-west-2:123456789012:log-group:MyLogGroup:*"
      }
    ]
  })
});
```

## Policy Updates Example

Update an existing log resource policy to include additional permissions.

```ts
const updatedLogPolicy = await AWS.Logs.ResourcePolicy("updatedLogPolicy", {
  PolicyName: "UpdatedLogPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyUpdatedRole"
        },
        Action: [
          "logs:PutLogEvents",
          "logs:CreateLogStream",
          "logs:DescribeLogStreams"
        ],
        Resource: "arn:aws:logs:us-west-2:123456789012:log-group:MyLogGroup:*"
      }
    ]
  }),
  adopt: true // Adopts existing resource if it already exists
});
```
