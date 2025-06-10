---
title: IdNamespaceAssociation
description: Learn how to create, update, and manage AWS CleanRooms IdNamespaceAssociations using Alchemy Cloud Control.
---


The IdNamespaceAssociation resource allows you to manage [AWS CleanRooms IdNamespaceAssociations](https://docs.aws.amazon.com/cleanrooms/latest/userguide/) and their configurations for data collaboration and privacy.

## Minimal Example

This example demonstrates how to create a basic IdNamespaceAssociation with required properties and a couple of common optional properties.

```ts
import AWS from "alchemy/aws/control";

const idNamespaceAssociation = await AWS.CleanRooms.IdNamespaceAssociation("basicIdNamespaceAssociation", {
  MembershipIdentifier: "membership-12345",
  Name: "MyFirstIdNamespaceAssociation",
  Description: "This association connects to my first CleanRoom.",
  InputReferenceConfig: {
    referenceArn: "arn:aws:cleanrooms:us-east-1:123456789012:input-reference/my-input-reference"
  }
});
```

## Advanced Configuration

Configure an IdNamespaceAssociation with an IdMappingConfig and tags for better organization and management.

```ts
const advancedIdNamespaceAssociation = await AWS.CleanRooms.IdNamespaceAssociation("advancedIdNamespaceAssociation", {
  MembershipIdentifier: "membership-67890",
  Name: "MyAdvancedIdNamespaceAssociation",
  Description: "An advanced association with mapping configuration.",
  InputReferenceConfig: {
    referenceArn: "arn:aws:cleanrooms:us-east-1:123456789012:input-reference/my-advanced-input"
  },
  IdMappingConfig: {
    mappings: [
      { source: "sourceId", target: "targetId" }
    ]
  },
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "DataScience" }
  ]
});
```

## Using Adopt Option

This example shows how to create an IdNamespaceAssociation while adopting an existing resource if it already exists.

```ts
const adoptedIdNamespaceAssociation = await AWS.CleanRooms.IdNamespaceAssociation("adoptedIdNamespaceAssociation", {
  MembershipIdentifier: "membership-101112",
  Name: "MyAdoptedIdNamespaceAssociation",
  Description: "Adopting an existing IdNamespaceAssociation.",
  InputReferenceConfig: {
    referenceArn: "arn:aws:cleanrooms:us-east-1:123456789012:input-reference/my-adopted-input"
  },
  adopt: true
});
```
