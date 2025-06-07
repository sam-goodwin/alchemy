---
title: Managing AWS DataBrew Jobs with Alchemy
description: Learn how to create, update, and manage AWS DataBrew Jobs using Alchemy Cloud Control.
---

# Job

The Job resource lets you create and manage [AWS DataBrew Jobs](https://docs.aws.amazon.com/databrew/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-databrew-job.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const job = await AWS.DataBrew.Job("job-example", {
  RoleArn: "example-rolearn",
  Name: "job-",
  Type: "example-type",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a job with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedJob = await AWS.DataBrew.Job("advanced-job", {
  RoleArn: "example-rolearn",
  Name: "job-",
  Type: "example-type",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

