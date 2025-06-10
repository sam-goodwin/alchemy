---
title: ThingPrincipalAttachment
description: Learn how to create, update, and manage AWS IoT ThingPrincipalAttachments using Alchemy Cloud Control.
---


The ThingPrincipalAttachment resource allows you to manage the attachment of principals (such as IAM identities) to AWS IoT Things. This enables you to control access to your IoT devices through AWS Identity and Access Management (IAM). For more information, refer to the [AWS IoT ThingPrincipalAttachments documentation](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

Create a basic ThingPrincipalAttachment to attach a principal to an IoT Thing.

```ts
import AWS from "alchemy/aws/control";

const attachment = await AWS.IoT.ThingPrincipalAttachment("thingPrincipalAttachment", {
  Principal: "arn:aws:iam::123456789012:role/iot-device-role",
  ThingName: "MyIoTDevice",
  adopt: true // This will adopt the existing resource if it already exists
});
```

## Advanced Configuration

Attach a principal to an IoT Thing with additional properties for monitoring and tracking.

```ts
const advancedAttachment = await AWS.IoT.ThingPrincipalAttachment("advancedThingPrincipalAttachment", {
  Principal: "arn:aws:iam::123456789012:role/iot-device-role",
  ThingName: "MyAdvancedIoTDevice",
  adopt: true // Adopt existing resource
});
```

The `adopt` property allows you to manage resources that might already exist in your AWS account without causing failures during deployment.

## Use Case: Updating an Existing Attachment

You may need to update the principal attached to an existing IoT Thing. Here’s how to do that:

```ts
const updatedAttachment = await AWS.IoT.ThingPrincipalAttachment("updateThingPrincipalAttachment", {
  Principal: "arn:aws:iam::123456789012:role/iot-new-role",
  ThingName: "MyIoTDevice",
  adopt: true // Adopt existing resource
});
```

This example demonstrates updating the principal for the IoT Thing named "MyIoTDevice" to a new IAM role.

## Use Case: Error Handling on Attachment

You can also handle scenarios where the attachment might already exist without failing the deployment.

```ts
const errorHandledAttachment = await AWS.IoT.ThingPrincipalAttachment("errorHandledAttachment", {
  Principal: "arn:aws:iam::123456789012:role/iot-device-role",
  ThingName: "MyIoTDevice",
  adopt: true // This will allow the operation to succeed even if the resource exists
});
```

In this example, the `adopt` property helps you manage existing attachments gracefully, ensuring the process does not fail when the resource is already attached.
