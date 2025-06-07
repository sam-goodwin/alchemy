---
title: Managing AWS DataZone Environments with Alchemy
description: Learn how to create, update, and manage AWS DataZone Environments using Alchemy Cloud Control.
---

# Environment

The Environment resource lets you create and manage [AWS DataZone Environments](https://docs.aws.amazon.com/datazone/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-datazone-environment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const environment = await AWS.DataZone.Environment("environment-example", {
  ProjectIdentifier: "example-projectidentifier",
  Name: "environment-",
  DomainIdentifier: "example-domainidentifier",
  Description: "A environment resource managed by Alchemy",
});
```

## Advanced Configuration

Create a environment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedEnvironment = await AWS.DataZone.Environment("advanced-environment", {
  ProjectIdentifier: "example-projectidentifier",
  Name: "environment-",
  DomainIdentifier: "example-domainidentifier",
  Description: "A environment resource managed by Alchemy",
});
```

