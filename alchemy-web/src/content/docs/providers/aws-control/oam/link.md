---
title: Link
description: Learn how to create, update, and manage AWS Oam Links using Alchemy Cloud Control.
---


The Link resource allows you to manage AWS Oam Links, which facilitate the integration of AWS services with external monitoring and logging solutions. For more information, refer to the [AWS Oam Links documentation](https://docs.aws.amazon.com/oam/latest/userguide/).

## Minimal Example

Create a basic Oam Link with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const oamLink = await AWS.Oam.Link("basicOamLink", {
  SinkIdentifier: "arn:aws:oam:us-west-2:123456789012:link/my-sink",
  ResourceTypes: ["AWS::EC2::Instance"],
  LabelTemplate: "MyInstance-{id}"
});
```

## Advanced Configuration

Configure an Oam Link with additional properties for enhanced functionality:

```ts
const advancedOamLink = await AWS.Oam.Link("advancedOamLink", {
  SinkIdentifier: "arn:aws:oam:us-west-2:123456789012:sink/my-sink",
  ResourceTypes: ["AWS::S3::Bucket", "AWS::Lambda::Function"],
  LinkConfiguration: {
    // Example configuration for specific settings
    ConfigurationOption1: "value1",
    ConfigurationOption2: "value2"
  },
  Tags: {
    Project: "MyProject",
    Environment: "Production"
  }
});
```

## Adoption of Existing Resources

Create an Oam Link that adopts an existing resource instead of failing if it already exists:

```ts
const adoptExistingLink = await AWS.Oam.Link("existingLink", {
  SinkIdentifier: "arn:aws:oam:us-west-2:123456789012:sink/my-existing-sink",
  ResourceTypes: ["AWS::RDS::DBInstance"],
  adopt: true
});
```

## Tagging and Resource Management

Create an Oam Link with tags for better resource management:

```ts
const taggedOamLink = await AWS.Oam.Link("taggedOamLink", {
  SinkIdentifier: "arn:aws:oam:us-west-2:123456789012:sink/my-tagged-sink",
  ResourceTypes: ["AWS::ECS::Cluster"],
  Tags: {
    Department: "Engineering",
    Owner: "Alice"
  }
});
```
