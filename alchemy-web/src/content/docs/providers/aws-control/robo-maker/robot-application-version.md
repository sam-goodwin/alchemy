---
title: RobotApplicationVersion
description: Learn how to create, update, and manage AWS RoboMaker RobotApplicationVersions using Alchemy Cloud Control.
---


The RobotApplicationVersion resource lets you manage versions of a robot application in AWS RoboMaker. This resource is essential for deploying and updating robot applications in your AWS environment. For more information, refer to the [AWS RoboMaker RobotApplicationVersions documentation](https://docs.aws.amazon.com/robomaker/latest/userguide/).

## Minimal Example

Create a basic RobotApplicationVersion with the required properties.

```ts
import AWS from "alchemy/aws/control";

const robotAppVersion = await AWS.RoboMaker.RobotApplicationVersion("basicRobotAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-robot-app",
  CurrentRevisionId: "revision-1"
});
```

## Advanced Configuration

Configure a RobotApplicationVersion with additional properties such as adopting an existing resource.

```ts
const advancedRobotAppVersion = await AWS.RoboMaker.RobotApplicationVersion("advancedRobotAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-advanced-robot-app",
  CurrentRevisionId: "revision-2",
  adopt: true
});
```

## Specific Use Case: Version Control

Create a new version of a robot application while ensuring you adopt an existing resource if it already exists.

```ts
const versionControlledRobotApp = await AWS.RoboMaker.RobotApplicationVersion("versionControlledRobotApp", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-versioned-robot-app",
  CurrentRevisionId: "revision-3",
  adopt: true
});
```

## Example: Tracking Creation and Update Times

Retrieve information about the creation and last update times of a RobotApplicationVersion.

```ts
const robotAppVersionInfo = await AWS.RoboMaker.RobotApplicationVersion("robotAppVersionInfo", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-tracked-robot-app",
  CurrentRevisionId: "revision-4"
});

// Accessing additional properties
console.log(`Creation Time: ${robotAppVersionInfo.CreationTime}`);
console.log(`Last Update Time: ${robotAppVersionInfo.LastUpdateTime}`);
```
