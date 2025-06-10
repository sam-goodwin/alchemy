---
title: RegistryPolicy
description: Learn how to create, update, and manage AWS ECR RegistryPolicys using Alchemy Cloud Control.
---


The RegistryPolicy resource allows you to manage the registry policies for Amazon Elastic Container Registry (ECR), enabling you to set permissions for your container images. For more information, visit the [AWS ECR RegistryPolicys documentation](https://docs.aws.amazon.com/ecr/latest/userguide/).

## Minimal Example

Create a basic registry policy that grants permissions to a specific IAM role.

```ts
import AWS from "alchemy/aws/control";

const basicRegistryPolicy = await AWS.ECR.RegistryPolicy("basicRegistryPolicy", {
  PolicyText: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyECRAccessRole"
        },
        Action: "ecr:*",
        Resource: "*"
      }
    ]
  }
});
```

## Advanced Configuration

Define a more complex registry policy that includes multiple statements and conditions.

```ts
const advancedRegistryPolicy = await AWS.ECR.RegistryPolicy("advancedRegistryPolicy", {
  PolicyText: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyECRAccessRole"
        },
        Action: "ecr:PutImage",
        Resource: "*",
        Condition: {
          StringEquals: {
            "ecr:repositoryName": "my-repo"
          }
        }
      },
      {
        Effect: "Deny",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/RestrictedRole"
        },
        Action: "ecr:DeleteRepository",
        Resource: "*"
      }
    ]
  }
});
```

## Example with Adoption

Create a registry policy that adopts an existing resource if it already exists, avoiding failure.

```ts
const adoptRegistryPolicy = await AWS.ECR.RegistryPolicy("adoptRegistryPolicy", {
  PolicyText: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyECRAccessRole"
        },
        Action: "ecr:BatchGetImage",
        Resource: "*"
      }
    ]
  },
  adopt: true
});
```
