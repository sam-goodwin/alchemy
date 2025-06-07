---
title: Managing AWS M2 Applications with Alchemy
description: Learn how to create, update, and manage AWS M2 Applications using Alchemy Cloud Control.
---

# Application

The Application resource lets you create and manage [AWS M2 Applications](https://docs.aws.amazon.com/m2/latest/userguide/) which are essential for running and managing applications in the AWS Mainframe Modernization environment.

## Minimal Example

Create a basic AWS M2 Application with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicApplication = await AWS.M2.Application("BasicM2Application", {
  Name: "MyFirstM2Application",
  EngineType: "zOS",
  Description: "A sample application for AWS M2."
});
```

## Advanced Configuration

Configure an AWS M2 Application with additional settings including KMS Key for encryption and IAM Role ARN.

```ts
const AdvancedApplication = await AWS.M2.Application("AdvancedM2Application", {
  Name: "MyAdvancedM2Application",
  EngineType: "zOS",
  Description: "An advanced application with enhanced security.",
  KmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/abcd1234-a123-456a-a12b-a123b4cd56ef",
  RoleArn: "arn:aws:iam::123456789012:role/MyM2ApplicationRole"
});
```

## Tagging Applications

Create an AWS M2 Application with tags for better resource management and identification.

```ts
const TaggedApplication = await AWS.M2.Application("TaggedM2Application", {
  Name: "MyTaggedM2Application",
  EngineType: "zOS",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing AWS M2 Application instead of failing if it already exists.

```ts
const AdoptedApplication = await AWS.M2.Application("AdoptedM2Application", {
  Name: "MyExistingM2Application",
  EngineType: "zOS",
  adopt: true
});
```