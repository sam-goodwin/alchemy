---
title: Resource
description: Learn how to create, update, and manage AWS LakeFormation Resources using Alchemy Cloud Control.
---


The Resource resource allows you to manage [AWS LakeFormation Resources](https://docs.aws.amazon.com/lakeformation/latest/userguide/) for data lake management and governance, enabling fine-grained access control.

## Minimal Example

Create a basic LakeFormation resource with required properties:

```ts
import AWS from "alchemy/aws/control";

const lakeFormationResource = await AWS.LakeFormation.Resource("basicLakeFormationResource", {
  ResourceArn: "arn:aws:s3:::my-data-lake",
  UseServiceLinkedRole: true
});
```

## Advanced Configuration

Configure a LakeFormation resource with additional optional settings, such as federation and hybrid access:

```ts
const advancedLakeFormationResource = await AWS.LakeFormation.Resource("advancedLakeFormationResource", {
  ResourceArn: "arn:aws:s3:::my-data-lake",
  UseServiceLinkedRole: true,
  WithFederation: true,
  HybridAccessEnabled: true,
  RoleArn: "arn:aws:iam::123456789012:role/LakeFormationRole"
});
```

## Resource Adoption

Adopt an existing LakeFormation resource instead of failing when the resource already exists:

```ts
const adoptExistingResource = await AWS.LakeFormation.Resource("adoptExistingResource", {
  ResourceArn: "arn:aws:s3:::my-existing-data-lake",
  UseServiceLinkedRole: false,
  adopt: true
});
```

## Hybrid Access Configuration

Create a LakeFormation resource with hybrid access enabled for cross-account data sharing:

```ts
const hybridAccessResource = await AWS.LakeFormation.Resource("hybridAccessResource", {
  ResourceArn: "arn:aws:s3:::my-hybrid-data-lake",
  UseServiceLinkedRole: true,
  HybridAccessEnabled: true,
  RoleArn: "arn:aws:iam::123456789012:role/HybirdAccessRole"
});
```
