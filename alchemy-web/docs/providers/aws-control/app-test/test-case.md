---
title: Managing AWS AppTest TestCases with Alchemy
description: Learn how to create, update, and manage AWS AppTest TestCases using Alchemy Cloud Control.
---

# TestCase

The TestCase resource lets you create and manage [AWS AppTest TestCases](https://docs.aws.amazon.com/apptest/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-apptest-testcase.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const testcase = await AWS.AppTest.TestCase("testcase-example", {
  Steps: [],
  Name: "testcase-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A testcase resource managed by Alchemy",
});
```

## Advanced Configuration

Create a testcase with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedTestCase = await AWS.AppTest.TestCase("advanced-testcase", {
  Steps: [],
  Name: "testcase-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A testcase resource managed by Alchemy",
});
```

