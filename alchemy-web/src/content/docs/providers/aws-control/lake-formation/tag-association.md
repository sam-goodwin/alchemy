---
title: TagAssociation
description: Learn how to create, update, and manage AWS LakeFormation TagAssociations using Alchemy Cloud Control.
---


The TagAssociation resource allows you to manage [AWS LakeFormation TagAssociations](https://docs.aws.amazon.com/lakeformation/latest/userguide/) which are used to associate tags with LakeFormation resources, enabling fine-grained access control.

## Minimal Example

Create a basic TagAssociation with required properties:

```ts
import AWS from "alchemy/aws/control";

const tagAssociation = await AWS.LakeFormation.TagAssociation("basicTagAssociation", {
  LFTags: [
    {
      TagKey: "Environment",
      TagValues: ["Production"]
    }
  ],
  Resource: {
    Table: {
      DatabaseName: "myDatabase",
      Name: "myTable"
    }
  }
});
```

## Advanced Configuration

Configure a TagAssociation with multiple tags and adopt existing resources:

```ts
const advancedTagAssociation = await AWS.LakeFormation.TagAssociation("advancedTagAssociation", {
  LFTags: [
    {
      TagKey: "Environment",
      TagValues: ["Production"]
    },
    {
      TagKey: "Department",
      TagValues: ["Finance"]
    }
  ],
  Resource: {
    Table: {
      DatabaseName: "myDatabase",
      Name: "myTable"
    }
  },
  adopt: true // Adopt existing resource instead of failing
});
```

## Use Case: Associating Tags with a Data Lake Resource

This example demonstrates how to associate tags with a data lake resource for better access management:

```ts
const dataLakeTagAssociation = await AWS.LakeFormation.TagAssociation("dataLakeTagAssociation", {
  LFTags: [
    {
      TagKey: "Confidentiality",
      TagValues: ["High"]
    },
    {
      TagKey: "Retention",
      TagValues: ["1 Year"]
    }
  ],
  Resource: {
    DataLakePrincipal: {
      DataLakePrincipalIdentifier: "arn:aws:iam::123456789012:role/MyLakeFormationRole"
    }
  }
});
```
