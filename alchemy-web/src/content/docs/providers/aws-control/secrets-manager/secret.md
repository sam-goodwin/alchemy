---
title: Secret
description: Learn how to create, update, and manage AWS SecretsManager Secrets using Alchemy Cloud Control.
---


The Secret resource allows you to manage [AWS SecretsManager Secrets](https://docs.aws.amazon.com/secretsmanager/latest/userguide/) for storing and retrieving sensitive information, such as API keys or passwords.

## Minimal Example

Create a basic secret with a name and secret string.

```ts
import AWS from "alchemy/aws/control";

const basicSecret = await AWS.SecretsManager.Secret("basicSecret", {
  Name: "MyDatabasePassword",
  SecretString: JSON.stringify({
    username: "dbUser",
    password: "SuperSecretPassword123"
  }),
  Description: "This secret holds the database credentials."
});
```

## Advanced Configuration

Configure a secret with KMS encryption and automatic secret rotation.

```ts
const advancedSecret = await AWS.SecretsManager.Secret("advancedSecret", {
  Name: "MyAPIKey",
  SecretString: JSON.stringify({
    apiKey: "12345-ABCDE-67890-FGHIJ"
  }),
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  Description: "This secret holds the API key for external service.",
  GenerateSecretString: {
    SecretStringTemplate: JSON.stringify({ prefix: "api_" }),
    GenerateStringKey: "apiKey",
    PasswordLength: 16,
    ExcludeCharacters: "!@#$%^&*()"
  }
});
```

## With Replica Regions

Create a secret that is replicated across multiple regions for disaster recovery.

```ts
const replicatedSecret = await AWS.SecretsManager.Secret("replicatedSecret", {
  Name: "MyGlobalSecret",
  SecretString: JSON.stringify({
    globalKey: "GlobalSecretValue"
  }),
  ReplicaRegions: [
    { Region: "us-east-1" },
    { Region: "eu-west-1" }
  ],
  Description: "This secret is replicated across multiple regions."
});
```

## Using Tags for Organization

Create a secret with tags for better organization and management.

```ts
const taggedSecret = await AWS.SecretsManager.Secret("taggedSecret", {
  Name: "MyServiceCredentials",
  SecretString: JSON.stringify({
    serviceUser: "serviceUser",
    servicePassword: "ServicePassword123"
  }),
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "MyAwesomeProject" }
  ],
  Description: "This secret holds credentials for My Awesome Project service."
});
```
