---
title: DistributionConfiguration
description: Learn how to create, update, and manage AWS ImageBuilder DistributionConfigurations using Alchemy Cloud Control.
---


The DistributionConfiguration resource allows you to manage [AWS ImageBuilder DistributionConfigurations](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) which define how and where to distribute your images.

## Minimal Example

Create a basic DistributionConfiguration with required properties and a common optional description.

```ts
import AWS from "alchemy/aws/control";

const basicDistributionConfig = await AWS.ImageBuilder.DistributionConfiguration("basicDistributionConfig", {
  Name: "BasicDistributionConfig",
  Description: "A simple distribution configuration for image builder.",
  Distributions: [{
    Region: "us-west-2",
    AmiDistributionConfiguration: {
      Name: "basic-ami",
      TargetAccountIds: ["123456789012"]
    }
  }],
  Tags: {
    Project: "ImageBuilderDemo"
  }
});
```

## Advanced Configuration

Configure a DistributionConfiguration with multiple distributions and advanced settings.

```ts
const advancedDistributionConfig = await AWS.ImageBuilder.DistributionConfiguration("advancedDistributionConfig", {
  Name: "AdvancedDistributionConfig",
  Description: "An advanced distribution configuration with multiple distributions.",
  Distributions: [{
    Region: "us-west-2",
    AmiDistributionConfiguration: {
      Name: "advanced-ami-west",
      TargetAccountIds: ["123456789012"],
      Description: "AMI for west region",
      LaunchPermission: {
        UserIds: ["987654321098"]
      }
    }
  }, {
    Region: "us-east-1",
    AmiDistributionConfiguration: {
      Name: "advanced-ami-east",
      TargetAccountIds: ["123456789012"],
      Description: "AMI for east region",
      LaunchPermission: {
        UserIds: ["987654321098"]
      }
    }
  }],
  Tags: {
    Project: "ImageBuilderAdvancedDemo",
    Environment: "Production"
  }
});
```

## Multi-Region Distribution

Set up a DistributionConfiguration to distribute images across multiple regions.

```ts
const multiRegionDistributionConfig = await AWS.ImageBuilder.DistributionConfiguration("multiRegionDistributionConfig", {
  Name: "MultiRegionDistributionConfig",
  Description: "A configuration to distribute images in multiple regions.",
  Distributions: [{
    Region: "us-west-2",
    AmiDistributionConfiguration: {
      Name: "multi-region-ami-west",
      TargetAccountIds: ["123456789012"]
    }
  }, {
    Region: "eu-central-1",
    AmiDistributionConfiguration: {
      Name: "multi-region-ami-eu",
      TargetAccountIds: ["123456789012"]
    }
  }],
  Tags: {
    Project: "MultiRegionImageBuilder"
  }
});
```
