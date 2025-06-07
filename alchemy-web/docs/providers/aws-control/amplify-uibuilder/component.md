---
title: Managing AWS AmplifyUIBuilder Components with Alchemy
description: Learn how to create, update, and manage AWS AmplifyUIBuilder Components using Alchemy Cloud Control.
---

# Component

The Component resource lets you create and manage [AWS AmplifyUIBuilder Components](https://docs.aws.amazon.com/amplifyuibuilder/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-amplifyuibuilder-component.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const component = await AWS.AmplifyUIBuilder.Component("component-example", {
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a component with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedComponent = await AWS.AmplifyUIBuilder.Component("advanced-component", {
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

