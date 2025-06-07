---
title: Managing AWS ServiceCatalog TagOptions with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalog TagOptions using Alchemy Cloud Control.
---

# TagOption

The TagOption resource allows you to create and manage [AWS ServiceCatalog TagOptions](https://docs.aws.amazon.com/servicecatalog/latest/userguide/) that can be used to tag AWS resources for better organization and management.

## Minimal Example

Create a basic TagOption with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicTagOption = await AWS.ServiceCatalog.TagOption("BasicTagOption", {
  Key: "Environment",
  Value: "Production",
  Active: true // This TagOption is active
});
```

## Advanced Configuration

Create a TagOption with multiple TagOptions to represent different environments.

```ts
const stagingTagOption = await AWS.ServiceCatalog.TagOption("StagingTagOption", {
  Key: "Environment",
  Value: "Staging",
  Active: true
});

const testingTagOption = await AWS.ServiceCatalog.TagOption("TestingTagOption", {
  Key: "Environment",
  Value: "Testing",
  Active: false // This TagOption is inactive
});
```

## Adoption of Existing TagOptions

Create a TagOption that adopts an existing resource instead of failing if it already exists.

```ts
const existingTagOption = await AWS.ServiceCatalog.TagOption("ExistingTagOption", {
  Key: "Project",
  Value: "Migration",
  Active: true,
  adopt: true // Adopt existing resource if it exists
});
```

## Example with Multiple Tags

Create multiple TagOptions that can be used together to represent a project and its environment.

```ts
const projectTagOption = await AWS.ServiceCatalog.TagOption("ProjectTagOption", {
  Key: "Project",
  Value: "WebsiteRedesign",
  Active: true
});

const teamTagOption = await AWS.ServiceCatalog.TagOption("TeamTagOption", {
  Key: "Team",
  Value: "WebDevelopment",
  Active: true
});
```