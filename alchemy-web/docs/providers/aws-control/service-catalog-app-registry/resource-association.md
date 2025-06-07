---
title: Managing AWS ServiceCatalogAppRegistry ResourceAssociations with Alchemy
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry ResourceAssociations using Alchemy Cloud Control.
---

# ResourceAssociation

The ResourceAssociation resource allows you to manage associations between AWS Service Catalog App Registry applications and various AWS resources. This enables you to track and manage the relationships between your applications and their underlying resources. For more information, refer to the [AWS ServiceCatalogAppRegistry ResourceAssociations documentation](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic ResourceAssociation with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicResourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("BasicResourceAssociation", {
  Resource: "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678",
  ResourceType: "AWS::EC2::Instance",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/MyApp",
  adopt: true
});
```

## Advanced Configuration

This example illustrates how to configure a ResourceAssociation with additional properties such as adoption of existing resources.

```ts
const advancedResourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("AdvancedResourceAssociation", {
  Resource: "arn:aws:s3:::my-example-bucket",
  ResourceType: "AWS::S3::Bucket",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/MyApp",
  adopt: true // Adopt existing resource if it already exists
});
```

## Associating Multiple Resources

You can create multiple ResourceAssociations for different resources under the same application.

```ts
const ec2ResourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("EC2ResourceAssociation", {
  Resource: "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678",
  ResourceType: "AWS::EC2::Instance",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/MyApp"
});

const s3ResourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("S3ResourceAssociation", {
  Resource: "arn:aws:s3:::my-example-bucket",
  ResourceType: "AWS::S3::Bucket",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/MyApp"
});
```

## Using Tags with ResourceAssociations

Although tags are not explicitly part of the ResourceAssociation properties, you can manage your resources with associated tags for better organization.

```ts
const taggedResourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("TaggedResourceAssociation", {
  Resource: "arn:aws:lambda:us-west-2:123456789012:function:MyFunction",
  ResourceType: "AWS::Lambda::Function",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/MyApp"
});

// Tagging example (assumed structure for demonstration)
const tags = [
  { Key: "Environment", Value: "Production" },
  { Key: "Team", Value: "Development" }
];

// Apply tags to the resource association if supported in the future
```