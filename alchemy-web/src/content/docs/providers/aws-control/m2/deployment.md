---
title: Deployment
description: Learn how to create, update, and manage AWS M2 Deployments using Alchemy Cloud Control.
---


The Deployment resource allows you to manage [AWS M2 Deployments](https://docs.aws.amazon.com/m2/latest/userguide/) for your applications, enabling seamless updates and version control.

## Minimal Example

Create a basic deployment for an application with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicDeployment = await AWS.M2.Deployment("myBasicDeployment", {
  EnvironmentId: "env-12345678",
  ApplicationVersion: 1,
  ApplicationId: "app-87654321",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Deploy an application specifying a higher application version and enabling adoption of existing resources.

```ts
const advancedDeployment = await AWS.M2.Deployment("myAdvancedDeployment", {
  EnvironmentId: "env-12345678",
  ApplicationVersion: 2,
  ApplicationId: "app-87654321",
  adopt: true // Adopt existing resource if it already exists
});
```

## Handling Application Rollbacks

Create a deployment that handles rollbacks by specifying the previous version.

```ts
const rollbackDeployment = await AWS.M2.Deployment("myRollbackDeployment", {
  EnvironmentId: "env-12345678",
  ApplicationVersion: 1, // Revert to an earlier version
  ApplicationId: "app-87654321",
  adopt: true
});
```

## Monitoring Deployment Status

Deploy an application and monitor its creation time and last update time.

```ts
const monitoredDeployment = await AWS.M2.Deployment("myMonitoredDeployment", {
  EnvironmentId: "env-12345678",
  ApplicationVersion: 3,
  ApplicationId: "app-87654321",
  adopt: true
});

// Log creation and update times
console.log(`Deployment created at: ${monitoredDeployment.CreationTime}`);
console.log(`Last updated at: ${monitoredDeployment.LastUpdateTime}`);
```
