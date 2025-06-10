---
title: ImageRecipe
description: Learn how to create, update, and manage AWS ImageBuilder ImageRecipes using Alchemy Cloud Control.
---


The ImageRecipe resource allows you to define and manage [AWS ImageBuilder ImageRecipes](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) which specify how to create images using various components and configurations.

## Minimal Example

Create a basic image recipe with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicImageRecipe = await AWS.ImageBuilder.ImageRecipe("basicImageRecipe", {
  name: "MyBasicImageRecipe",
  parentImage: "arn:aws:imagebuilder:us-west-2:123456789012:image/my-base-image",
  version: "1.0.0",
  components: [
    {
      componentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-component"
    }
  ],
  workingDirectory: "/var/imagebuilder"
});
```

## Advanced Configuration

Configure an image recipe with additional instance configuration and block device mappings.

```ts
const advancedImageRecipe = await AWS.ImageBuilder.ImageRecipe("advancedImageRecipe", {
  name: "MyAdvancedImageRecipe",
  parentImage: "arn:aws:imagebuilder:us-west-2:123456789012:image/my-base-image",
  version: "1.0.1",
  components: [
    {
      componentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-component"
    }
  ],
  blockDeviceMappings: [
    {
      deviceName: "/dev/xvda",
      ebs: {
        volumeSize: 30,
        deleteOnTermination: true,
        encrypted: false
      }
    }
  ],
  additionalInstanceConfiguration: {
    userDataOverride: "IyEvYmluL2Jhc2gKc3VsdCAiSGVsbG8sIFdvcmxkISI="
  }
});
```

## Custom Tags

Create an image recipe with custom tags for better resource management and identification.

```ts
const taggedImageRecipe = await AWS.ImageBuilder.ImageRecipe("taggedImageRecipe", {
  name: "MyTaggedImageRecipe",
  parentImage: "arn:aws:imagebuilder:us-west-2:123456789012:image/my-base-image",
  version: "1.0.2",
  components: [
    {
      componentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-component"
    }
  ],
  tags: {
    Project: "MyProject",
    Environment: "Development"
  }
});
```

## Combining Components

Demonstrate how to combine multiple components into a single image recipe.

```ts
const combinedComponentsImageRecipe = await AWS.ImageBuilder.ImageRecipe("combinedComponentsImageRecipe", {
  name: "MyCombinedImageRecipe",
  parentImage: "arn:aws:imagebuilder:us-west-2:123456789012:image/my-base-image",
  version: "1.0.3",
  components: [
    {
      componentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-component-1"
    },
    {
      componentArn: "arn:aws:imagebuilder:us-west-2:123456789012:component/my-component-2"
    }
  ]
});
```
