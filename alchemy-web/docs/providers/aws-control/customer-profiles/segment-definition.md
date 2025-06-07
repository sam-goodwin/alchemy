---
title: Managing AWS CustomerProfiles SegmentDefinitions with Alchemy
description: Learn how to create, update, and manage AWS CustomerProfiles SegmentDefinitions using Alchemy Cloud Control.
---

# SegmentDefinition

The SegmentDefinition resource lets you create and manage [AWS CustomerProfiles SegmentDefinitions](https://docs.aws.amazon.com/customerprofiles/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-customerprofiles-segmentdefinition.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const segmentdefinition = await AWS.CustomerProfiles.SegmentDefinition(
  "segmentdefinition-example",
  {
    DomainName: "segmentdefinition-domain",
    SegmentGroups: "example-segmentgroups",
    DisplayName: "segmentdefinition-display",
    SegmentDefinitionName: "segmentdefinition-segmentdefinition",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
    Description: "A segmentdefinition resource managed by Alchemy",
  }
);
```

## Advanced Configuration

Create a segmentdefinition with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSegmentDefinition = await AWS.CustomerProfiles.SegmentDefinition(
  "advanced-segmentdefinition",
  {
    DomainName: "segmentdefinition-domain",
    SegmentGroups: "example-segmentgroups",
    DisplayName: "segmentdefinition-display",
    SegmentDefinitionName: "segmentdefinition-segmentdefinition",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
    Description: "A segmentdefinition resource managed by Alchemy",
  }
);
```

