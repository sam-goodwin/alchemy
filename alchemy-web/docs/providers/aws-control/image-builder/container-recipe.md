---
title: Managing AWS ImageBuilder ContainerRecipes with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder ContainerRecipes using Alchemy Cloud Control.
---

# ContainerRecipe

The ContainerRecipe resource lets you create and manage container build recipes in AWS ImageBuilder, which simplify the process of creating container images. For more detailed information, refer to the [AWS ImageBuilder ContainerRecipes](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) documentation.

## Minimal Example

Create a basic container recipe with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicContainerRecipe = await AWS.ImageBuilder.ContainerRecipe("BasicContainerRecipe", {
  ParentImage: "amazonlinux:latest",
  ContainerType: "EXPRESS",
  Name: "BasicContainerRecipe",
  Components: [
    {
      ComponentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-component/1.0.0"
    }
  ],
  TargetRepository: {
    RepositoryName: "my-repo",
    Service: "ECR"
  },
  Version: "1.0.0"
});
```

## Advanced Configuration

Configure a container recipe with more advanced settings, including a custom working directory and KMS key for encryption.

```ts
const advancedContainerRecipe = await AWS.ImageBuilder.ContainerRecipe("AdvancedContainerRecipe", {
  ParentImage: "ubuntu:20.04",
  ContainerType: "DOCKER",
  Name: "AdvancedContainerRecipe",
  Components: [
    {
      ComponentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-advanced-component/1.0.0"
    }
  ],
  TargetRepository: {
    RepositoryName: "my-advanced-repo",
    Service: "ECR"
  },
  Version: "2.0.0",
  WorkingDirectory: "/app",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key"
});
```

## Custom Dockerfile Configuration

Create a container recipe that uses a custom Dockerfile template for building the image.

```ts
const dockerfileContainerRecipe = await AWS.ImageBuilder.ContainerRecipe("DockerfileContainerRecipe", {
  ParentImage: "debian:bullseye",
  ContainerType: "DOCKER",
  Name: "DockerfileContainerRecipe",
  Components: [
    {
      ComponentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-docker-component/1.0.0"
    }
  ],
  TargetRepository: {
    RepositoryName: "my-docker-repo",
    Service: "ECR"
  },
  Version: "1.1.0",
  DockerfileTemplateUri: "s3://my-bucket/dockerfile-template",
  DockerfileTemplateData: "FROM debian:bullseye\nRUN apt-get update && apt-get install -y nginx"
});
```

## Tagging for Organization

Create a container recipe and apply tags for better organization and management.

```ts
const taggedContainerRecipe = await AWS.ImageBuilder.ContainerRecipe("TaggedContainerRecipe", {
  ParentImage: "fedora:latest",
  ContainerType: "DOCKER",
  Name: "TaggedContainerRecipe",
  Components: [
    {
      ComponentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-tagged-component/1.0.0"
    }
  ],
  TargetRepository: {
    RepositoryName: "my-tagged-repo",
    Service: "ECR"
  },
  Version: "3.0.0",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```