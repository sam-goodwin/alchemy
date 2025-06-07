---
title: Managing AWS IoT ThingPrincipalAttachments with Alchemy
description: Learn how to create, update, and manage AWS IoT ThingPrincipalAttachments using Alchemy Cloud Control.
---

# ThingPrincipalAttachment

The ThingPrincipalAttachment resource allows you to manage the association between an AWS IoT Thing and its associated principal (such as an IAM role or policy). This resource is essential for enabling secure communication between IoT devices and AWS IoT services. For more details, refer to the [AWS IoT ThingPrincipalAttachments](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic ThingPrincipalAttachment with required properties.

```ts
import AWS from "alchemy/aws/control";

const ThingPrincipalAttachment = await AWS.IoT.ThingPrincipalAttachment("MyThingPrincipalAttachment", {
  Principal: "arn:aws:iam::123456789012:role/MyIoTRole",
  ThingName: "MyIoTDevice"
});
```

## Advanced Configuration

In this example, we will attach a principal to a Thing with an optional property to indicate the principal type.

```ts
const AdvancedThingPrincipalAttachment = await AWS.IoT.ThingPrincipalAttachment("AdvancedThingPrincipalAttachment", {
  Principal: "arn:aws:iam::123456789012:policy/MyIoTPolicy",
  ThingName: "MyIoTDevice",
  ThingPrincipalType: "AWS::IAM::Role" // Specify the type of the principal
});
```

## Using Adopt Option

This example shows how to use the `adopt` option to ensure that the creation of the ThingPrincipalAttachment does not fail if the resource already exists.

```ts
const AdoptThingPrincipalAttachment = await AWS.IoT.ThingPrincipalAttachment("AdoptThingPrincipalAttachment", {
  Principal: "arn:aws:iam::123456789012:role/MyIoTRole",
  ThingName: "MyIoTDevice",
  adopt: true // Adopt existing resource if it exists
});
```