---
title: Application
description: Learn how to create, update, and manage AWS M2 Applications using Alchemy Cloud Control.
---


The Application resource lets you manage [AWS M2 Applications](https://docs.aws.amazon.com/m2/latest/userguide/) and their configurations in the AWS Cloud environment.

## Minimal Example

Create a basic M2 Application with required properties and a few optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicApplication = await AWS.M2.Application("myBasicApplication", {
  name: "MyBasicApp",
  engineType: "JVM",
  description: "A basic M2 application for demonstration purposes."
});
```

## Advanced Configuration

Configure an M2 Application with additional settings including role and KMS key for enhanced security.

```ts
const advancedApplication = await AWS.M2.Application("myAdvancedApplication", {
  name: "MyAdvancedApp",
  engineType: "JVM",
  description: "An advanced M2 application with security features.",
  roleArn: "arn:aws:iam::123456789012:role/MyM2ApplicationRole",
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  tags: {
    Environment: "Production",
    Department: "Finance"
  }
});
```

## Adoption of Existing Resource

Create an application that adopts an existing resource instead of failing if it already exists.

```ts
const adoptApplication = await AWS.M2.Application("myAdoptedApplication", {
  name: "MyAdoptedApp",
  engineType: "JVM",
  adopt: true // This will allow the resource to adopt if it already exists
});
```

## Application with Custom Definition

Define an M2 Application with a specific definition to customize its behavior.

```ts
const customDefinition = {
  // Example structure for the definition
  runtime: "java",
  source: {
    type: "git",
    uri: "https://github.com/myorg/myapp.git",
    branch: "main"
  },
  settings: {
    memory: "512MB",
    timeout: 30
  }
};

const applicationWithDefinition = await AWS.M2.Application("myCustomDefinitionApplication", {
  name: "MyCustomDefinitionApp",
  engineType: "JVM",
  definition: customDefinition
});
```
