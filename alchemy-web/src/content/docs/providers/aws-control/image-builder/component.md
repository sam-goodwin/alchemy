---
title: Component
description: Learn how to create, update, and manage AWS ImageBuilder Components using Alchemy Cloud Control.
---


The Component resource allows you to manage [AWS ImageBuilder Components](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) that define how to install and configure software on an image. Components can be reused across multiple image builds and are essential for customizing the software that runs on your EC2 instances.

## Minimal Example

Create a basic ImageBuilder component with the required properties and a couple of optional ones.

```ts
import AWS from "alchemy/aws/control";

const basicComponent = await AWS.ImageBuilder.Component("myBasicComponent", {
  name: "MyBasicComponent",
  version: "1.0.0",
  platform: "Linux",
  description: "A basic component for demonstration purposes.",
  supportedOsVersions: ["ubuntu-20-04", "amazon-linux-2"]
});
```

## Advanced Configuration

Configure a component with additional settings, including KMS key for encryption and a custom change description.

```ts
const advancedComponent = await AWS.ImageBuilder.Component("myAdvancedComponent", {
  name: "MyAdvancedComponent",
  version: "1.0.0",
  platform: "Linux",
  description: "An advanced component with encryption.",
  changeDescription: "Initial version with custom configurations.",
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-ef56-78gh-90ij-klmnopqrst",
  data: `name: MyAdvancedComponent
commands:
  - name: Install Package
    action: apt-get install -y my-package`
});
```

## Using a URI for Custom Components

Demonstrate how to create a component using a URI that points to an existing component definition.

```ts
const uriComponent = await AWS.ImageBuilder.Component("myUriComponent", {
  name: "MyUriComponent",
  version: "1.0.0",
  platform: "Linux",
  uri: "https://mybucket.s3.amazonaws.com/my-component.yaml",
  description: "A component defined in an external file."
});
```

## Tagging Components

Create a component with tagging for easier management and identification.

```ts
const taggedComponent = await AWS.ImageBuilder.Component("myTaggedComponent", {
  name: "MyTaggedComponent",
  version: "1.0.0",
  platform: "Linux",
  description: "A component with tags for management.",
  tags: {
    Project: "ImageBuilderDemo",
    Owner: "DevTeam"
  }
});
```
