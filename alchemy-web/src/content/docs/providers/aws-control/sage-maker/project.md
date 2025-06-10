---
title: Project
description: Learn how to create, update, and manage AWS SageMaker Projects using Alchemy Cloud Control.
---


The Project resource allows you to manage [AWS SageMaker Projects](https://docs.aws.amazon.com/sagemaker/latest/userguide/) that help organize your machine learning workflows, including associated resources and configurations.

## Minimal Example

Create a basic SageMaker Project with required properties.

```ts
import AWS from "alchemy/aws/control";

const basicProject = await AWS.SageMaker.Project("basicProject", {
  ProjectName: "MachineLearningProject",
  ServiceCatalogProvisioningDetails: {
    // Add relevant provisioning details here
  }
});
```

## Enhanced Project Description

Configure a SageMaker Project with a description and tags.

```ts
const detailedProject = await AWS.SageMaker.Project("detailedProject", {
  ProjectName: "AdvancedMachineLearningProject",
  ProjectDescription: "This project focuses on advanced machine learning techniques.",
  ServiceCatalogProvisioningDetails: {
    // Add relevant provisioning details here
  },
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Advanced Configuration

Create a project that includes service catalog provisioned product details.

```ts
const advancedProject = await AWS.SageMaker.Project("advancedProject", {
  ProjectName: "FullMachineLearningProject",
  ProjectDescription: "Project for full machine learning lifecycle.",
  ServiceCatalogProvisionedProductDetails: {
    // Specify the provisioned product details here
  },
  ServiceCatalogProvisioningDetails: {
    // Add relevant provisioning details here
  },
  Tags: [
    { Key: "ProjectType", Value: "Research" },
    { Key: "Priority", Value: "High" }
  ]
});
```

## Adoption of Existing Resource

Demonstrate how to adopt an existing SageMaker Project if one already exists.

```ts
const adoptExistingProject = await AWS.SageMaker.Project("adoptExistingProject", {
  ProjectName: "ExistingMachineLearningProject",
  ServiceCatalogProvisioningDetails: {
    // Add relevant provisioning details here
  },
  adopt: true // Adopts the existing resource
});
```
