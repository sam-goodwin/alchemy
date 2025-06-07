---
title: Managing AWS Glue DevEndpoints with Alchemy
description: Learn how to create, update, and manage AWS Glue DevEndpoints using Alchemy Cloud Control.
---

# DevEndpoint

The DevEndpoint resource lets you create and manage [AWS Glue DevEndpoints](https://docs.aws.amazon.com/glue/latest/userguide/) which provide an environment for developing, testing, and debugging your ETL scripts.

## Minimal Example

Create a basic DevEndpoint with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicDevEndpoint = await AWS.Glue.DevEndpoint("BasicDevEndpoint", {
  RoleArn: "arn:aws:iam::123456789012:role/AWSGlueServiceRole",
  SubnetId: "subnet-0abcd1234efgh5678",
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  NumberOfNodes: 2,
  GlueVersion: "2.0",
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Team", Value: "DataEngineering" }
  ]
});
```

## Advanced Configuration

Configure a DevEndpoint with advanced settings including custom Python libraries and extra JARs.

```ts
const advancedDevEndpoint = await AWS.Glue.DevEndpoint("AdvancedDevEndpoint", {
  RoleArn: "arn:aws:iam::123456789012:role/AWSGlueServiceRole",
  SubnetId: "subnet-0abcd1234efgh5678",
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  ExtraJarsS3Path: "s3://my-bucket/jars/custom-library.jar",
  ExtraPythonLibsS3Path: "s3://my-bucket/libs/custom-python-lib.zip",
  PublicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAr...",
  NumberOfWorkers: 5,
  WorkerType: "G.2X",
  GlueVersion: "2.0",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "ETL" }
  ]
});
```

## Custom Security Configuration

Set up a DevEndpoint with a specific security configuration and multiple public keys.

```ts
const secureDevEndpoint = await AWS.Glue.DevEndpoint("SecureDevEndpoint", {
  RoleArn: "arn:aws:iam::123456789012:role/AWSGlueServiceRole",
  SubnetId: "subnet-0abcd1234efgh5678",
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  SecurityConfiguration: "mySecurityConfig",
  PublicKeys: [
    "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAr...",
    "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAr..."
  ],
  GlueVersion: "3.0",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Using Existing Resources

If you want to adopt an existing DevEndpoint without creating a new one, you can do so by setting the adopt property to true.

```ts
const existingDevEndpoint = await AWS.Glue.DevEndpoint("ExistingDevEndpoint", {
  RoleArn: "arn:aws:iam::123456789012:role/AWSGlueServiceRole",
  SubnetId: "subnet-0abcd1234efgh5678",
  SecurityGroupIds: ["sg-0abcd1234efgh5678"],
  adopt: true
});
```