---
title: DevEndpoint
description: Learn how to create, update, and manage AWS Glue DevEndpoints using Alchemy Cloud Control.
---


The DevEndpoint resource allows you to create and manage AWS Glue DevEndpoints, which are used to develop and test ETL scripts in AWS Glue. For more information, see the [AWS Glue DevEndpoints documentation](https://docs.aws.amazon.com/glue/latest/userguide/).

## Minimal Example

Create a basic Glue DevEndpoint with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const devEndpoint = await AWS.Glue.DevEndpoint("myDevEndpoint", {
  roleArn: "arn:aws:iam::123456789012:role/MyGlueRole",
  numberOfNodes: 2,
  workerType: "G.1X",
  subnetId: "subnet-0abcdef1234567890",
  securityGroupIds: ["sg-0abcdef1234567890"]
});
```

## Advanced Configuration

Configure a DevEndpoint with additional options, including extra JARs and Python libraries.

```ts
const advancedDevEndpoint = await AWS.Glue.DevEndpoint("advancedDevEndpoint", {
  roleArn: "arn:aws:iam::123456789012:role/MyGlueRole",
  numberOfWorkers: 5,
  glueVersion: "2.0",
  extraJarsS3Path: "s3://my-glue-libs/my-additional-jars.jar",
  extraPythonLibsS3Path: "s3://my-glue-libs/my-additional-libs.zip",
  publicKeys: ["ssh-rsa AAAAB3..."],
  tags: {
    Project: "ETL",
    Environment: "Development"
  }
});
```

## Using Custom Arguments

Demonstrate how to pass custom arguments to the DevEndpoint for specific configurations.

```ts
const customArgsDevEndpoint = await AWS.Glue.DevEndpoint("customArgsDevEndpoint", {
  roleArn: "arn:aws:iam::123456789012:role/MyGlueRole",
  arguments: {
    "--key1": "value1",
    "--key2": "value2"
  },
  numberOfNodes: 3,
  subnetId: "subnet-0abcdef1234567890",
  securityGroupIds: ["sg-0abcdef1234567890"]
});
```

## Security Configuration

Create a DevEndpoint with a specific security configuration, including custom security groups.

```ts
const secureDevEndpoint = await AWS.Glue.DevEndpoint("secureDevEndpoint", {
  roleArn: "arn:aws:iam::123456789012:role/MyGlueRole",
  securityConfiguration: "mySecurityConfig",
  securityGroupIds: ["sg-0abcdef1234567890"],
  subnetId: "subnet-0abcdef1234567890",
  numberOfNodes: 2,
  endpointName: "secure-endpoint"
});
```
