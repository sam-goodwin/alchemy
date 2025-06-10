---
title: ConfigurationRecorder
description: Learn how to create, update, and manage AWS Config ConfigurationRecorders using Alchemy Cloud Control.
---


The ConfigurationRecorder resource allows you to manage [AWS Config ConfigurationRecorders](https://docs.aws.amazon.com/config/latest/userguide/) that track changes to your AWS resources and record their configuration history.

## Minimal Example

Create a basic ConfigurationRecorder with the required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicConfigurationRecorder = await AWS.Config.ConfigurationRecorder("basicRecorder", {
  RoleARN: "arn:aws:iam::123456789012:role/aws-config-role",
  Name: "BasicConfigRecorder",
  RecordingGroup: {
    AllSupported: true,
    IncludeGlobalResourceTypes: true
  }
});
```

## Advanced Configuration

Configure a ConfigurationRecorder with a specific recording mode and additional settings.

```ts
const advancedConfigurationRecorder = await AWS.Config.ConfigurationRecorder("advancedRecorder", {
  RoleARN: "arn:aws:iam::123456789012:role/aws-config-role",
  Name: "AdvancedConfigRecorder",
  RecordingMode: "Continuous",
  RecordingGroup: {
    AllSupported: true,
    IncludeGlobalResourceTypes: false,
    ResourceTypes: [
      "AWS::EC2::Instance",
      "AWS::S3::Bucket"
    ]
  }
});
```

## Resource Adoption

Create a ConfigurationRecorder while adopting an existing resource if it already exists.

```ts
const adoptConfigurationRecorder = await AWS.Config.ConfigurationRecorder("adoptedRecorder", {
  RoleARN: "arn:aws:iam::123456789012:role/aws-config-role",
  Name: "AdoptedConfigRecorder",
  adopt: true,
  RecordingGroup: {
    AllSupported: false,
    ResourceTypes: [
      "AWS::Lambda::Function"
    ]
  }
});
```

## IAM Role Policy Example

Define an IAM role policy for the ConfigurationRecorder with permissions to access AWS resources.

```ts
const iamRolePolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "config:PutConfigurationRecorder",
        "config:StartConfigurationRecorder",
        "config:StopConfigurationRecorder"
      ],
      Resource: "*"
    },
    {
      Effect: "Allow",
      Action: [
        "s3:GetObject",
        "s3:PutObject"
      ],
      Resource: "arn:aws:s3:::my-config-bucket/*"
    }
  ]
};

// Create a role with the above policy (example usage)
```
