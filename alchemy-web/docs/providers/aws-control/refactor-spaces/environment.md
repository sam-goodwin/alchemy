---
title: Managing AWS RefactorSpaces Environments with Alchemy
description: Learn how to create, update, and manage AWS RefactorSpaces Environments using Alchemy Cloud Control.
---

# Environment

The Environment resource lets you manage [AWS RefactorSpaces Environments](https://docs.aws.amazon.com/refactorspaces/latest/userguide/) for building and managing microservices applications.

## Minimal Example

Create a basic RefactorSpaces environment with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const BasicEnvironment = await AWS.RefactorSpaces.Environment("BasicEnvironment", {
  Name: "ProductionEnvironment",
  Description: "This is the production environment for my microservices.",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure an environment with a specific network fabric type and additional tags:

```ts
const AdvancedEnvironment = await AWS.RefactorSpaces.Environment("AdvancedEnvironment", {
  Name: "StagingEnvironment",
  Description: "This is the staging environment for testing.",
  NetworkFabricType: "Vpc", // Options can be Vpc or TransitGateway
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" },
    { Key: "Project", Value: "RefactorSpacesDemo" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing environment instead of creating a new one if it already exists:

```ts
const AdoptExistingEnvironment = await AWS.RefactorSpaces.Environment("AdoptExistingEnvironment", {
  Name: "ExistingProductionEnvironment",
  adopt: true, // Enables adoption of the existing resource
  Description: "Adopting the existing environment instead of creating a new one."
});
```

## Environment with Detailed Tags

Create an environment with detailed tags for organizational purposes:

```ts
const TaggedEnvironment = await AWS.RefactorSpaces.Environment("TaggedEnvironment", {
  Name: "DevelopmentEnvironment",
  Description: "This environment is used for development purposes.",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "Frontend" },
    { Key: "Owner", Value: "Alice" },
    { Key: "CostCenter", Value: "DevTeam" }
  ]
});
```