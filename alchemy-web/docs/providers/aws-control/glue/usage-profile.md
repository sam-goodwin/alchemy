---
title: Managing AWS Glue UsageProfiles with Alchemy
description: Learn how to create, update, and manage AWS Glue UsageProfiles using Alchemy Cloud Control.
---

# UsageProfile

The UsageProfile resource lets you create and manage [AWS Glue UsageProfiles](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-usageprofile.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const usageprofile = await AWS.Glue.UsageProfile("usageprofile-example", {
  Name: "usageprofile-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A usageprofile resource managed by Alchemy",
});
```

## Advanced Configuration

Create a usageprofile with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedUsageProfile = await AWS.Glue.UsageProfile("advanced-usageprofile", {
  Name: "usageprofile-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A usageprofile resource managed by Alchemy",
  Configuration: "example-configuration",
});
```

