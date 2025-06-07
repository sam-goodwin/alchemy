---
title: Managing AWS FraudDetector Variables with Alchemy
description: Learn how to create, update, and manage AWS FraudDetector Variables using Alchemy Cloud Control.
---

# Variable

The Variable resource lets you create and manage [AWS FraudDetector Variables](https://docs.aws.amazon.com/frauddetector/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-frauddetector-variable.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const variable = await AWS.FraudDetector.Variable("variable-example", {
  DefaultValue: "example-defaultvalue",
  DataType: "example-datatype",
  Name: "variable-",
  DataSource: "example-datasource",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A variable resource managed by Alchemy",
});
```

## Advanced Configuration

Create a variable with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedVariable = await AWS.FraudDetector.Variable("advanced-variable", {
  DefaultValue: "example-defaultvalue",
  DataType: "example-datatype",
  Name: "variable-",
  DataSource: "example-datasource",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A variable resource managed by Alchemy",
});
```

