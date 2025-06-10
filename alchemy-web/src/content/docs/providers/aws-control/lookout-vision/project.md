---
title: Project
description: Learn how to create, update, and manage AWS LookoutVision Projects using Alchemy Cloud Control.
---


The Project resource allows you to manage [AWS LookoutVision Projects](https://docs.aws.amazon.com/lookoutvision/latest/userguide/) for analyzing and detecting anomalies in images using machine learning.

## Minimal Example

Create a basic LookoutVision project with required properties.

```ts
import AWS from "alchemy/aws/control";

const lookoutVisionProject = await AWS.LookoutVision.Project("myLookoutProject", {
  ProjectName: "MyProductInspectionProject",
  adopt: false // Default is false: Fail if the resource already exists
});
```

## Advanced Configuration

Create a project and specify properties such as adopting an existing resource if it already exists.

```ts
const advancedLookoutVisionProject = await AWS.LookoutVision.Project("advancedLookoutProject", {
  ProjectName: "AdvancedProductInspectionProject",
  adopt: true // Set to true to adopt existing resource
});
```

## Updating a Project

Update an existing LookoutVision project by modifying its properties.

```ts
const updatedLookoutVisionProject = await AWS.LookoutVision.Project("updateLookoutProject", {
  ProjectName: "UpdatedProductInspectionProject",
  adopt: false // Ensure the resource does not exist before creating
});
```

## Retrieving Project Details

Use the project ARN to retrieve specific details about the project after creation.

```ts
const projectDetails = await AWS.LookoutVision.Project("retrieveLookoutProject", {
  ProjectName: "MyProductInspectionProject"
});

// Log the project's ARN
console.log(`Project ARN: ${projectDetails.Arn}`);
```
