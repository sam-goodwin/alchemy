---
title: Managing AWS DataZone Projects with Alchemy
description: Learn how to create, update, and manage AWS DataZone Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you create and manage [AWS DataZone Projects](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-project.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const project = await AWS.DataZone.Project("project-example", {
  Name: "project-",
  DomainIdentifier: "example-domainidentifier",
  Description: "A project resource managed by Alchemy",
});
```

## Advanced Configuration

Create a project with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedProject = await AWS.DataZone.Project("advanced-project", {
  Name: "project-",
  DomainIdentifier: "example-domainidentifier",
  Description: "A project resource managed by Alchemy",
});
```

