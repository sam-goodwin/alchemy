---
title: Managing AWS Glue Databases with Alchemy
description: Learn how to create, update, and manage AWS Glue Databases using Alchemy Cloud Control.
---

# Database

The Database resource lets you create and manage [AWS Glue Databases](https://docs.aws.amazon.com/glue/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-glue-database.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const database = await AWS.Glue.Database("database-example", {
  DatabaseInput: "example-databaseinput",
  CatalogId: "example-catalogid",
});
```

