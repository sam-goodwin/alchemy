---
title: SimulationApplicationVersion
description: Learn how to create, update, and manage AWS RoboMaker SimulationApplicationVersions using Alchemy Cloud Control.
---


The `SimulationApplicationVersion` resource allows you to manage versions of your simulation applications in AWS RoboMaker. This resource is essential for deploying updates and maintaining different versions of your simulation applications. For more information, refer to the [AWS RoboMaker SimulationApplicationVersions documentation](https://docs.aws.amazon.com/robomaker/latest/userguide/).

## Minimal Example

Create a basic simulation application version with the required properties.

```ts
import AWS from "alchemy/aws/control";

const simulationAppVersion = await AWS.RoboMaker.SimulationApplicationVersion("mySimulationAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:simulation-application/my-simulation-app",
  CurrentRevisionId: "1234567890abcdef" // Optional: Specify the current revision ID
});
```

## Advanced Configuration

Update an existing simulation application version with additional options.

```ts
const updatedSimulationAppVersion = await AWS.RoboMaker.SimulationApplicationVersion("updatedSimulationAppVersion", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:simulation-application/my-simulation-app",
  CurrentRevisionId: "abcdef1234567890", // Specify the new revision ID
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Versioning Control

Manage multiple versions of a simulation application effectively.

```ts
const version1 = await AWS.RoboMaker.SimulationApplicationVersion("simulationAppVersion1", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:simulation-application/my-simulation-app",
  CurrentRevisionId: "v1.0.0"
});

const version2 = await AWS.RoboMaker.SimulationApplicationVersion("simulationAppVersion2", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:simulation-application/my-simulation-app",
  CurrentRevisionId: "v2.0.0"
});
```

## Deleting a Simulation Application Version

Remove a simulation application version if it's no longer needed.

```ts
await AWS.RoboMaker.SimulationApplicationVersion("simulationAppVersionToDelete", {
  Application: "arn:aws:robomaker:us-west-2:123456789012:simulation-application/my-simulation-app",
  CurrentRevisionId: "v1.0.0",
  adopt: false // Optional: Fail if the resource already exists
});
```
