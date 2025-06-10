---
title: Project
description: Learn how to create, update, and manage AWS Rekognition Projects using Alchemy Cloud Control.
---


The Project resource lets you manage [AWS Rekognition Projects](https://docs.aws.amazon.com/rekognition/latest/userguide/) which are used to organize and manage your machine learning models and workflows.

## Minimal Example

Create a basic Rekognition project with a unique name.

```ts
import AWS from "alchemy/aws/control";

const rekognitionProject = await AWS.Rekognition.Project("myRekognitionProject", {
  ProjectName: "MyFirstRekognitionProject",
  adopt: false // Default is false; fails if project already exists
});
```

## Advanced Configuration

Configure a project with adoption of existing resources to avoid failure if the project already exists.

```ts
const existingRekognitionProject = await AWS.Rekognition.Project("existingProject", {
  ProjectName: "MySecondRekognitionProject",
  adopt: true // Set to true to adopt existing project
});
```

## Accessing Project Details

You can access additional details about the project, such as its ARN and creation time, after the project is created.

```ts
const projectDetails = await AWS.Rekognition.Project("detailedProject", {
  ProjectName: "MyThirdRekognitionProject"
});

// Accessing project properties
console.log(`Project ARN: ${projectDetails.Arn}`);
console.log(`Creation Time: ${projectDetails.CreationTime}`);
console.log(`Last Updated Time: ${projectDetails.LastUpdateTime}`);
```
