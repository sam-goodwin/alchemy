---
title: Parameter
description: Learn how to create, update, and manage AWS SSM Parameters using Alchemy Cloud Control.
---


The Parameter resource allows you to manage [AWS SSM Parameters](https://docs.aws.amazon.com/ssm/latest/userguide/) for storing configuration data and secrets. This includes creating, updating, and deleting parameters within the AWS Systems Manager Parameter Store.

## Minimal Example

This example demonstrates how to create a basic SSM Parameter with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicParameter = await AWS.SSM.Parameter("basicParameter", {
  Type: "String",
  Value: "my-secret-value",
  Description: "This is a basic SSM parameter for storing a secret value."
});
```

## Advanced Configuration

In this example, we create a parameter with additional configurations such as policies and tags for better management.

```ts
const advancedParameter = await AWS.SSM.Parameter("advancedParameter", {
  Type: "SecureString",
  Value: "my-secure-secret-value",
  Description: "This parameter stores a secure string value.",
  Policies: JSON.stringify([
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "AllowReadAccess",
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::123456789012:role/MyRole"
          },
          "Action": "ssm:GetParameter",
          "Resource": "*"
        }
      ]
    }
  ]),
  Tags: {
    Environment: "Production",
    Application: "MyApp"
  }
});
```

## Using Allowed Pattern

Here, we create a parameter that enforces a specific pattern for the parameter value.

```ts
const patternedParameter = await AWS.SSM.Parameter("patternedParameter", {
  Type: "String",
  Value: "valid-value-123",
  AllowedPattern: "valid-value-\\d+",
  Description: "This parameter only allows values matching the specified pattern."
});
```

## Using DataType

In this example, we define a parameter with a specific data type, making it easier to manage different types of configuration data.

```ts
const typedParameter = await AWS.SSM.Parameter("typedParameter", {
  Type: "StringList",
  Value: "value1,value2,value3",
  DataType: "text",
  Description: "This parameter holds a list of string values."
});
```

## Adoption of Existing Resource

This example shows how to adopt an existing SSM Parameter instead of failing if it already exists.

```ts
const adoptedParameter = await AWS.SSM.Parameter("adoptedParameter", {
  Type: "String",
  Value: "existing-value",
  adopt: true,
  Description: "This parameter will adopt an existing parameter if it is already present."
});
```
