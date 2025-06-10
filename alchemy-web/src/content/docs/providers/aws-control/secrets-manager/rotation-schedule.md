---
title: RotationSchedule
description: Learn how to create, update, and manage AWS SecretsManager RotationSchedules using Alchemy Cloud Control.
---


The RotationSchedule resource allows you to manage [AWS SecretsManager RotationSchedules](https://docs.aws.amazon.com/secretsmanager/latest/userguide/) to automate the rotation of secrets in AWS Secrets Manager.

## Minimal Example

Create a basic rotation schedule for a secret with a specified rotation Lambda ARN and rotation rules:

```ts
import AWS from "alchemy/aws/control";

const rotationSchedule = await AWS.SecretsManager.RotationSchedule("myRotationSchedule", {
  SecretId: "mySecretId",
  RotationLambdaARN: "arn:aws:lambda:us-east-1:123456789012:function:myRotationFunction",
  RotationRules: {
    AutomaticallyAfterDays: 30
  },
  RotateImmediatelyOnUpdate: true
});
```

## Advanced Configuration

Configure a rotation schedule with a custom hosted rotation Lambda and immediate rotation on update:

```ts
const advancedRotationSchedule = await AWS.SecretsManager.RotationSchedule("advancedRotationSchedule", {
  SecretId: "myAdvancedSecretId",
  HostedRotationLambda: {
    Name: "myHostedRotationLambda"
  },
  RotationRules: {
    AutomaticallyAfterDays: 15,
    Duration: "PT1H" // Rotation duration of 1 hour
  },
  RotateImmediatelyOnUpdate: false
});
```

## Using Adoption for Existing Resources

If you want to adopt an existing rotation schedule instead of creating a new one, you can set the `adopt` property to true:

```ts
const adoptedRotationSchedule = await AWS.SecretsManager.RotationSchedule("adoptedRotationSchedule", {
  SecretId: "existingSecretId",
  RotationRules: {
    AutomaticallyAfterDays: 60
  },
  adopt: true // This will attempt to adopt the existing resource
});
```

## Complete Custom Rotation Configuration

Create a rotation schedule with custom rotation rules and a Lambda function:

```ts
const customLambdaRotationSchedule = await AWS.SecretsManager.RotationSchedule("customLambdaRotationSchedule", {
  SecretId: "customSecretId",
  RotationLambdaARN: "arn:aws:lambda:us-west-2:123456789012:function:customRotationFunction",
  RotationRules: {
    AutomaticallyAfterDays: 14,
    Duration: "PT2H" // Rotation duration of 2 hours
  },
  RotateImmediatelyOnUpdate: true,
  HostedRotationLambda: {
    Name: "customHostedRotationLambda"
  }
});
```
