---
title: ContainerRecipe
description: Learn how to create, update, and manage AWS ImageBuilder ContainerRecipes using Alchemy Cloud Control.
---


The ContainerRecipe resource lets you manage [AWS ImageBuilder ContainerRecipes](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) for building and customizing container images.

## Minimal Example

Create a basic container recipe with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicContainerRecipe = await AWS.ImageBuilder.ContainerRecipe("myContainerRecipe", {
  parentImage: "my-docker-repo/my-base-image:latest",
  containerType: "DOCKER",
  name: "MyContainerRecipe",
  version: "1.0.0",
  components: [
    {
      type: "BUILD",
      uri: "my-docker-repo/my-component:latest"
    }
  ],
  targetRepository: {
    service: "ECR",
    repository: "my-docker-repo",
    imageTag: "latest"
  }
});
```

## Advanced Configuration

Configure a container recipe with additional options such as KMS key for encryption and instance configuration.

```ts
const advancedContainerRecipe = await AWS.ImageBuilder.ContainerRecipe("advancedContainerRecipe", {
  parentImage: "my-docker-repo/my-base-image:latest",
  containerType: "DOCKER",
  name: "AdvancedContainerRecipe",
  version: "1.0.1",
  components: [
    {
      type: "BUILD",
      uri: "my-docker-repo/my-component:latest"
    }
  ],
  targetRepository: {
    service: "ECR",
    repository: "my-docker-repo",
    imageTag: "latest"
  },
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  instanceConfiguration: {
    instanceType: "t2.micro",
    ami: "ami-0abc12345def67890"
  }
});
```

## Using Dockerfile Template

Create a container recipe using a Dockerfile template for more complex image builds.

```ts
const dockerfileTemplateContainerRecipe = await AWS.ImageBuilder.ContainerRecipe("dockerfileTemplateContainerRecipe", {
  parentImage: "my-docker-repo/my-base-image:latest",
  containerType: "DOCKER",
  name: "DockerfileTemplateContainerRecipe",
  version: "1.0.2",
  components: [
    {
      type: "BUILD",
      uri: "my-docker-repo/my-component:latest"
    }
  ],
  targetRepository: {
    service: "ECR",
    repository: "my-docker-repo",
    imageTag: "latest"
  },
  dockerfileTemplateData: `
    FROM node:14
    COPY . /app
    WORKDIR /app
    RUN npm install
    CMD ["npm", "start"]
  `
});
```
