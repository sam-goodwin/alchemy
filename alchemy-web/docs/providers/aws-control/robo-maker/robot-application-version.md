---
title: Managing AWS RoboMaker RobotApplicationVersions with Alchemy
description: Learn how to create, update, and manage AWS RoboMaker RobotApplicationVersions using Alchemy Cloud Control.
---

# RobotApplicationVersion

The RobotApplicationVersion resource allows you to manage versions of your robot applications in AWS RoboMaker. This resource is essential for deploying and updating robot applications in a controlled manner. For more details, refer to the [AWS RoboMaker RobotApplicationVersions documentation](https://docs.aws.amazon.com/robomaker/latest/userguide/).

## Minimal Example

Create a basic RobotApplicationVersion with the required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicRobotAppVersion = await AWS.RoboMaker.RobotApplicationVersion("BasicRobotAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-robot-app",
  CurrentRevisionId: "Revision1"
});
```

## Advanced Configuration

Configure a RobotApplicationVersion with additional properties, such as adopting an existing resource.

```ts
const AdvancedRobotAppVersion = await AWS.RoboMaker.RobotApplicationVersion("AdvancedRobotAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-robot-app",
  CurrentRevisionId: "Revision1",
  adopt: true // Adopt existing resource if it already exists
});
```

## Version Management

Manage multiple versions of a robot application by using different revision IDs.

```ts
const FirstRobotAppVersion = await AWS.RoboMaker.RobotApplicationVersion("FirstRobotAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-robot-app",
  CurrentRevisionId: "Revision1"
});

const SecondRobotAppVersion = await AWS.RoboMaker.RobotApplicationVersion("SecondRobotAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-robot-app",
  CurrentRevisionId: "Revision2"
});
```

## Deployment Example

Deploy a RobotApplicationVersion as part of a larger workflow, such as within a CI/CD pipeline.

```ts
const RobotAppVersionForDeployment = await AWS.RoboMaker.RobotApplicationVersion("RobotAppVersionForDeployment", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:robot-application/my-robot-app",
  CurrentRevisionId: "Revision3",
  adopt: false // Do not adopt existing resource
});
```