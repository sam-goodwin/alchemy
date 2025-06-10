---
title: Project
description: Learn how to create, update, and manage AWS Evidently Projects using Alchemy Cloud Control.
---


The Project resource allows you to create and manage [AWS Evidently Projects](https://docs.aws.amazon.com/evidently/latest/userguide/) for running experiments and feature flagging in your applications.

## Minimal Example

Create a basic Evidently Project with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const basicProject = await AWS.Evidently.Project("basicProject", {
  name: "UserExperienceProject",
  description: "A project to enhance user experience through A/B testing",
  DataDelivery: {
    S3Destination: {
      Bucket: "my-evidently-bucket",
      Prefix: "data/"
    }
  }
});
```

## Advanced Configuration

Configure an Evidently Project with additional settings, such as AppConfig resource and tags.

```ts
const advancedProject = await AWS.Evidently.Project("advancedProject", {
  name: "PerformanceTestingProject",
  description: "Project for performance testing new features",
  AppConfigResource: {
    Application: "MyApplication",
    Environment: "Production",
    Configuration: "TestConfig"
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Team",
      Value: "Development"
    }
  ],
  DataDelivery: {
    S3Destination: {
      Bucket: "my-evidently-data-bucket",
      Prefix: "performance/"
    }
  }
});
```

## Using Tags for Organization

Create a project that utilizes tags for better organization and management.

```ts
const taggedProject = await AWS.Evidently.Project("taggedProject", {
  name: "FeatureFlagProject",
  description: "A project focused on implementing feature flags",
  Tags: [
    {
      Key: "ProjectType",
      Value: "FeatureFlag"
    },
    {
      Key: "Owner",
      Value: "Alice"
    }
  ]
});
```

## Adopting Existing Resources

Create a project that adopts an existing resource instead of failing if it already exists.

```ts
const adoptedProject = await AWS.Evidently.Project("adoptedProject", {
  name: "LegacyFeatureProject",
  description: "Adopting an existing project for legacy features",
  adopt: true
});
```
