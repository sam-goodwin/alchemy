---
title: ImageBuilder
description: Learn how to create, update, and manage AWS AppStream ImageBuilders using Alchemy Cloud Control.
---


The ImageBuilder resource lets you manage [AWS AppStream ImageBuilders](https://docs.aws.amazon.com/appstream/latest/userguide/) for creating and managing application images for streaming.

## Minimal Example

Create a basic ImageBuilder with required properties and one optional property for description.

```ts
import AWS from "alchemy/aws/control";

const imageBuilder = await AWS.AppStream.ImageBuilder("myImageBuilder", {
  name: "MyImageBuilder",
  instanceType: "stream.standard.medium",
  description: "An ImageBuilder for creating application images."
});
```

## Advanced Configuration

Configure an ImageBuilder with VPC settings and enable default internet access.

```ts
const advancedImageBuilder = await AWS.AppStream.ImageBuilder("advancedImageBuilder", {
  name: "AdvancedImageBuilder",
  instanceType: "stream.standard.large",
  vpcConfig: {
    securityGroupIds: ["sg-0123456789abcdef0"],
    subnets: ["subnet-0123456789abcdef0"]
  },
  enableDefaultInternetAccess: true
});
```

## Domain Join Information

Create an ImageBuilder that joins a domain for enterprise environments.

```ts
const domainJoinedImageBuilder = await AWS.AppStream.ImageBuilder("domainImageBuilder", {
  name: "DomainJoinedImageBuilder",
  instanceType: "stream.standard.large",
  domainJoinInfo: {
    directoryName: "corp.example.com",
    organizationalUnitDistinguishedName: "OU=ImageBuilders,DC=corp,DC=example,DC=com"
  }
});
```

## Custom Access Endpoints

Configure an ImageBuilder with custom access endpoints for application streaming.

```ts
const accessEndpointsImageBuilder = await AWS.AppStream.ImageBuilder("accessEndpointsImageBuilder", {
  name: "AccessEndpointsImageBuilder",
  instanceType: "stream.standard.medium",
  accessEndpoints: [{
    endpointType: "STREAMING",
    url: "https://stream.example.com",
    name: "CustomStreamingEndpoint"
  }]
});
```

## Tags for Resource Management

Create an ImageBuilder with tags for better resource management.

```ts
const taggedImageBuilder = await AWS.AppStream.ImageBuilder("taggedImageBuilder", {
  name: "TaggedImageBuilder",
  instanceType: "stream.standard.medium",
  tags: [
    { key: "Environment", value: "Development" },
    { key: "Project", value: "ImageBuilderDemo" }
  ]
});
```
