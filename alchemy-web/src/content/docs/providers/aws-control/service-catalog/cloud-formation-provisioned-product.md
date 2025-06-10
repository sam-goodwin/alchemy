---
title: CloudFormationProvisionedProduct
description: Learn how to create, update, and manage AWS ServiceCatalog CloudFormationProvisionedProducts using Alchemy Cloud Control.
---


The CloudFormationProvisionedProduct resource allows you to manage [AWS ServiceCatalog CloudFormation Provisioned Products](https://docs.aws.amazon.com/servicecatalog/latest/userguide/). This resource is used to provision products from the AWS Service Catalog, enabling organizations to create and manage cloud resources quickly and efficiently.

## Minimal Example

This example demonstrates how to create a basic CloudFormation provisioned product with essential properties.

```ts
import AWS from "alchemy/aws/control";

const provisionedProduct = await AWS.ServiceCatalog.CloudFormationProvisionedProduct("myProvisionedProduct", {
  ProductName: "MyDemoProduct",
  ProvisioningArtifactName: "v1",
  PathId: "path-123",
  ProvisioningParameters: [
    {
      Key: "InstanceType",
      Value: "t2.micro"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    }
  ]
});
```

## Advanced Configuration

This example showcases additional configuration options, including provisioning preferences and notification ARNs.

```ts
const advancedProvisionedProduct = await AWS.ServiceCatalog.CloudFormationProvisionedProduct("myAdvancedProvisionedProduct", {
  ProductName: "AdvancedDemoProduct",
  ProvisioningArtifactName: "v1",
  PathId: "path-123",
  ProvisioningParameters: [
    {
      Key: "InstanceType",
      Value: "t2.medium"
    },
    {
      Key: "KeyName",
      Value: "my-key-pair"
    }
  ],
  ProvisioningPreferences: {
    StackSetAccount: "123456789012",
    StackSetRegion: "us-east-1"
  },
  NotificationArns: [
    "arn:aws:sns:us-east-1:123456789012:my-topic"
  ],
  Tags: [
    {
      Key: "Project",
      Value: "Demo"
    }
  ]
});
```

## Updating an Existing Product

This example illustrates how to update an existing provisioned product with new parameters.

```ts
const updatedProvisionedProduct = await AWS.ServiceCatalog.CloudFormationProvisionedProduct("myProvisionedProduct", {
  ProductName: "MyDemoProduct",
  ProvisioningArtifactName: "v2", // Upgrading to a new version
  PathId: "path-123",
  ProvisioningParameters: [
    {
      Key: "InstanceType",
      Value: "t2.large" // Changing instance type
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ],
  adopt: true // Adopt existing resource instead of failing if it already exists
});
```

## Deleting a Provisioned Product

In this example, we demonstrate how to delete a provisioned product by specifying the product ID.

```ts
const deleteProvisionedProduct = await AWS.ServiceCatalog.CloudFormationProvisionedProduct("myProvisionedProduct", {
  ProductId: "prod-123",
  delete: true // This will ensure the product is deleted
});
```
