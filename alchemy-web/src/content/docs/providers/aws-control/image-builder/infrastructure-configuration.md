---
title: InfrastructureConfiguration
description: Learn how to create, update, and manage AWS ImageBuilder InfrastructureConfigurations using Alchemy Cloud Control.
---


The InfrastructureConfiguration resource allows you to define and manage the infrastructure settings for AWS ImageBuilder, enabling you to automate the creation of images in a controlled and customizable environment. For more details, refer to the [AWS ImageBuilder InfrastructureConfigurations documentation](https://docs.aws.amazon.com/imagebuilder/latest/userguide/).

## Minimal Example

Create a basic InfrastructureConfiguration with required properties and a couple of common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicInfrastructureConfig = await AWS.ImageBuilder.InfrastructureConfiguration("basicConfig", {
  name: "MyBasicInfrastructureConfig",
  instanceProfileName: "my-ec2-instance-profile",
  subnetId: "subnet-0123456789abcdef0",
  securityGroupIds: ["sg-0123456789abcdef0"],
  logging: {
    s3Logs: {
      s3BucketName: "my-logs-bucket",
      s3KeyPrefix: "imagebuilder-logs/"
    }
  }
});
```

## Advanced Configuration

Configure an InfrastructureConfiguration with additional properties like instance types and SNS topic for notifications.

```ts
const advancedInfrastructureConfig = await AWS.ImageBuilder.InfrastructureConfiguration("advancedConfig", {
  name: "MyAdvancedInfrastructureConfig",
  instanceProfileName: "my-ec2-instance-profile",
  subnetId: "subnet-0123456789abcdef0",
  securityGroupIds: ["sg-0123456789abcdef0"],
  instanceTypes: ["t2.micro", "t2.medium"],
  snsTopicArn: "arn:aws:sns:us-west-2:123456789012:my-sns-topic",
  terminateInstanceOnFailure: true,
  resourceTags: {
    "Environment": "Development",
    "Project": "ImageBuilder"
  }
});
```

## Custom Metadata Options

Demonstrate how to set custom instance metadata options for enhanced security and performance.

```ts
const metadataOptionsConfig = await AWS.ImageBuilder.InfrastructureConfiguration("metadataOptionsConfig", {
  name: "MyMetadataOptionsConfig",
  instanceProfileName: "my-ec2-instance-profile",
  subnetId: "subnet-0123456789abcdef0",
  instanceMetadataOptions: {
    httpTokens: "required",
    httpPutResponseHopLimit: 2,
    instanceMetadataTags: "enabled"
  }
});
```

## Using Resource Tags

Create an InfrastructureConfiguration with specific resource tags to help organize and manage resources.

```ts
const taggedInfrastructureConfig = await AWS.ImageBuilder.InfrastructureConfiguration("taggedConfig", {
  name: "MyTaggedInfrastructureConfig",
  instanceProfileName: "my-ec2-instance-profile",
  subnetId: "subnet-0123456789abcdef0",
  resourceTags: {
    "Owner": "admin@example.com",
    "Department": "IT"
  },
  tags: {
    "Project": "ImageBuilder",
    "CostCenter": "12345"
  }
});
``` 

These examples illustrate how to effectively create and manage AWS ImageBuilder InfrastructureConfigurations using Alchemy. Adjust the configurations as necessary to fit your specific requirements.
