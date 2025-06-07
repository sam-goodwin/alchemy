---
title: Managing AWS Bedrock DataSources with Alchemy
description: Learn how to create, update, and manage AWS Bedrock DataSources using Alchemy Cloud Control.
---

# DataSource

The DataSource resource lets you create and manage [AWS Bedrock DataSources](https://docs.aws.amazon.com/bedrock/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-bedrock-datasource.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const datasource = await AWS.Bedrock.DataSource("datasource-example", {
  KnowledgeBaseId: "example-knowledgebaseid",
  DataSourceConfiguration: "example-datasourceconfiguration",
  Name: "datasource-",
  Description: "A datasource resource managed by Alchemy",
});
```

## Advanced Configuration

Create a datasource with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDataSource = await AWS.Bedrock.DataSource("advanced-datasource", {
  KnowledgeBaseId: "example-knowledgebaseid",
  DataSourceConfiguration: "example-datasourceconfiguration",
  Name: "datasource-",
  Description: "A datasource resource managed by Alchemy",
});
```

