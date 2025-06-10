---
title: RobotApplication
description: Learn how to create, update, and manage AWS RoboMaker RobotApplications using Alchemy Cloud Control.
---


The RobotApplication resource allows you to create and manage [AWS RoboMaker RobotApplications](https://docs.aws.amazon.com/robomaker/latest/userguide/) that help in developing, testing, and deploying robotics applications.

## Minimal Example

This example demonstrates how to create a basic RobotApplication with required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const robotApp = await AWS.RoboMaker.RobotApplication("myRobotApp", {
  name: "MyRobotApplication",
  robotSoftwareSuite: {
    name: "ROS",
    version: "Melodic"
  },
  environment: "production",
  tags: {
    project: "robotics",
    team: "development"
  }
});
```

## Advanced Configuration

In this example, we configure a RobotApplication with multiple source configurations and a specific revision ID.

```ts
const advancedRobotApp = await AWS.RoboMaker.RobotApplication("advancedRobotApp", {
  name: "AdvancedRobotApplication",
  robotSoftwareSuite: {
    name: "ROS",
    version: "Noetic"
  },
  sources: [
    {
      s3Bucket: "my-bucket",
      s3Key: "robot-application.tar.gz"
    },
    {
      s3Bucket: "my-bucket",
      s3Key: "additional-files.tar.gz"
    }
  ],
  currentRevisionId: "rev-123456",
  tags: {
    environment: "staging",
    version: "1.0"
  }
});
```

## Resource Adoption

This example illustrates how to adopt an existing RobotApplication instead of failing if it already exists.

```ts
const adoptRobotApp = await AWS.RoboMaker.RobotApplication("existingRobotApp", {
  name: "ExistingRobotApplication",
  robotSoftwareSuite: {
    name: "ROS",
    version: "Foxy"
  },
  adopt: true
});
```

## Using Tags for Organization

In this example, we create a RobotApplication with tags that can help organize resources by environment and feature set.

```ts
const taggedRobotApp = await AWS.RoboMaker.RobotApplication("taggedRobotApp", {
  name: "TaggedRobotApplication",
  robotSoftwareSuite: {
    name: "ROS",
    version: "Galactic"
  },
  tags: {
    environment: "production",
    feature: "navigation"
  }
});
```
