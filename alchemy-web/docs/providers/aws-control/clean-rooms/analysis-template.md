---
title: Managing AWS CleanRooms AnalysisTemplates with Alchemy
description: Learn how to create, update, and manage AWS CleanRooms AnalysisTemplates using Alchemy Cloud Control.
---

# AnalysisTemplate

The AnalysisTemplate resource lets you create and manage [AWS CleanRooms AnalysisTemplates](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cleanrooms-analysistemplate.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const analysistemplate = await AWS.CleanRooms.AnalysisTemplate("analysistemplate-example", {
  MembershipIdentifier: "example-membershipidentifier",
  Format: "example-format",
  Source: "example-source",
  Name: "analysistemplate-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A analysistemplate resource managed by Alchemy",
});
```

## Advanced Configuration

Create a analysistemplate with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAnalysisTemplate = await AWS.CleanRooms.AnalysisTemplate(
  "advanced-analysistemplate",
  {
    MembershipIdentifier: "example-membershipidentifier",
    Format: "example-format",
    Source: "example-source",
    Name: "analysistemplate-",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A analysistemplate resource managed by Alchemy",
  }
);
```

