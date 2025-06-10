---
title: PolicyPrincipalAttachment
description: Learn how to create, update, and manage AWS IoT PolicyPrincipalAttachments using Alchemy Cloud Control.
---


The PolicyPrincipalAttachment resource lets you manage [AWS IoT PolicyPrincipalAttachments](https://docs.aws.amazon.com/iot/latest/userguide/) which are used to attach an IoT policy to a principal (such as a device or user). This allows you to control access to IoT resources.

## Minimal Example

Create a basic PolicyPrincipalAttachment to attach an IoT policy to a principal.

```ts
import AWS from "alchemy/aws/control";

const policyPrincipalAttachment = await AWS.IoT.PolicyPrincipalAttachment("attachPolicyToDevice", {
  PolicyName: "IoTDevicePolicy",
  Principal: "arn:aws:iot:us-west-2:123456789012:cert/abcd1234efgh5678ijkl9012mnop3456qrstuvwx",
  adopt: true // Allows adoption of existing resource
});
```

## Advanced Configuration

Attach a policy to a principal with error handling for existing attachments.

```ts
const advancedAttachment = await AWS.IoT.PolicyPrincipalAttachment("advancedAttachment", {
  PolicyName: "AdvancedIoTPolicy",
  Principal: "arn:aws:iot:us-west-2:123456789012:cert/efgh5678ijkl9012mnop3456qrstuvwx", 
  adopt: true // Enables the adoption of an existing resource if it already exists
});
```

## Reattaching Policies

Reattach a policy to a principal where the policy name or principal ARN may change.

```ts
const reattachPolicy = await AWS.IoT.PolicyPrincipalAttachment("reattachPolicy", {
  PolicyName: "ReattachIoTPolicy",
  Principal: "arn:aws:iot:us-west-2:123456789012:cert/ijkl9012mnop3456qrstuvwx", 
  adopt: false // Will create a new attachment instead of adopting if it exists
});
```

## Dynamic Principal Management

Dynamically manage principal attachments based on application requirements.

```ts
const dynamicAttachment = await AWS.IoT.PolicyPrincipalAttachment("dynamicAttachment", {
  PolicyName: "DynamicIoTPolicy",
  Principal: "arn:aws:iot:us-west-2:123456789012:cert/mnop3456qrstuvwx", 
  adopt: true // Adopt existing attachment if it already exists
});
```
