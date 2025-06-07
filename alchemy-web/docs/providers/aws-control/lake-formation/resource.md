---
title: Managing AWS LakeFormation Resources with Alchemy
description: Learn how to create, update, and manage AWS LakeFormation Resources using Alchemy Cloud Control.
---

# Resource

The Resource resource allows you to manage [AWS LakeFormation Resources](https://docs.aws.amazon.com/lakeformation/latest/userguide/) which are essential for controlling access to data lakes and their components in AWS.

## Minimal Example

Create a basic LakeFormation Resource with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const LakeFormationResource = await AWS.LakeFormation.Resource("MyLakeFormationResource", {
  ResourceArn: "arn:aws:s3:::my-data-lake",
  UseServiceLinkedRole: true,
  WithFederation: false
});
```

## Advanced Configuration

Configure a LakeFormation Resource with additional options such as Hybrid Access and Role ARN.

```ts
const AdvancedLakeFormationResource = await AWS.LakeFormation.Resource("AdvancedLakeFormationResource", {
  ResourceArn: "arn:aws:s3:::my-advanced-data-lake",
  UseServiceLinkedRole: true,
  HybridAccessEnabled: true,
  RoleArn: "arn:aws:iam::123456789012:role/LakeFormationRole"
});
```

## Resource Adoption

Adopt an existing LakeFormation Resource instead of failing if it already exists.

```ts
const AdoptedLakeFormationResource = await AWS.LakeFormation.Resource("AdoptedLakeFormationResource", {
  ResourceArn: "arn:aws:s3:::my-existing-data-lake",
  UseServiceLinkedRole: true,
  adopt: true
});
```