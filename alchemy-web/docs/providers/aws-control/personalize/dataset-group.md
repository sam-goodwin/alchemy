---
title: Managing AWS Personalize DatasetGroups with Alchemy
description: Learn how to create, update, and manage AWS Personalize DatasetGroups using Alchemy Cloud Control.
---

# DatasetGroup

The DatasetGroup resource lets you manage [AWS Personalize DatasetGroups](https://docs.aws.amazon.com/personalize/latest/userguide/) which serve as a container for datasets and the machine learning models built from them.

## Minimal Example

Create a basic DatasetGroup with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicDatasetGroup = await AWS.Personalize.DatasetGroup("BasicDatasetGroup", {
  Name: "MyDatasetGroup",
  RoleArn: "arn:aws:iam::123456789012:role/MyPersonalizeRole"
});
```

## Advanced Configuration

Configure a DatasetGroup with additional options such as a KMS Key for encryption.

```ts
const advancedDatasetGroup = await AWS.Personalize.DatasetGroup("AdvancedDatasetGroup", {
  Name: "MyAdvancedDatasetGroup",
  RoleArn: "arn:aws:iam::123456789012:role/MyPersonalizeRole",
  KmsKeyArn: "arn:aws:kms:us-west-2:123456789012:key/example-key-id"
});
```

## Adopting Existing Resources

If you want to adopt an existing DatasetGroup instead of creating a new one, you can set the `adopt` property to true.

```ts
const adoptedDatasetGroup = await AWS.Personalize.DatasetGroup("AdoptedDatasetGroup", {
  Name: "MyExistingDatasetGroup",
  RoleArn: "arn:aws:iam::123456789012:role/MyPersonalizeRole",
  adopt: true
});
```

## Using a Specific Domain

When creating a DatasetGroup for a specific domain, you can specify the `Domain` property.

```ts
const domainDatasetGroup = await AWS.Personalize.DatasetGroup("DomainDatasetGroup", {
  Name: "MyDomainDatasetGroup",
  RoleArn: "arn:aws:iam::123456789012:role/MyPersonalizeRole",
  Domain: "ECOMMERCE"
});
```