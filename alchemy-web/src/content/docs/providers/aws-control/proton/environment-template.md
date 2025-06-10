---
title: EnvironmentTemplate
description: Learn how to create, update, and manage AWS Proton EnvironmentTemplates using Alchemy Cloud Control.
---


The EnvironmentTemplate resource lets you create and manage [AWS Proton EnvironmentTemplates](https://docs.aws.amazon.com/proton/latest/userguide/) for deploying and managing environments in AWS Proton.

## Minimal Example

Create a basic environment template with a name and description.

```ts
import AWS from "alchemy/aws/control";

const environmentTemplate = await AWS.Proton.EnvironmentTemplate("basicEnvironmentTemplate", {
  Name: "BasicTemplate",
  Description: "A basic environment template for development purposes",
  Tags: [
    { Key: "Project", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure an environment template with additional properties like encryption key and provisioning type.

```ts
const advancedEnvironmentTemplate = await AWS.Proton.EnvironmentTemplate("advancedEnvironmentTemplate", {
  Name: "AdvancedTemplate",
  Description: "An advanced environment template with encryption and provisioning options",
  EncryptionKey: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-56ef-78gh-90ij-klmnopqrstuv",
  Provisioning: "SERVICE_MANAGED",
  Tags: [
    { Key: "Project", Value: "Production" },
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Adoption of Existing Resources

Create an environment template and adopt an existing resource if it already exists.

```ts
const adoptExistingTemplate = await AWS.Proton.EnvironmentTemplate("existingEnvironmentTemplate", {
  Name: "ExistingTemplate",
  Description: "This template adopts an existing environment resource if found.",
  adopt: true
});
```

## Environment Template with Display Name

Create an environment template that includes a display name for better identification.

```ts
const displayNameTemplate = await AWS.Proton.EnvironmentTemplate("displayNameTemplate", {
  Name: "DisplayNameTemplate",
  Description: "Template with a friendly display name",
  DisplayName: "User Friendly Display Name",
  Tags: [
    { Key: "Application", Value: "MyApp" }
  ]
});
```
