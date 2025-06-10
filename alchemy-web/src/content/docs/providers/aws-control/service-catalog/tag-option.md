---
title: TagOption
description: Learn how to create, update, and manage AWS ServiceCatalog TagOptions using Alchemy Cloud Control.
---


The TagOption resource allows you to create and manage [AWS ServiceCatalog TagOptions](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) which are used for tagging products in AWS ServiceCatalog.

## Minimal Example

Create a basic TagOption with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicTagOption = await AWS.ServiceCatalog.TagOption("basicTagOption", {
  Value: "Production",
  Key: "Environment",
  Active: true // Optional property to specify if the tag option is active
});
```

## Advanced Configuration

Create a TagOption with additional attributes while ensuring it is active.

```ts
const advancedTagOption = await AWS.ServiceCatalog.TagOption("advancedTagOption", {
  Value: "Database",
  Key: "ServiceType",
  Active: true, // Ensure the TagOption is active
  adopt: true // Optional property to adopt existing resource if it already exists
});
```

## TagOption for Multiple Environments

Create multiple TagOptions to categorize resources for different environments.

```ts
const devTagOption = await AWS.ServiceCatalog.TagOption("devTagOption", {
  Value: "Development",
  Key: "Environment",
  Active: true
});

const testTagOption = await AWS.ServiceCatalog.TagOption("testTagOption", {
  Value: "Testing",
  Key: "Environment",
  Active: false // This option is not active and won't be used in ServiceCatalog
});
```

## TagOption for Service Classification

Define TagOptions for classifying services within your AWS environment.

```ts
const webServiceTagOption = await AWS.ServiceCatalog.TagOption("webServiceTagOption", {
  Value: "Web Application",
  Key: "ServiceClassification",
  Active: true
});

const apiServiceTagOption = await AWS.ServiceCatalog.TagOption("apiServiceTagOption", {
  Value: "API",
  Key: "ServiceClassification",
  Active: true
});
```
