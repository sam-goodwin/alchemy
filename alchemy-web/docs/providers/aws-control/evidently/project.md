---
title: Managing AWS Evidently Projects with Alchemy
description: Learn how to create, update, and manage AWS Evidently Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you create and manage [AWS Evidently Projects](https://docs.aws.amazon.com/evidently/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-evidently-project.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const project = await AWS.Evidently.Project("project-example", {
  Name: "project-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A project resource managed by Alchemy",
});
```

## Advanced Configuration

Create a project with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProject = await AWS.Evidently.Project("advanced-project", {
  Name: "project-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A project resource managed by Alchemy",
});
```

