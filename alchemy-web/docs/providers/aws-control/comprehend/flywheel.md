---
title: Managing AWS Comprehend Flywheels with Alchemy
description: Learn how to create, update, and manage AWS Comprehend Flywheels using Alchemy Cloud Control.
---

# Flywheel

The Flywheel resource lets you create and manage [AWS Comprehend Flywheels](https://docs.aws.amazon.com/comprehend/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-comprehend-flywheel.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const flywheel = await AWS.Comprehend.Flywheel("flywheel-example", {
  DataLakeS3Uri: "example-datalakes3uri",
  DataAccessRoleArn: "example-dataaccessrolearn",
  FlywheelName: "flywheel-flywheel",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a flywheel with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedFlywheel = await AWS.Comprehend.Flywheel("advanced-flywheel", {
  DataLakeS3Uri: "example-datalakes3uri",
  DataAccessRoleArn: "example-dataaccessrolearn",
  FlywheelName: "flywheel-flywheel",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

