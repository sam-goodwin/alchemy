---
title: Tag
description: Learn how to create, update, and manage AWS LakeFormation Tags using Alchemy Cloud Control.
---


The Tag resource lets you manage [AWS LakeFormation Tags](https://docs.aws.amazon.com/lakeformation/latest/userguide/) which are used to categorize data in AWS LakeFormation for better management and governance.

## Minimal Example

Create a basic LakeFormation Tag with required properties.

```ts
import AWS from "alchemy/aws/control";

const lakeFormationTag = await AWS.LakeFormation.Tag("basicTag", {
  TagKey: "Department",
  TagValues: ["Finance", "HR"],
  CatalogId: "123456789012" // Optional: Specify your AWS account ID
});
```

## Advanced Configuration

Configure a LakeFormation Tag with additional properties like adopting an existing resource.

```ts
const advancedTag = await AWS.LakeFormation.Tag("advancedTag", {
  TagKey: "Project",
  TagValues: ["ProjectA", "ProjectB"],
  CatalogId: "123456789012", // Optional
  adopt: true // Set to true to adopt existing resource if it exists
});
```

## Use Case: Managing Multiple Tags

Create multiple tags for organizing data assets effectively.

```ts
const financeTag = await AWS.LakeFormation.Tag("financeTag", {
  TagKey: "Category",
  TagValues: ["Financial", "Audit"],
  CatalogId: "123456789012"
});

const hrTag = await AWS.LakeFormation.Tag("hrTag", {
  TagKey: "Category",
  TagValues: ["EmployeeData", "Recruitment"],
  CatalogId: "123456789012"
});
```

## Use Case: Tagging Data Catalog Items

Demonstrate how to tag an existing data catalog item by creating a tag.

```ts
const dataCatalogTag = await AWS.LakeFormation.Tag("dataCatalogTag", {
  TagKey: "Confidentiality",
  TagValues: ["Restricted"],
  CatalogId: "123456789012"
});
```
