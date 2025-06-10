---
title: CloudFormationProduct
description: Learn how to create, update, and manage AWS ServiceCatalog CloudFormationProducts using Alchemy Cloud Control.
---


The CloudFormationProduct resource allows you to manage AWS ServiceCatalog CloudFormation products, enabling you to create and manage cloud products that can be provisioned in AWS accounts. For more information, please refer to the [AWS ServiceCatalog CloudFormationProducts documentation](https://docs.aws.amazon.com/servicecatalog/latest/userguide/).

## Minimal Example

Create a basic CloudFormation product with required properties and one optional parameter.

```ts
import AWS from "alchemy/aws/control";

const basicProduct = await AWS.ServiceCatalog.CloudFormationProduct("basicProduct", {
  Owner: "MyCompany",
  Name: "MyFirstProduct",
  Description: "This is my first CloudFormation product.",
  SupportEmail: "support@mycompany.com"
});
```

## Advanced Configuration

Configure a CloudFormation product with additional advanced options, including provisioning artifact parameters and support URLs.

```ts
const advancedProduct = await AWS.ServiceCatalog.CloudFormationProduct("advancedProduct", {
  Owner: "MyCompany",
  Name: "MyAdvancedProduct",
  Description: "An advanced product with provisioning artifacts.",
  SupportEmail: "support@mycompany.com",
  SupportUrl: "https://support.mycompany.com",
  ProvisioningArtifactParameters: [
    {
      Name: "v1.0",
      Description: "Version 1.0 of my product",
      Type: "CLOUD_FORMATION",
      TemplateUrl: "https://mycompany.com/templates/my-product-template.yaml",
      Parameters: {
        InstanceType: "t2.micro",
        KeyName: "my-key-pair"
      }
    }
  ]
});
```

## Adoption of Existing Resources

If you need to adopt an existing CloudFormation product instead of creating a new one, you can set the `adopt` property to `true`.

```ts
const adoptExistingProduct = await AWS.ServiceCatalog.CloudFormationProduct("existingProduct", {
  Owner: "MyCompany",
  Name: "MyExistingProduct",
  Description: "Adopting an existing product.",
  adopt: true
});
```

## Custom Source Connection

This example demonstrates creating a CloudFormation product with a specific source connection configuration.

```ts
const sourceConnectedProduct = await AWS.ServiceCatalog.CloudFormationProduct("sourceConnectedProduct", {
  Owner: "MyCompany",
  Name: "MyProductWithSource",
  Description: "A product with a custom source connection.",
  SourceConnection: {
    Type: "GITHUB",
    Repository: "mycompany/my-repo",
    Branch: "main"
  }
});
```
