---
title: Managing AWS Connect HoursOfOperations with Alchemy
description: Learn how to create, update, and manage AWS Connect HoursOfOperations using Alchemy Cloud Control.
---

# HoursOfOperation

The HoursOfOperation resource lets you create and manage [AWS Connect HoursOfOperations](https://docs.aws.amazon.com/connect/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-connect-hoursofoperation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const hoursofoperation = await AWS.Connect.HoursOfOperation("hoursofoperation-example", {
  TimeZone: "example-timezone",
  Config: [],
  InstanceArn: "example-instancearn",
  Name: "hoursofoperation-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A hoursofoperation resource managed by Alchemy",
});
```

## Advanced Configuration

Create a hoursofoperation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedHoursOfOperation = await AWS.Connect.HoursOfOperation("advanced-hoursofoperation", {
  TimeZone: "example-timezone",
  Config: [],
  InstanceArn: "example-instancearn",
  Name: "hoursofoperation-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A hoursofoperation resource managed by Alchemy",
});
```

