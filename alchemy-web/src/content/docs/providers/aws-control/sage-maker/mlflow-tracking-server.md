---
title: MlflowTrackingServer
description: Learn how to create, update, and manage AWS SageMaker MlflowTrackingServers using Alchemy Cloud Control.
---


The MlflowTrackingServer resource allows you to manage an [AWS SageMaker MlflowTrackingServer](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for tracking machine learning experiments and managing model artifacts.

## Minimal Example

Create a basic MlflowTrackingServer instance with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const mlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("myMlflowTrackingServer", {
  TrackingServerName: "my-tracking-server",
  ArtifactStoreUri: "s3://my-artifact-store",
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role"
});
```

## Advanced Configuration

Configure the MlflowTrackingServer with additional optional properties such as MLflow version and automatic model registration.

```ts
const advancedMlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("advancedMlflowTrackingServer", {
  TrackingServerName: "advanced-tracking-server",
  ArtifactStoreUri: "s3://my-advanced-artifact-store",
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role",
  MlflowVersion: "1.20.2",
  AutomaticModelRegistration: true,
  WeeklyMaintenanceWindowStart: "Mon:00:00" // Maintenance window starts on Monday at midnight
});
```

## Custom Size Configuration

Create a MlflowTrackingServer with a custom tracking server size.

```ts
const customSizeMlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("customSizeMlflowTrackingServer", {
  TrackingServerName: "custom-size-tracking-server",
  ArtifactStoreUri: "s3://my-custom-size-artifact-store",
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role",
  TrackingServerSize: "large" // Specify the size of the tracking server
});
```

## Tagging Resources

Add tags to your MlflowTrackingServer for better resource management.

```ts
const taggedMlflowTrackingServer = await AWS.SageMaker.MlflowTrackingServer("taggedMlflowTrackingServer", {
  TrackingServerName: "tagged-tracking-server",
  ArtifactStoreUri: "s3://my-tagged-artifact-store",
  RoleArn: "arn:aws:iam::123456789012:role/my-sagemaker-role",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```
