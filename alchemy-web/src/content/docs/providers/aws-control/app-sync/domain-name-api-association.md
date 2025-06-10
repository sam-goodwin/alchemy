---
title: DomainNameApiAssociation
description: Learn how to create, update, and manage AWS AppSync DomainNameApiAssociations using Alchemy Cloud Control.
---


The DomainNameApiAssociation resource allows you to associate an API with a custom domain name for your AWS AppSync service. This resource simplifies the management of custom domains in AppSync, enabling you to enhance your API's accessibility and branding. For more details, refer to the AWS documentation: [AWS AppSync DomainNameApiAssociations](https://docs.aws.amazon.com/appsync/latest/userguide/).

## Minimal Example

Create a basic DomainNameApiAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const domainNameApiAssociation = await AWS.AppSync.DomainNameApiAssociation("MyDomainApiAssociation", {
  DomainName: "api.myapp.com",
  ApiId: "1234567890abcdef"
});
```

## Advanced Configuration

Configure the DomainNameApiAssociation with the optional `adopt` property to allow adoption of existing resources.

```ts
const adoptedDomainApiAssociation = await AWS.AppSync.DomainNameApiAssociation("AdoptedDomainApiAssociation", {
  DomainName: "existing.api.myapp.com",
  ApiId: "0987654321fedcba",
  adopt: true // Adopt existing resource if it already exists
});
```

## Example with Additional Properties

Create a DomainNameApiAssociation and access its ARN and timestamps.

```ts
const detailedDomainApiAssociation = await AWS.AppSync.DomainNameApiAssociation("DetailedDomainApiAssociation", {
  DomainName: "detailed.api.myapp.com",
  ApiId: "abcdef1234567890"
});

// Accessing additional properties
console.log("ARN:", detailedDomainApiAssociation.Arn);
console.log("Created At:", detailedDomainApiAssociation.CreationTime);
console.log("Last Updated At:", detailedDomainApiAssociation.LastUpdateTime);
```
