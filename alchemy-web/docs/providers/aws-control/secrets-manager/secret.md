---
title: Managing AWS SecretsManager Secrets with Alchemy
description: Learn how to create, update, and manage AWS SecretsManager Secrets using Alchemy Cloud Control.
---

# Secret

The Secret resource allows you to manage [AWS SecretsManager Secrets](https://docs.aws.amazon.com/secretsmanager/latest/userguide/) for securely storing and accessing sensitive information such as passwords, API keys, and other secrets.

## Minimal Example

Create a basic Secret with a name and a secret string.

```ts
import AWS from "alchemy/aws/control";

const mySecret = await AWS.SecretsManager.Secret("MySecret", {
  Name: "MyDatabasePassword",
  SecretString: "SuperSecretPassword123"
});
```

## Advanced Configuration

Configure a Secret with encryption using a KMS key and additional tags.

```ts
const advancedSecret = await AWS.SecretsManager.Secret("AdvancedSecret", {
  Name: "MyAdvancedSecret",
  SecretString: "AnotherSuperSecretPassword!",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "MyApp" }
  ]
});
```

## Generating Secret Strings

Create a Secret that generates a secret string with specific requirements.

```ts
const generatedSecret = await AWS.SecretsManager.Secret("GeneratedSecret", {
  Name: "DynamicSecret",
  GenerateSecretString: {
    SecretStringTemplate: '{"username":"admin"}',
    GenerateStringKey: "password",
    PasswordLength: 12,
    ExcludeCharacters: "'\"\\"
  }
});
```

## Replica Regions

Configure a Secret that is replicated across multiple regions.

```ts
const replicatedSecret = await AWS.SecretsManager.Secret("ReplicatedSecret", {
  Name: "GlobalSecret",
  SecretString: "GlobalSecretValue",
  ReplicaRegions: [
    { Region: "us-west-2" },
    { Region: "eu-central-1" }
  ]
});
```