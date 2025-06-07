---
title: Managing AWS Proton EnvironmentTemplates with Alchemy
description: Learn how to create, update, and manage AWS Proton EnvironmentTemplates using Alchemy Cloud Control.
---

# EnvironmentTemplate

The EnvironmentTemplate resource lets you manage [AWS Proton EnvironmentTemplates](https://docs.aws.amazon.com/proton/latest/userguide/) that define runtime environments for your applications.

## Minimal Example

Create a basic EnvironmentTemplate with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicEnvironmentTemplate = await AWS.Proton.EnvironmentTemplate("BasicEnvironmentTemplate", {
  Name: "BasicTemplate",
  Description: "A basic environment template for testing",
  DisplayName: "Basic Environment",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an EnvironmentTemplate with additional properties for encryption and provisioning.

```ts
const AdvancedEnvironmentTemplate = await AWS.Proton.EnvironmentTemplate("AdvancedEnvironmentTemplate", {
  Name: "AdvancedTemplate",
  Description: "An advanced environment template with encryption",
  DisplayName: "Advanced Environment",
  EncryptionKey: "arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ef-ghij-klmnopqrstuv",
  Provisioning: "SELF_SERVICE",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Using an Existing Resource

Adopt an existing EnvironmentTemplate instead of failing if it already exists.

```ts
const AdoptExistingEnvironmentTemplate = await AWS.Proton.EnvironmentTemplate("AdoptExistingEnvironmentTemplate", {
  Name: "ExistingTemplate",
  adopt: true,
  Description: "Adopting an existing environment template if it exists",
  DisplayName: "Existing Environment"
});
```