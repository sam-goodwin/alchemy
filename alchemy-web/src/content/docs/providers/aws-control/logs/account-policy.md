---
title: AccountPolicy
description: Learn how to create, update, and manage AWS Logs AccountPolicys using Alchemy Cloud Control.
---


The AccountPolicy resource allows you to manage [AWS Logs AccountPolicys](https://docs.aws.amazon.com/logs/latest/userguide/) for your AWS account. This resource enables you to define logging policies to control access to log data across your AWS services.

## Minimal Example

Create a basic account policy with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicAccountPolicy = await AWS.Logs.AccountPolicy("basicAccountPolicy", {
  PolicyType: "CLOUDWATCH_LOGS",
  PolicyName: "BasicLoggingPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "logs:CreateLogGroup",
      Resource: "*"
    }]
  })
});
```

## Advanced Configuration

Configure an account policy with additional options for selection criteria and scope.

```ts
const advancedAccountPolicy = await AWS.Logs.AccountPolicy("advancedAccountPolicy", {
  PolicyType: "CLOUDWATCH_LOGS",
  PolicyName: "AdvancedLoggingPolicy",
  Scope: "Organization",
  SelectionCriteria: "Region = 'us-west-2'",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "logs:*",
      Resource: "*"
    }]
  })
});
```

## Policy with Specific Conditions

Create a policy that includes specific conditions to restrict access based on account ID.

```ts
const restrictedAccountPolicy = await AWS.Logs.AccountPolicy("restrictedAccountPolicy", {
  PolicyType: "CLOUDWATCH_LOGS",
  PolicyName: "RestrictedLoggingPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "logs:DescribeLogGroups",
      Resource: "*",
      Condition: {
        "StringEquals": {
          "aws:PrincipalAccount": "123456789012"
        }
      }
    }]
  })
});
```

## Adoption of Existing Resource

Adopt an existing account policy instead of failing if it already exists.

```ts
const adoptExistingPolicy = await AWS.Logs.AccountPolicy("adoptExistingPolicy", {
  PolicyType: "CLOUDWATCH_LOGS",
  PolicyName: "AdoptedLoggingPolicy",
  PolicyDocument: JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "logs:PutLogEvents",
      Resource: "*"
    }]
  }),
  adopt: true
});
```
