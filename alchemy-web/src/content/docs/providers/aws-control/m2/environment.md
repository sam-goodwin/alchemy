---
title: Environment
description: Learn how to create, update, and manage AWS M2 Environments using Alchemy Cloud Control.
---


The Environment resource lets you manage [AWS M2 Environments](https://docs.aws.amazon.com/m2/latest/userguide/) for running applications in a secure and scalable manner. 

## Minimal Example

Create a basic M2 Environment with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicEnvironment = await AWS.M2.Environment("basic-m2-env", {
  name: "BasicEnvironment",
  engineType: "z/OS",
  instanceType: "m5.large",
  publiclyAccessible: true,
  securityGroupIds: ["sg-0123456789abcdef0"],
  subnetIds: ["subnet-0123456789abcdef0"],
  description: "A basic M2 environment for testing."
});
```

## Advanced Configuration

Configure an M2 Environment with high availability and storage configurations.

```ts
const advancedEnvironment = await AWS.M2.Environment("advanced-m2-env", {
  name: "AdvancedEnvironment",
  engineType: "z/OS",
  instanceType: "m5.xlarge",
  highAvailabilityConfig: {
    desiredCapacity: 2,
    maxSize: 3,
    minSize: 1
  },
  storageConfigurations: [
    {
      type: "EBS",
      volumeSize: 100,
      iops: 300
    }
  ],
  preferredMaintenanceWindow: "Sun:23:00-Sun:23:30"
});
```

## Secure Configuration

Set up an M2 Environment with encryption and a specific maintenance window.

```ts
const secureEnvironment = await AWS.M2.Environment("secure-m2-env", {
  name: "SecureEnvironment",
  engineType: "z/OS",
  instanceType: "m5.large",
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-efgh-5678-ijkl-90mnopqrstuv",
  description: "A secure M2 environment with encryption enabled.",
  preferredMaintenanceWindow: "Mon:02:00-Mon:02:30"
});
```

## Environment with Custom Tags

Create an M2 Environment and assign custom tags for organizational purposes.

```ts
const taggedEnvironment = await AWS.M2.Environment("tagged-m2-env", {
  name: "TaggedEnvironment",
  engineType: "z/OS",
  instanceType: "m5.large",
  tags: {
    Project: "Migration",
    Environment: "Staging"
  }
});
```
