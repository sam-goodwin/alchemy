---
title: Managing AWS Omics AnnotationStores with Alchemy
description: Learn how to create, update, and manage AWS Omics AnnotationStores using Alchemy Cloud Control.
---

# AnnotationStore

The AnnotationStore resource lets you create and manage [AWS Omics AnnotationStores](https://docs.aws.amazon.com/omics/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-omics-annotationstore.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const annotationstore = await AWS.Omics.AnnotationStore("annotationstore-example", {
  StoreFormat: "example-storeformat",
  Name: "annotationstore-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A annotationstore resource managed by Alchemy",
});
```

## Advanced Configuration

Create a annotationstore with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedAnnotationStore = await AWS.Omics.AnnotationStore("advanced-annotationstore", {
  StoreFormat: "example-storeformat",
  Name: "annotationstore-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A annotationstore resource managed by Alchemy",
});
```

