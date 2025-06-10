---
title: Project
description: Learn how to create, update, and manage AWS DataBrew Projects using Alchemy Cloud Control.
---


The Project resource allows you to manage [AWS DataBrew Projects](https://docs.aws.amazon.com/databrew/latest/userguide/) for data preparation and transformation workflows.

## Minimal Example

Create a basic DataBrew project with required properties and one optional sample configuration.

```ts
import AWS from "alchemy/aws/control";

const basicDataBrewProject = await AWS.DataBrew.Project("basic-project", {
  name: "SalesDataProject",
  recipeName: "SalesDataRecipe",
  datasetName: "SalesDataset",
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Role",
  sample: {
    size: 1000,
    type: "FIRST_N"
  }
});
```

## Advanced Configuration

Configure a DataBrew project with tags and without a sample configuration.

```ts
const advancedDataBrewProject = await AWS.DataBrew.Project("advanced-project", {
  name: "CustomerDataProject",
  recipeName: "CustomerDataRecipe",
  datasetName: "CustomerDataset",
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Role",
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Department", value: "Marketing" }
  ]
});
```

## Integration with Existing Resources

Create a DataBrew project that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedDataBrewProject = await AWS.DataBrew.Project("adopted-project", {
  name: "InventoryDataProject",
  recipeName: "InventoryDataRecipe",
  datasetName: "InventoryDataset",
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Role",
  adopt: true
});
```

## Project Without Tags

Demonstrate creating a DataBrew project without any tags or optional parameters.

```ts
const simpleDataBrewProject = await AWS.DataBrew.Project("simple-project", {
  name: "SimpleDataProject",
  recipeName: "SimpleRecipe",
  datasetName: "SimpleDataset",
  roleArn: "arn:aws:iam::123456789012:role/DataBrew-Role"
});
```
