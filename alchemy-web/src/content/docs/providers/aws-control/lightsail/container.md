---
title: Container
description: Learn how to create, update, and manage AWS Lightsail Containers using Alchemy Cloud Control.
---


The Container resource lets you manage [AWS Lightsail Containers](https://docs.aws.amazon.com/lightsail/latest/userguide/) for deploying and scaling containerized applications easily.

## Minimal Example

Create a basic Lightsail Container with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicContainer = await AWS.Lightsail.Container("myBasicContainer", {
  ServiceName: "myService",
  Scale: 2,
  Power: "nano",
  PublicDomainNames: [{
    name: "myapp.example.com"
  }]
});
```

## Advanced Configuration

Configure a container with private registry access and deployment specifications.

```ts
const advancedContainer = await AWS.Lightsail.Container("myAdvancedContainer", {
  ServiceName: "myAdvancedService",
  Scale: 3,
  Power: "micro",
  PrivateRegistryAccess: {
    Credentials: {
      Username: alchemy.secret(process.env.REGISTRY_USERNAME!),
      Password: alchemy.secret(process.env.REGISTRY_PASSWORD!)
    },
    RegistryUrl: "https://my-private-registry.com"
  },
  ContainerServiceDeployment: {
    Containers: [{
      Image: "myapp/image:latest",
      Command: ["npm", "start"],
      Environment: {
        NODE_ENV: "production"
      }
    }]
  }
});
```

## Deployment with Tags

Create a container with tags for better resource management and identification.

```ts
const taggedContainer = await AWS.Lightsail.Container("myTaggedContainer", {
  ServiceName: "myTaggedService",
  Scale: 1,
  Power: "small",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Disabling a Container

Demonstrate how to create a disabled container that can be enabled later.

```ts
const disabledContainer = await AWS.Lightsail.Container("myDisabledContainer", {
  ServiceName: "myDisabledService",
  Scale: 1,
  Power: "small",
  IsDisabled: true
});
```
