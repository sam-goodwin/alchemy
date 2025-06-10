---
title: Policy
description: Learn how to create, update, and manage AWS IAM Policies using Alchemy to define permissions for your AWS resources.
---


The Policy resource lets you create and manage [AWS IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) that define permissions for AWS services and resources.

## Minimal Example

Create a basic policy that allows S3 bucket access:

```ts
import { Policy } from "alchemy/aws";

const s3Policy = await Policy("bucket-access", {
  policyName: "s3-bucket-access", 
  document: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: [
        "s3:GetObject",
        "s3:PutObject"
      ],
      Resource: `${bucket.arn}/*`
    }]
  }
});
```

## Multiple Statements

Create a policy with multiple statements and conditions:

```ts
import { Policy } from "alchemy/aws";

const apiPolicy = await Policy("api-access", {
  policyName: "api-gateway-access",
  document: {
    Version: "2012-10-17", 
    Statement: [
      {
        Sid: "InvokeAPI",
        Effect: "Allow",
        Action: "execute-api:Invoke",
        Resource: `${api.executionArn}/*`,
        Condition: {
          StringEquals: {
            "aws:SourceVpc": vpc.id
          }
        }
      },
      {
        Sid: "ReadLogs",
        Effect: "Allow", 
        Action: [
          "logs:GetLogEvents",
          "logs:FilterLogEvents"
        ],
        Resource: `${api.logGroupArn}:*`
      }
    ]
  },
  description: "Allows invoking API Gateway endpoints and reading logs",
  tags: {
    Service: "API Gateway",
    Environment: "production" 
  }
});
```

## Deny Policy

Create a policy that denies access based on tags:

```ts
import { Policy } from "alchemy/aws";

const denyPolicy = await Policy("deny-production", {
  policyName: "deny-production-access",
  document: {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Deny",
      Action: "*", 
      Resource: "*",
      Condition: {
        StringEquals: {
          "aws:ResourceTag/Environment": "production"
        }
      }
    }]
  }
});
```
