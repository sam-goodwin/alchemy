---
title: Managing AWS AppSync DataSources with Alchemy
description: Learn how to create, update, and manage AWS AppSync DataSources using Alchemy Cloud Control.
---

# DataSource

The DataSource resource lets you create and manage [AWS AppSync DataSources](https://docs.aws.amazon.com/appsync/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-datasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datasource = await AWS.AppSync.DataSource("datasource-example", {
  Name: "datasource-",
  Type: "example-type",
  ApiId: "example-apiid",
  Description: "A datasource resource managed by Alchemy",
});
```

## Advanced Configuration

Create a datasource with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataSource = await AWS.AppSync.DataSource("advanced-datasource", {
  Name: "datasource-",
  Type: "example-type",
  ApiId: "example-apiid",
  Description: "A datasource resource managed by Alchemy",
});
```

