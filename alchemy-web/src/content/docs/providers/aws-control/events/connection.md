---
title: Connection
description: Learn how to create, update, and manage AWS Events Connections using Alchemy Cloud Control.
---


The Connection resource allows you to manage [AWS Events Connections](https://docs.aws.amazon.com/events/latest/userguide/) that facilitate communication between AWS services and external systems. 

## Minimal Example

Create a basic connection with essential properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicConnection = await AWS.Events.Connection("myBasicConnection", {
  name: "MyBasicConnection",
  description: "This connection is used for basic event triggers.",
  authorizationType: "API_KEY",
  authParameters: {
    apiKey: "myApiKey123"
  }
});
```

## Advanced Configuration

Configure a connection with advanced options, including KMS key identifier and invocation connectivity parameters.

```ts
const advancedConnection = await AWS.Events.Connection("myAdvancedConnection", {
  name: "MyAdvancedConnection",
  description: "This connection includes advanced security configurations.",
  authorizationType: "AWS_IAM",
  kmsKeyIdentifier: "arn:aws:kms:us-west-2:123456789012:key/my-key-id",
  invocationConnectivityParameters: {
    connectTimeoutSeconds: 10,
    readTimeoutSeconds: 30
  },
  authParameters: {
    username: "myUsername",
    password: "myPassword"
  }
});
```

## Connection with Custom Invocation Parameters

Create a connection that specifies custom invocation connectivity parameters for fine-tuned control over how events are processed.

```ts
const customInvocationConnection = await AWS.Events.Connection("myCustomInvocationConnection", {
  name: "MyCustomInvocationConnection",
  description: "This connection has specific invocation parameters.",
  authorizationType: "API_KEY",
  invocationConnectivityParameters: {
    connectTimeoutSeconds: 15,
    readTimeoutSeconds: 45,
    maxRetries: 3
  },
  authParameters: {
    apiKey: "myCustomApiKey123"
  }
});
```

## Connection with KMS Key for Encryption

Set up a connection that uses a KMS key for enhanced security.

```ts
const encryptedConnection = await AWS.Events.Connection("myEncryptedConnection", {
  name: "MyEncryptedConnection",
  description: "This connection uses KMS for encrypting sensitive data.",
  authorizationType: "AWS_IAM",
  kmsKeyIdentifier: "arn:aws:kms:us-east-1:123456789012:key/my-kms-key-id",
  authParameters: {
    oauthToken: "myOauthToken"
  }
});
```
