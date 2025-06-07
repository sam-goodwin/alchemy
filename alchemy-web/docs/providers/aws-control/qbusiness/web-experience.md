---
title: Managing AWS QBusiness WebExperiences with Alchemy
description: Learn how to create, update, and manage AWS QBusiness WebExperiences using Alchemy Cloud Control.
---

# WebExperience

The WebExperience resource lets you create and manage [AWS QBusiness WebExperiences](https://docs.aws.amazon.com/qbusiness/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-qbusiness-webexperience.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const webexperience = await AWS.QBusiness.WebExperience("webexperience-example", {
  ApplicationId: "example-applicationid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a webexperience with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedWebExperience = await AWS.QBusiness.WebExperience("advanced-webexperience", {
  ApplicationId: "example-applicationid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

