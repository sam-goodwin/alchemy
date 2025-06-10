---
title: ResourceAssociation
description: Learn how to create, update, and manage AWS ServiceCatalogAppRegistry ResourceAssociations using Alchemy Cloud Control.
---


The ResourceAssociation resource allows you to associate existing AWS resources with an application in AWS Service Catalog AppRegistry. This enables you to manage and visualize the resources that comprise an application. For more information, see the official AWS documentation: [AWS ServiceCatalogAppRegistry ResourceAssociations](https://docs.aws.amazon.com/servicecatalogappregistry/latest/userguide/).

## Minimal Example

Create a basic resource association with required properties and an optional adoption flag.

```ts
import AWS from "alchemy/aws/control";

const resourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("myResourceAssociation", {
  Resource: "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678",
  ResourceType: "AWS::EC2::Instance",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/myApp",
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a resource association with more complex attributes, including handling additional properties such as ARN and timestamps.

```ts
const advancedResourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("advancedResourceAssociation", {
  Resource: "arn:aws:s3:::my-bucket",
  ResourceType: "AWS::S3::Bucket",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/myApp"
});

// You can access additional properties like ARN, creation time, and last update time
console.log(`Resource ARN: ${advancedResourceAssociation.Arn}`);
console.log(`Resource Created At: ${advancedResourceAssociation.CreationTime}`);
console.log(`Last Updated At: ${advancedResourceAssociation.LastUpdateTime}`);
```

## Associating Multiple Resources

Demonstrate how to create multiple resource associations for different types of resources within the same application.

```ts
const ec2InstanceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("ec2ResourceAssociation", {
  Resource: "arn:aws:ec2:us-west-2:123456789012:instance/i-0abcd1234efgh5678",
  ResourceType: "AWS::EC2::Instance",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/myApp"
});

const s3BucketAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("s3ResourceAssociation", {
  Resource: "arn:aws:s3:::my-bucket",
  ResourceType: "AWS::S3::Bucket",
  Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/myApp"
});
```

## Error Handling with Adoption

Show how to handle errors gracefully when attempting to associate a resource that may already exist, using the adopt flag.

```ts
try {
  const existingResourceAssociation = await AWS.ServiceCatalogAppRegistry.ResourceAssociation("existingResourceAssociation", {
    Resource: "arn:aws:rds:us-west-2:123456789012:db:my-database",
    ResourceType: "AWS::RDS::DBInstance",
    Application: "arn:aws:servicecatalog:us-west-2:123456789012:application/myApp",
    adopt: true // This will allow adoption of the existing resource
  });
} catch (error) {
  console.error("Failed to associate resource:", error);
}
```
