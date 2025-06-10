---
title: ConfigurationPolicy
description: Learn how to create, update, and manage AWS SecurityHub ConfigurationPolicys using Alchemy Cloud Control.
---


The ConfigurationPolicy resource lets you define and manage [AWS SecurityHub ConfigurationPolicys](https://docs.aws.amazon.com/securityhub/latest/userguide/) for your AWS environment. These policies are critical for enforcing security best practices and compliance standards.

## Minimal Example

Create a basic configuration policy with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicPolicy = await AWS.SecurityHub.ConfigurationPolicy("basicPolicy", {
  Name: "MySecurityPolicy",
  Description: "This policy enforces security best practices.",
  ConfigurationPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "securityhub:EnableSecurityHub",
        Resource: "*"
      }
    ]
  }
});
```

## Advanced Configuration

This example demonstrates how to create a configuration policy with tags for enhanced resource management.

```ts
const advancedPolicy = await AWS.SecurityHub.ConfigurationPolicy("advancedPolicy", {
  Name: "AdvancedSecurityPolicy",
  Description: "This policy includes tags for better identification.",
  ConfigurationPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "securityhub:UpdateFindings",
          "securityhub:GetFinding"
        ],
        Resource: "*"
      }
    ]
  },
  Tags: {
    Environment: "Production",
    Owner: "SecurityTeam"
  }
});
```

## Using Adopt Flag

This example shows how to use the adopt flag to manage existing resources without failure.

```ts
const adoptPolicy = await AWS.SecurityHub.ConfigurationPolicy("adoptPolicy", {
  Name: "ExistingResourcePolicy",
  Description: "This policy adopts an existing configuration policy if present.",
  ConfigurationPolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "securityhub:ListFindings",
        Resource: "*"
      }
    ]
  },
  adopt: true
});
```
