---
title: App
description: Learn how to create, update, and manage AWS SageMaker Apps using Alchemy Cloud Control.
---


The App resource lets you manage [AWS SageMaker Apps](https://docs.aws.amazon.com/sagemaker/latest/userguide/) that provide users with access to SageMaker notebooks and other tools.

## Minimal Example

Create a basic SageMaker App with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicApp = await AWS.SageMaker.App("basic-sagemaker-app", {
  DomainId: "d-1234567890", // Domain ID for the SageMaker domain
  AppType: "JupyterServer", // Type of the SageMaker App
  UserProfileName: "user123", // The user profile associated with the app
  AppName: "MyFirstApp", // Unique name for the app
  Tags: [{ Key: "Environment", Value: "Development" }] // Optional tags
});
```

## Advanced Configuration

Configure a SageMaker App with specific resource specifications and multiple tags.

```ts
import AWS from "alchemy/aws/control";

const advancedApp = await AWS.SageMaker.App("advanced-sagemaker-app", {
  DomainId: "d-0987654321", // Domain ID for the SageMaker domain
  AppType: "JupyterServer", // Type of the SageMaker App
  UserProfileName: "user456", // The user profile associated with the app
  AppName: "MyAdvancedApp", // Unique name for the app
  ResourceSpec: {
    SageMakerImageArn: "arn:aws:sagemaker:us-west-2:123456789012:image/my-image", // ARN of the SageMaker image
    SageMakerImageVersionArn: "arn:aws:sagemaker:us-west-2:123456789012:image/my-image-version" // ARN of the specific image version
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "DataScience" }
  ] // Multiple optional tags
});
```

## User Profile Specific Example

Create an app for a specific user profile with a unique app name.

```ts
import AWS from "alchemy/aws/control";

const userProfileApp = await AWS.SageMaker.App("user-profile-sagemaker-app", {
  DomainId: "d-1357924680", // Domain ID for the SageMaker domain
  AppType: "KernelGateway", // Type of the SageMaker App
  UserProfileName: "dataAnalyst", // The user profile for the app
  AppName: "DataAnalysisApp" // Unique name for the app
});
```

## Adopt Existing Resource Example

Create an app that adopts an existing resource if it already exists.

```ts
import AWS from "alchemy/aws/control";

const adoptExistingApp = await AWS.SageMaker.App("adopt-sagemaker-app", {
  DomainId: "d-2468135790", // Domain ID for the SageMaker domain
  AppType: "JupyterServer", // Type of the SageMaker App
  UserProfileName: "researcher789", // The user profile associated with the app
  AppName: "ExistingApp", // Unique name for the app
  adopt: true // Adopt existing resource if it exists
});
```
