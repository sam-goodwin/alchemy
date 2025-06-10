---
title: RepositoryCreationTemplate
description: Learn how to create, update, and manage AWS ECR RepositoryCreationTemplates using Alchemy Cloud Control.
---


The RepositoryCreationTemplate resource allows you to define a template for creating Amazon Elastic Container Registry (ECR) repositories. For more detailed information, refer to the [AWS ECR RepositoryCreationTemplates documentation](https://docs.aws.amazon.com/ecr/latest/userguide/).

## Minimal Example

Create a basic repository creation template with essential properties.

```ts
import AWS from "alchemy/aws/control";

const basicTemplate = await AWS.ECR.RepositoryCreationTemplate("basicTemplate", {
  AppliedFor: ["teamA", "teamB"],
  Prefix: "my-app",
  Description: "Template for my application repositories",
  ImageTagMutability: "MUTABLE"
});
```

## Advanced Configuration

Configure a repository creation template with enhanced security settings and lifecycle policies.

```ts
const advancedTemplate = await AWS.ECR.RepositoryCreationTemplate("advancedTemplate", {
  AppliedFor: ["teamC"],
  Prefix: "secure-app",
  Description: "Template for secure application repositories",
  ImageTagMutability: "IMMUTABLE",
  LifecyclePolicy: JSON.stringify({
    rules: [
      {
        rulePriority: 1,
        selectionCriteria: {
          tagStatus: "ANY"
        },
        action: {
          type: "EXPIRY",
          expiry: { days: 30 }
        }
      }
    ]
  }),
  ResourceTags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Owner", Value: "TeamC" }
  ]
});
```

## Custom Role and Encryption Configuration

Define a repository creation template that specifies a custom IAM role and encryption configuration.

```ts
const secureTemplate = await AWS.ECR.RepositoryCreationTemplate("secureTemplate", {
  AppliedFor: ["teamD"],
  Prefix: "encrypted-app",
  Description: "Template for encrypted application repositories",
  CustomRoleArn: "arn:aws:iam::123456789012:role/MyECRRole",
  EncryptionConfiguration: {
    EncryptionType: "AES256"
  }
});
```

## Policy and Additional Tags

Create a template that includes a repository policy and additional resource tags.

```ts
const policyTemplate = await AWS.ECR.RepositoryCreationTemplate("policyTemplate", {
  AppliedFor: ["teamE"],
  Prefix: "policy-app",
  Description: "Template for repositories with policies",
  RepositoryPolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "AllowPull",
        Effect: "Allow",
        Principal: {
          AWS: "arn:aws:iam::123456789012:role/MyPullRole"
        },
        Action: "ecr:BatchGetImage"
      }
    ]
  }),
  ResourceTags: [
    { Key: "Project", Value: "PolicyProject" },
    { Key: "Department", Value: "Engineering" }
  ]
});
```
