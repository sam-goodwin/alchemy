---
title: ResourcePolicy
description: Learn how to create, update, and manage AWS SecretsManager ResourcePolicys using Alchemy Cloud Control.
---


The ResourcePolicy resource allows you to manage access policies for AWS Secrets Manager secrets, enabling fine-grained control over who can access specific secrets. For more detailed information, refer to the [AWS SecretsManager ResourcePolicys](https://docs.aws.amazon.com/secretsmanager/latest/userguide/).

## Minimal Example

Create a basic resource policy for a secret, specifying the secret ID and a simple resource policy.

```ts
import AWS from "alchemy/aws/control";

const minimalResourcePolicy = await AWS.SecretsManager.ResourcePolicy("myResourcePolicy", {
  SecretId: "mySecretId",
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:user/MyUser"
        },
        Action: "secretsmanager:GetSecretValue",
        Resource: "arn:aws:secretsmanager:us-west-2:123456789012:secret:mySecretId-123456"
      }
    ]
  }
});
```

## Advanced Configuration

Configure a resource policy with additional options, including blocking public access.

```ts
const advancedResourcePolicy = await AWS.SecretsManager.ResourcePolicy("advancedResourcePolicy", {
  SecretId: "myAdvancedSecretId",
  BlockPublicPolicy: true,
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyRole"
        },
        Action: [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ],
        Resource: "arn:aws:secretsmanager:us-west-2:123456789012:secret:myAdvancedSecretId-abcdef"
      }
    ]
  }
});
```

## Example with Adoption of Existing Resource

This example demonstrates how to adopt an existing resource policy without failing if the resource already exists.

```ts
const adoptedResourcePolicy = await AWS.SecretsManager.ResourcePolicy("adoptedPolicy", {
  SecretId: "myExistingSecretId",
  adopt: true,
  ResourcePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:service-role/MyServiceRole"
        },
        Action: "secretsmanager:PutSecretValue",
        Resource: "arn:aws:secretsmanager:us-west-2:123456789012:secret:myExistingSecretId-ghijkl"
      }
    ]
  }
});
```
