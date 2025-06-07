---
title: Managing AWS SecretsManager ResourcePolicies with Alchemy
description: Learn how to create, update, and manage AWS SecretsManager ResourcePolicies using Alchemy Cloud Control.
---

# ResourcePolicy

The ResourcePolicy resource allows you to manage resource policies for AWS SecretsManager, enabling you to control access to your secrets. For more information, you can refer to the [AWS SecretsManager ResourcePolicies](https://docs.aws.amazon.com/secretsmanager/latest/userguide/) documentation.

## Minimal Example

This example demonstrates how to create a basic ResourcePolicy for a secret with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicResourcePolicy = await AWS.SecretsManager.ResourcePolicy("BasicResourcePolicy", {
  SecretId: "my-secret-id",
  ResourcePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/MyUser"
        },
        Action: "secretsmanager:GetSecretValue",
        Resource: "*"
      }
    ]
  }),
  BlockPublicPolicy: false // Optional: Specify if public access should be blocked
});
```

## Advanced Configuration

This example shows how to configure a ResourcePolicy with a more complex policy that restricts access based on specific conditions.

```ts
const AdvancedResourcePolicy = await AWS.SecretsManager.ResourcePolicy("AdvancedResourcePolicy", {
  SecretId: "my-advanced-secret-id",
  ResourcePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: "secretsmanager:GetSecretValue",
        Resource: "*",
        Condition: {
          StringEquals: {
            "aws:SourceArn": "arn:aws:lambda:us-east-1:123456789012:function:MyFunction"
          }
        }
      }
    ]
  }),
  BlockPublicPolicy: true // Optional: Enable to block public access
});
```

## Adoption of Existing Resource

This example illustrates how to adopt an existing resource instead of failing if the resource already exists.

```ts
const AdoptExistingResourcePolicy = await AWS.SecretsManager.ResourcePolicy("AdoptExistingResourcePolicy", {
  SecretId: "existing-secret-id",
  ResourcePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/AnotherRole"
        },
        Action: "secretsmanager:DescribeSecret",
        Resource: "*"
      }
    ]
  }),
  adopt: true // Optional: Set to true to adopt existing resource
});
```