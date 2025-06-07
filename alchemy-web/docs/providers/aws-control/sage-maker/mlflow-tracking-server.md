---
title: Managing AWS SageMaker MlflowTrackingServers with Alchemy
description: Learn how to create, update, and manage AWS SageMaker MlflowTrackingServers using Alchemy Cloud Control.
---

# MlflowTrackingServer

The MlflowTrackingServer resource lets you manage [AWS SageMaker MlflowTrackingServers](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for tracking and managing machine learning experiments.

## Minimal Example

Create a basic MlflowTrackingServer with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicMlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("BasicMlflowServer", {
  TrackingServerName: "BasicTrackingServer",
  ArtifactStoreUri: "s3://my-mlflow-artifacts",
  RoleArn: "arn:aws:iam::123456789012:role/MySageMakerRole"
});
```

## Advanced Configuration

Configure an MlflowTrackingServer with additional settings like maintenance window and automatic model registration.

```ts
const advancedMlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("AdvancedMlflowServer", {
  TrackingServerName: "AdvancedTrackingServer",
  ArtifactStoreUri: "s3://my-mlflow-artifacts",
  RoleArn: "arn:aws:iam::123456789012:role/MySageMakerRole",
  MlflowVersion: "1.20.0",
  WeeklyMaintenanceWindowStart: "Mon:01:00",
  AutomaticModelRegistration: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Custom Resource Adoption

Create an MlflowTrackingServer while adopting an existing resource if it already exists.

```ts
const adoptedMlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("AdoptMlflowServer", {
  TrackingServerName: "ExistingTrackingServer",
  ArtifactStoreUri: "s3://my-mlflow-artifacts",
  RoleArn: "arn:aws:iam::123456789012:role/MySageMakerRole",
  adopt: true
});
```

## Resource Size Configuration

Instantiate an MlflowTrackingServer with a specific tracking server size.

```ts
const sizedMlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("SizedMlflowServer", {
  TrackingServerName: "LargeTrackingServer",
  ArtifactStoreUri: "s3://my-mlflow-artifacts",
  RoleArn: "arn:aws:iam::123456789012:role/MySageMakerRole",
  TrackingServerSize: "Large"
});
```