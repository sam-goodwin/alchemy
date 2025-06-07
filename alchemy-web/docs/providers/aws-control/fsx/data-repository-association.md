---
title: Managing AWS FSx DataRepositoryAssociations with Alchemy
description: Learn how to create, update, and manage AWS FSx DataRepositoryAssociations using Alchemy Cloud Control.
---

# DataRepositoryAssociation

The DataRepositoryAssociation resource lets you create and manage [AWS FSx DataRepositoryAssociations](https://docs.aws.amazon.com/fsx/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-fsx-datarepositoryassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datarepositoryassociation = await AWS.FSx.DataRepositoryAssociation(
  "datarepositoryassociation-example",
  {
    FileSystemPath: "example-filesystempath",
    DataRepositoryPath: "example-datarepositorypath",
    FileSystemId: "example-filesystemid",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a datarepositoryassociation with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataRepositoryAssociation = await AWS.FSx.DataRepositoryAssociation(
  "advanced-datarepositoryassociation",
  {
    FileSystemPath: "example-filesystempath",
    DataRepositoryPath: "example-datarepositorypath",
    FileSystemId: "example-filesystemid",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

