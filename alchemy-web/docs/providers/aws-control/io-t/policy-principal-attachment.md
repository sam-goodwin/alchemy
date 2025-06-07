---
title: Managing AWS IoT PolicyPrincipalAttachments with Alchemy
description: Learn how to create, update, and manage AWS IoT PolicyPrincipalAttachments using Alchemy Cloud Control.
---

# PolicyPrincipalAttachment

The PolicyPrincipalAttachment resource allows you to attach an AWS IoT policy to a principal (an AWS IoT thing, user, or certificate). This is essential for managing permissions for IoT devices and users. For more detailed information, refer to the [AWS IoT PolicyPrincipalAttachments documentation](https://docs.aws.amazon.com/iot/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic PolicyPrincipalAttachment with required properties.

```ts
import AWS from "alchemy/aws/control";

const BasicAttachment = await AWS.IoT.PolicyPrincipalAttachment("BasicAttachment", {
  PolicyName: "MyIoTPolicy",
  Principal: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrstuvwx",
  adopt: false // Default is false: Fail if the resource already exists
});
```

## Advanced Configuration

In this example, we are creating a PolicyPrincipalAttachment with additional properties such as adopting an existing resource.

```ts
const AdvancedAttachment = await AWS.IoT.PolicyPrincipalAttachment("AdvancedAttachment", {
  PolicyName: "AdvancedIoTPolicy",
  Principal: "arn:aws:iot:us-west-2:123456789012:thing/MyIoTDevice",
  adopt: true // Set to true to adopt existing resource if it already exists
});
```

## Use Case: Attaching Policies to Multiple Principals

This example shows how to create multiple attachments for different principals for the same policy, which is useful for batch operations.

```ts
const Attachments = [
  { PolicyName: "CommonPolicy", Principal: "arn:aws:iot:us-west-2:123456789012:cert/cert1" },
  { PolicyName: "CommonPolicy", Principal: "arn:aws:iot:us-west-2:123456789012:thing/Thing1" },
  { PolicyName: "CommonPolicy", Principal: "arn:aws:iot:us-west-2:123456789012:cert/cert2" }
];

for (const attachment of Attachments) {
  await AWS.IoT.PolicyPrincipalAttachment(`Attachment-${attachment.Principal}`, {
    PolicyName: attachment.PolicyName,
    Principal: attachment.Principal
  });
}
```

## Use Case: Updating a PolicyPrincipalAttachment

This example illustrates how to update an existing PolicyPrincipalAttachment by reattaching the same policy to a principal.

```ts
const UpdateAttachment = await AWS.IoT.PolicyPrincipalAttachment("UpdateAttachment", {
  PolicyName: "UpdatedIoTPolicy",
  Principal: "arn:aws:iot:us-west-2:123456789012:thing/MyUpdatedIoTDevice",
  adopt: false // Will fail if the resource already exists
});
```