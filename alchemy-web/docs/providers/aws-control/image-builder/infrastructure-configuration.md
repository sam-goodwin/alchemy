---
title: Managing AWS ImageBuilder InfrastructureConfigurations with Alchemy
description: Learn how to create, update, and manage AWS ImageBuilder InfrastructureConfigurations using Alchemy Cloud Control.
---

# InfrastructureConfiguration

The InfrastructureConfiguration resource allows you to manage [AWS ImageBuilder InfrastructureConfigurations](https://docs.aws.amazon.com/imagebuilder/latest/userguide/) for building and managing images in a consistent manner.

## Minimal Example

Create a basic InfrastructureConfiguration with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicInfrastructureConfig = await AWS.ImageBuilder.InfrastructureConfiguration("BasicInfrastructureConfig", {
  Name: "MyBasicInfrastructureConfig",
  InstanceProfileName: "MyInstanceProfile",
  SubnetId: "subnet-0bb1c79de3EXAMPLE",
  SecurityGroupIds: ["sg-0c7c3b8b7EXAMPLE"],
  ResourceTags: {
    Key1: "Value1",
    Key2: "Value2"
  }
});
```

## Advanced Configuration

Configure an InfrastructureConfiguration with logging, instance types, and SNS topic notifications.

```ts
const AdvancedInfrastructureConfig = await AWS.ImageBuilder.InfrastructureConfiguration("AdvancedInfrastructureConfig", {
  Name: "MyAdvancedInfrastructureConfig",
  InstanceProfileName: "MyInstanceProfile",
  SubnetId: "subnet-0bb1c79de3EXAMPLE",
  SecurityGroupIds: ["sg-0c7c3b8b7EXAMPLE"],
  Logging: {
    S3Logs: {
      S3BucketName: "my-logs-bucket",
      S3KeyPrefix: "imagebuilder/logs/"
    }
  },
  InstanceTypes: ["m5.large", "t3.medium"],
  SnsTopicArn: "arn:aws:sns:us-west-2:123456789012:MySNSTopic",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Project", Value: "ImageBuilder" }
  ]
});
```

## Example with Termination on Failure

Set up an InfrastructureConfiguration that terminates the instance on failure.

```ts
const TerminationOnFailureConfig = await AWS.ImageBuilder.InfrastructureConfiguration("TerminationOnFailureConfig", {
  Name: "MyTerminationOnFailureConfig",
  InstanceProfileName: "MyInstanceProfile",
  SubnetId: "subnet-0bb1c79de3EXAMPLE",
  SecurityGroupIds: ["sg-0c7c3b8b7EXAMPLE"],
  TerminateInstanceOnFailure: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Example with Instance Metadata Options

Create an InfrastructureConfiguration that specifies instance metadata options.

```ts
const MetadataOptionsConfig = await AWS.ImageBuilder.InfrastructureConfiguration("MetadataOptionsConfig", {
  Name: "MyMetadataOptionsConfig",
  InstanceProfileName: "MyInstanceProfile",
  SubnetId: "subnet-0bb1c79de3EXAMPLE",
  SecurityGroupIds: ["sg-0c7c3b8b7EXAMPLE"],
  InstanceMetadataOptions: {
    HttpTokens: "required",
    HttpPutResponseHopLimit: 1
  },
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "Admin" }
  ]
});
```