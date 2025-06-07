---
title: Managing AWS GlobalAccelerator CrossAccountAttachments with Alchemy
description: Learn how to create, update, and manage AWS GlobalAccelerator CrossAccountAttachments using Alchemy Cloud Control.
---

# CrossAccountAttachment

The CrossAccountAttachment resource lets you create and manage [AWS GlobalAccelerator CrossAccountAttachments](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-globalaccelerator-crossaccountattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const crossaccountattachment = await AWS.GlobalAccelerator.CrossAccountAttachment(
  "crossaccountattachment-example",
  { Name: "crossaccountattachment-", Tags: { Environment: "production", ManagedBy: "Alchemy" } }
);
```

## Advanced Configuration

Create a crossaccountattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedCrossAccountAttachment = await AWS.GlobalAccelerator.CrossAccountAttachment(
  "advanced-crossaccountattachment",
  {
    Name: "crossaccountattachment-",
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

