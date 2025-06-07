---
title: Managing AWS AppStream ImageBuilders with Alchemy
description: Learn how to create, update, and manage AWS AppStream ImageBuilders using Alchemy Cloud Control.
---

# ImageBuilder

The ImageBuilder resource allows you to create and manage [AWS AppStream ImageBuilders](https://docs.aws.amazon.com/appstream/latest/userguide/) for building and customizing your streaming images.

## Minimal Example

Create a basic ImageBuilder with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicImageBuilder = await AWS.AppStream.ImageBuilder("BasicImageBuilder", {
  Name: "BasicImageBuilder",
  InstanceType: "stream.standard.medium",
  Description: "A basic ImageBuilder for streaming applications",
  EnableDefaultInternetAccess: true
});
```

## Advanced Configuration

Configure an ImageBuilder with advanced options including VPC settings and tags.

```ts
const advancedImageBuilder = await AWS.AppStream.ImageBuilder("AdvancedImageBuilder", {
  Name: "AdvancedImageBuilder",
  InstanceType: "stream.standard.large",
  Description: "An advanced ImageBuilder with custom VPC settings",
  VpcConfig: {
    SubnetIds: ["subnet-12345678"],
    SecurityGroupIds: ["sg-12345678"]
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Project", Value: "AppStreamProject" }
  ]
});
```

## ImageBuilder with Domain Join

Create an ImageBuilder that joins a domain and has specific IAM role permissions.

```ts
const domainJoinedImageBuilder = await AWS.AppStream.ImageBuilder("DomainJoinedImageBuilder", {
  Name: "DomainJoinedImageBuilder",
  InstanceType: "stream.compute.large",
  Description: "An ImageBuilder that joins a domain",
  DomainJoinInfo: {
    DirectoryName: "corp.example.com",
    OrganizationalUnitDistinguishedName: "OU=AppStream,DC=corp,DC=example,DC=com"
  },
  IamRoleArn: "arn:aws:iam::123456789012:role/AppStreamImageBuilderRole"
});
```

## ImageBuilder with Access Endpoints

Configure an ImageBuilder with custom access endpoints.

```ts
const imageBuilderWithAccessEndpoints = await AWS.AppStream.ImageBuilder("ImageBuilderWithAccessEndpoints", {
  Name: "ImageBuilderWithAccessEndpoints",
  InstanceType: "stream.standard.xlarge",
  Description: "An ImageBuilder with custom access endpoints",
  AccessEndpoints: [
    {
      EndpointType: "STREAMING",
      VpceId: "vpce-12345678"
    }
  ]
});
```