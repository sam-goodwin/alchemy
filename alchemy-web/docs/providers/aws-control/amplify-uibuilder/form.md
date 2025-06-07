---
title: Managing AWS AmplifyUIBuilder Forms with Alchemy
description: Learn how to create, update, and manage AWS AmplifyUIBuilder Forms using Alchemy Cloud Control.
---

# Form

The Form resource lets you create and manage [AWS AmplifyUIBuilder Forms](https://docs.aws.amazon.com/amplifyuibuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-form.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const form = await AWS.AmplifyUIBuilder.Form("form-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a form with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedForm = await AWS.AmplifyUIBuilder.Form("advanced-form", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

