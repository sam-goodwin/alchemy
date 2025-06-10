---
title: SecretTargetAttachment
description: Learn how to create, update, and manage AWS SecretsManager SecretTargetAttachments using Alchemy Cloud Control.
---


The SecretTargetAttachment resource allows you to manage the association between a secret in AWS Secrets Manager and a specific target, such as an AWS resource. For more information, visit the [AWS SecretsManager SecretTargetAttachments documentation](https://docs.aws.amazon.com/secretsmanager/latest/userguide/).

## Minimal Example

This example demonstrates creating a basic SecretTargetAttachment with required properties.

```ts
import AWS from "alchemy/aws/control";

const secretTargetAttachment = await AWS.SecretsManager.SecretTargetAttachment("mySecretAttachment", {
  SecretId: "mySecretId",
  TargetType: "AWS::RDS::DBInstance",
  TargetId: "myDatabaseInstanceId",
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

In this example, we configure a SecretTargetAttachment with a different target type and an optional property.

```ts
const advancedSecretTargetAttachment = await AWS.SecretsManager.SecretTargetAttachment("advancedSecretAttachment", {
  SecretId: "myAnotherSecretId",
  TargetType: "AWS::Lambda::Function",
  TargetId: "myLambdaFunctionId",
  adopt: false // Optional: do not adopt existing resource
});
```

## Use Case: Attaching a Secret to an RDS Instance

This example shows how to attach a secret to an RDS database instance for enhanced security.

```ts
const rdsSecretAttachment = await AWS.SecretsManager.SecretTargetAttachment("rdsSecretAttachment", {
  SecretId: "myRdsSecretId",
  TargetType: "AWS::RDS::DBInstance",
  TargetId: "myProductionDatabase",
  adopt: true
});
```

## Use Case: Attaching a Secret to a Lambda Function

Here, we create a SecretTargetAttachment for a Lambda function to securely access its secrets.

```ts
const lambdaSecretAttachment = await AWS.SecretsManager.SecretTargetAttachment("lambdaSecretAttachment", {
  SecretId: "myLambdaSecretId",
  TargetType: "AWS::Lambda::Function",
  TargetId: "myFunctionId",
  adopt: false
});
```
