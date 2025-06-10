---
title: DeviceFleet
description: Learn how to create, update, and manage AWS SageMaker DeviceFleets using Alchemy Cloud Control.
---


The DeviceFleet resource allows you to manage [AWS SageMaker DeviceFleets](https://docs.aws.amazon.com/sagemaker/latest/userguide/) for orchestrating machine learning workloads across multiple devices.

## Minimal Example

Create a basic DeviceFleet with required properties and one optional description.

```ts
import AWS from "alchemy/aws/control";

const deviceFleet = await AWS.SageMaker.DeviceFleet("myDeviceFleet", {
  DeviceFleetName: "MyDeviceFleet",
  Description: "A fleet of devices for machine learning inference",
  OutputConfig: {
    S3OutputLocation: "s3://my-bucket/output",
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-key",
    OutputConfig: {
      S3OutputLocation: "s3://my-bucket/output"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/MySageMakerRole",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Advanced Configuration

Configure a DeviceFleet with a more detailed OutputConfig and IAM Role with specific permissions.

```ts
const advancedDeviceFleet = await AWS.SageMaker.DeviceFleet("advancedDeviceFleet", {
  DeviceFleetName: "AdvancedDeviceFleet",
  Description: "An advanced fleet with specific permissions",
  OutputConfig: {
    S3OutputLocation: "s3://my-advanced-bucket/output",
    KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-advanced-key",
    OutputConfig: {
      S3OutputLocation: "s3://my-advanced-bucket/output",
      KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/my-advanced-key"
    }
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyAdvancedSageMakerRole",
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "AI" }
  ],
  adopt: true // Indicates to adopt an existing resource if it exists
});
```

## For Existing Resources

Adopt an existing DeviceFleet to manage it with Alchemy.

```ts
const existingDeviceFleet = await AWS.SageMaker.DeviceFleet("existingDeviceFleet", {
  DeviceFleetName: "ExistingDeviceFleet",
  OutputConfig: {
    S3OutputLocation: "s3://my-existing-bucket/output"
  },
  RoleArn: "arn:aws:iam::123456789012:role/MyExistingSageMakerRole",
  adopt: true // Adopt the existing resource
});
```
