---
title: Managing AWS SecretsManager SecretTargetAttachments with Alchemy
description: Learn how to create, update, and manage AWS SecretsManager SecretTargetAttachments using Alchemy Cloud Control.
---

# SecretTargetAttachment

The SecretTargetAttachment resource lets you manage [AWS SecretsManager SecretTargetAttachments](https://docs.aws.amazon.com/secretsmanager/latest/userguide/) that allow you to associate a secret with specific AWS resources.

## Minimal Example

Create a basic SecretTargetAttachment that links a secret to an RDS database instance:

```ts
import AWS from "alchemy/aws/control";

const SecretAttachment = await AWS.SecretsManager.SecretTargetAttachment("MySecretAttachment", {
  SecretId: "arn:aws:secretsmanager:us-west-2:123456789012:secret:my-database-secret",
  TargetType: "AWS::RDS::DBInstance",
  TargetId: "my-database-instance"
});
```

## Advanced Configuration

Configure a SecretTargetAttachment with an adoption policy for existing resources:

```ts
const AdvancedSecretAttachment = await AWS.SecretsManager.SecretTargetAttachment("AdvancedSecretAttachment", {
  SecretId: "arn:aws:secretsmanager:us-west-2:123456789012:secret:my-advanced-secret",
  TargetType: "AWS::RDS::DBInstance",
  TargetId: "my-advanced-database-instance",
  adopt: true // Allows adopting an existing resource if it already exists
});
```

## Using with IAM Policies

Link a secret to a Lambda function with specific permissions:

```ts
const LambdaSecretAttachment = await AWS.SecretsManager.SecretTargetAttachment("LambdaSecretAttachment", {
  SecretId: "arn:aws:secretsmanager:us-west-2:123456789012:secret:my-lambda-secret",
  TargetType: "AWS::Lambda::Function",
  TargetId: "my-lambda-function"
});

// Example IAM Policy for the Lambda function to access the secret
const iamPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "secretsmanager:GetSecretValue",
      Resource: "arn:aws:secretsmanager:us-west-2:123456789012:secret:my-lambda-secret"
    }
  ]
};
```

## Multiple Secret Attachments

Illustrate how to create multiple SecretTargetAttachments for various services:

```ts
const RDSSecretAttachment = await AWS.SecretsManager.SecretTargetAttachment("RDSSecretAttachment", {
  SecretId: "arn:aws:secretsmanager:us-west-2:123456789012:secret:rds-database-secret",
  TargetType: "AWS::RDS::DBInstance",
  TargetId: "my-rds-instance"
});

const LambdaSecretAttachmentMultiple = await AWS.SecretsManager.SecretTargetAttachment("LambdaSecretAttachmentMultiple", {
  SecretId: "arn:aws:secretsmanager:us-west-2:123456789012:secret:lambda-database-secret",
  TargetType: "AWS::Lambda::Function",
  TargetId: "my-another-lambda-function"
});
```