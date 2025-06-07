---
title: Managing AWS QuickSight Templates with Alchemy
description: Learn how to create, update, and manage AWS QuickSight Templates using Alchemy Cloud Control.
---

# Template

The Template resource lets you create and manage [AWS QuickSight Templates](https://docs.aws.amazon.com/quicksight/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-quicksight-template.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const template = await AWS.QuickSight.Template("template-example", {
  AwsAccountId: "example-awsaccountid",
  TemplateId: "example-templateid",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a template with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTemplate = await AWS.QuickSight.Template("advanced-template", {
  AwsAccountId: "example-awsaccountid",
  TemplateId: "example-templateid",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

