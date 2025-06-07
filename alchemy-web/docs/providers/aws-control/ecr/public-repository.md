---
title: Managing AWS ECR PublicRepositorys with Alchemy
description: Learn how to create, update, and manage AWS ECR PublicRepositorys using Alchemy Cloud Control.
---

# PublicRepository

The PublicRepository resource lets you create and manage [AWS ECR PublicRepositorys](https://docs.aws.amazon.com/ecr/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecr-publicrepository.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const publicrepository = await AWS.ECR.PublicRepository("publicrepository-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a publicrepository with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedPublicRepository = await AWS.ECR.PublicRepository("advanced-publicrepository", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

