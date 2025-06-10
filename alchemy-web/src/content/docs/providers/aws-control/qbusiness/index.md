---
title: Index
description: Learn how to create, update, and manage AWS QBusiness Indexs using Alchemy Cloud Control.
---


The Index resource lets you manage [AWS QBusiness Indexs](https://docs.aws.amazon.com/qbusiness/latest/userguide/) for organizing and indexing business documents efficiently.

## Minimal Example

Create a basic QBusiness Index with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicIndex = await AWS.QBusiness.Index("basicIndex", {
  DisplayName: "Basic Business Index",
  ApplicationId: "myApplicationId",
  Description: "This is a basic QBusiness Index for managing business documents."
});
```

## Advanced Configuration

Configure the QBusiness Index with additional options like document attribute configurations and capacity settings:

```ts
import AWS from "alchemy/aws/control";

const advancedIndex = await AWS.QBusiness.Index("advancedIndex", {
  DisplayName: "Advanced Business Index",
  ApplicationId: "myApplicationId",
  Description: "This index has advanced configurations.",
  DocumentAttributeConfigurations: [
    {
      AttributeName: "DocumentType",
      AttributeType: "String",
      Facetable: true,
      Searchable: true,
      Sortable: true
    },
    {
      AttributeName: "CreatedDate",
      AttributeType: "Date",
      Facetable: false,
      Searchable: false,
      Sortable: true
    }
  ],
  CapacityConfiguration: {
    DesiredInstanceType: "search.c5.large",
    DesiredInstanceCount: 2
  }
});
```

## Resource Adoption

Create a QBusiness Index while allowing the adoption of an existing resource instead of failing if it already exists:

```ts
import AWS from "alchemy/aws/control";

const adoptedIndex = await AWS.QBusiness.Index("adoptedIndex", {
  DisplayName: "Adopted Business Index",
  ApplicationId: "myApplicationId",
  Description: "This index adopts an existing resource if available.",
  adopt: true
});
```

## Tagging Resources

Add tags to the QBusiness Index for better resource management and organization:

```ts
import AWS from "alchemy/aws/control";

const taggedIndex = await AWS.QBusiness.Index("taggedIndex", {
  DisplayName: "Tagged Business Index",
  ApplicationId: "myApplicationId",
  Description: "This index is tagged for better organization.",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "QBusiness" }
  ]
});
```
