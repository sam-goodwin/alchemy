---
title: Managing AWS SageMaker Projects with Alchemy
description: Learn how to create, update, and manage AWS SageMaker Projects using Alchemy Cloud Control.
---

# Project

The Project resource lets you manage [AWS SageMaker Projects](https://docs.aws.amazon.com/sagemaker/latest/userguide/) which serve as a way to organize and manage machine learning workflows and resources.

## Minimal Example

Create a basic SageMaker Project with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const BasicSageMakerProject = await AWS.SageMaker.Project("BasicProject", {
  ProjectName: "BasicMachineLearningProject",
  ServiceCatalogProvisioningDetails: {
    // Details for the service catalog provisioning
    ProductId: "prod-12345",
    ProvisioningArtifactId: "artifact-abcde",
    PathId: "path-67890"
  },
  ProjectDescription: "A project to demonstrate basic SageMaker functionality."
});
```

## Advanced Configuration

Configure a SageMaker Project with tags for better resource management.

```ts
const AdvancedSageMakerProject = await AWS.SageMaker.Project("AdvancedProject", {
  ProjectName: "AdvancedMachineLearningProject",
  ServiceCatalogProvisioningDetails: {
    ProductId: "prod-67890",
    ProvisioningArtifactId: "artifact-fghij",
    PathId: "path-12345"
  },
  ProjectDescription: "An advanced project to showcase SageMaker capabilities.",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Using Existing Resources

Adopt an existing SageMaker Project instead of failing if it already exists.

```ts
const AdoptedSageMakerProject = await AWS.SageMaker.Project("AdoptedProject", {
  ProjectName: "ExistingMachineLearningProject",
  ServiceCatalogProvisioningDetails: {
    ProductId: "prod-13579",
    ProvisioningArtifactId: "artifact-klmno",
    PathId: "path-24680"
  },
  adopt: true
});
```

## Complex Use Case Example

Create a SageMaker Project with specific provisioning details that utilize IAM roles.

```ts
const ComplexSageMakerProject = await AWS.SageMaker.Project("ComplexProject", {
  ProjectName: "ComplexMachineLearningProject",
  ServiceCatalogProvisioningDetails: {
    ProductId: "prod-24680",
    ProvisioningArtifactId: "artifact-pqrst",
    PathId: "path-13579"
  },
  ProjectDescription: "A complex project demonstrating SageMaker's robust capabilities with IAM roles.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "MachineLearning" }
  ]
});
```