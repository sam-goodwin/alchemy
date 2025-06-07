---
title: Managing AWS SSM Parameters with Alchemy
description: Learn how to create, update, and manage AWS SSM Parameters using Alchemy Cloud Control.
---

# Parameter

The Parameter resource lets you manage [AWS SSM Parameters](https://docs.aws.amazon.com/ssm/latest/userguide/) for storing configuration data and secrets.

## Minimal Example

Create a basic SSM Parameter with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicParameter = await AWS.SSM.Parameter("BasicParameter", {
  Type: "String",
  Value: "MySuperSecretValue",
  Description: "This parameter stores a super secret value."
});
```

## Advanced Configuration

Configure a parameter with advanced settings, including policies and tags.

```ts
const AdvancedParameter = await AWS.SSM.Parameter("AdvancedParameter", {
  Type: "SecureString",
  Value: "EncryptedValue123",
  Policies: JSON.stringify([{
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Action: "ssm:GetParameter",
      Resource: "*"
    }]
  }]),
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ],
  Tier: "Standard"
});
```

## Using Allowed Patterns

Create a parameter with an allowed pattern to enforce value formatting.

```ts
const PatternParameter = await AWS.SSM.Parameter("PatternParameter", {
  Type: "String",
  Value: "ValidValue-123",
  AllowedPattern: "^[A-Za-z0-9_-]+$",
  Description: "This parameter value must match the allowed pattern."
});
```

## Storing Sensitive Data

Store sensitive data securely as a SecureString.

```ts
const SecretParameter = await AWS.SSM.Parameter("SecretParameter", {
  Type: "SecureString",
  Value: "SensitiveDatabasePassword",
  Description: "This parameter stores the database password securely.",
  DataType: "text"
});
``` 

## Updating an Existing Parameter

Demonstrate how to update an existing SSM Parameter.

```ts
const UpdatedParameter = await AWS.SSM.Parameter("UpdatedParameter", {
  Type: "String",
  Value: "UpdatedValue",
  Description: "This parameter has been updated."
});
```