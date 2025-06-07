---
title: Managing AWS GreengrassV2 ComponentVersions with Alchemy
description: Learn how to create, update, and manage AWS GreengrassV2 ComponentVersions using Alchemy Cloud Control.
---

# ComponentVersion

The ComponentVersion resource lets you create and manage [AWS GreengrassV2 ComponentVersions](https://docs.aws.amazon.com/greengrassv2/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-greengrassv2-componentversion.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const componentversion = await AWS.GreengrassV2.ComponentVersion("componentversion-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a componentversion with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedComponentVersion = await AWS.GreengrassV2.ComponentVersion(
  "advanced-componentversion",
  {
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

