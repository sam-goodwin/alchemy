---
title: Managing AWS Kendra Indexs with Alchemy
description: Learn how to create, update, and manage AWS Kendra Indexs using Alchemy Cloud Control.
---

# Index

The Index resource lets you create and manage [AWS Kendra Indexs](https://docs.aws.amazon.com/kendra/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-kendra-index.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const index = await AWS.Kendra.Index("index-example", {
  RoleArn: "example-rolearn",
  Edition: "example-edition",
  Name: "index-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A index resource managed by Alchemy",
});
```

## Advanced Configuration

Create a index with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedIndex = await AWS.Kendra.Index("advanced-index", {
  RoleArn: "example-rolearn",
  Edition: "example-edition",
  Name: "index-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A index resource managed by Alchemy",
});
```

