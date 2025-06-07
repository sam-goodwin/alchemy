---
title: Managing AWS DataBrew Projects with Alchemy
description: Learn how to create, update, and manage AWS DataBrew Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you manage [AWS DataBrew Projects](https://docs.aws.amazon.com/databrew/latest/userguide/) for data preparation and transformation tasks.

## Minimal Example

Create a basic DataBrew project with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicProject = await AWS.DataBrew.Project("basic-data-brew-project", {
  RecipeName: "my-data-recipe",
  DatasetName: "my-dataset",
  RoleArn: "arn:aws:iam::123456789012:role/my-data-brew-role",
  Sample: {
    Size: 1000,
    Type: "Random"
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataScience" }
  ],
  Name: "BasicDataBrewProject"
});
```

## Advanced Configuration

Configure a DataBrew project with additional settings for sample size and custom role ARN.

```ts
const advancedProject = await AWS.DataBrew.Project("advanced-data-brew-project", {
  RecipeName: "my-advanced-recipe",
  DatasetName: "my-advanced-dataset",
  RoleArn: "arn:aws:iam::123456789012:role/my-advanced-data-brew-role",
  Sample: {
    Size: 5000,
    Type: "FirstN"
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ],
  Name: "AdvancedDataBrewProject"
});
```

## Role ARN Example

Create a DataBrew project using a specific IAM role for enhanced security.

```ts
const roleProject = await AWS.DataBrew.Project("role-based-data-brew-project", {
  RecipeName: "my-secure-recipe",
  DatasetName: "my-secure-dataset",
  RoleArn: "arn:aws:iam::123456789012:role/my-secure-data-brew-role",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Analytics" }
  ],
  Name: "RoleBasedDataBrewProject"
});
```

## Using Tags for Resource Management

Manage your DataBrew projects effectively by utilizing tags for resource organization.

```ts
const taggedProject = await AWS.DataBrew.Project("tagged-data-brew-project", {
  RecipeName: "my-tagged-recipe",
  DatasetName: "my-tagged-dataset",
  RoleArn: "arn:aws:iam::123456789012:role/my-tagged-data-brew-role",
  Tags: [
    { Key: "Environment", Value: "test" },
    { Key: "Project", Value: "DataPreparation" }
  ],
  Name: "TaggedDataBrewProject"
});
```