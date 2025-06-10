---
title: CrossAccountAttachment
description: Learn how to create, update, and manage AWS GlobalAccelerator CrossAccountAttachments using Alchemy Cloud Control.
---


The CrossAccountAttachment resource allows you to manage the cross-account attachments for AWS Global Accelerator. This resource is crucial for enabling resources in different AWS accounts to be associated with a single Global Accelerator, facilitating improved performance and availability for users. For more details, refer to the [AWS GlobalAccelerator CrossAccountAttachments documentation](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/).

## Minimal Example

Create a basic CrossAccountAttachment with the required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const crossAccountAttachment = await AWS.GlobalAccelerator.CrossAccountAttachment("basicCrossAccountAttachment", {
  Name: "MainGlobalAcceleratorAttachment",
  Principals: ["arn:aws:iam::123456789012:role/MyCrossAccountRole"],
  Resources: [
    {
      ResourceArn: "arn:aws:globalaccelerator::123456789012:accelerator/abcd1234efgh5678"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a CrossAccountAttachment with multiple principals and additional resources for advanced use cases.

```ts
const advancedCrossAccountAttachment = await AWS.GlobalAccelerator.CrossAccountAttachment("advancedCrossAccountAttachment", {
  Name: "AdvancedGlobalAcceleratorAttachment",
  Principals: [
    "arn:aws:iam::123456789012:role/MyCrossAccountRole",
    "arn:aws:iam::987654321098:role/AnotherCrossAccountRole"
  ],
  Resources: [
    {
      ResourceArn: "arn:aws:globalaccelerator::123456789012:accelerator/abcd1234efgh5678"
    },
    {
      ResourceArn: "arn:aws:globalaccelerator::123456789012:accelerator/wxyz9876ijkl5432"
    }
  ],
  Tags: [
    {
      Key: "Project",
      Value: "AcceleratorProject"
    },
    {
      Key: "Team",
      Value: "DevOps"
    }
  ]
});
```

## Adoption of Existing Resources

Use the `adopt` property to manage an existing CrossAccountAttachment without causing a failure if it already exists.

```ts
const adoptExistingAttachment = await AWS.GlobalAccelerator.CrossAccountAttachment("adoptExistingCrossAccountAttachment", {
  Name: "ExistingGlobalAcceleratorAttachment",
  Principals: ["arn:aws:iam::123456789012:role/MyCrossAccountRole"],
  Resources: [
    {
      ResourceArn: "arn:aws:globalaccelerator::123456789012:accelerator/abcd1234efgh5678"
    }
  ],
  adopt: true // Adopt an existing resource
});
```
