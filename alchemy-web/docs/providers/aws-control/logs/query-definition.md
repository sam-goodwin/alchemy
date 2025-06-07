---
title: Managing AWS Logs QueryDefinitions with Alchemy
description: Learn how to create, update, and manage AWS Logs QueryDefinitions using Alchemy Cloud Control.
---

# QueryDefinition

The QueryDefinition resource allows you to manage [AWS Logs QueryDefinitions](https://docs.aws.amazon.com/logs/latest/userguide/) for creating and storing log queries. This resource enables you to define the queries that can be run against your log data in CloudWatch Logs.

## Minimal Example

Create a basic QueryDefinition with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicQueryDefinition = await AWS.Logs.QueryDefinition("BasicQuery", {
  QueryString: "fields @timestamp, @message | sort @timestamp desc",
  LogGroupNames: ["my-log-group"],
  Name: "MyBasicQuery"
});
```

## Advanced Configuration

Configure a QueryDefinition with additional options such as query language.

```ts
const advancedQueryDefinition = await AWS.Logs.QueryDefinition("AdvancedQuery", {
  QueryString: "fields @timestamp, @message | filter @message like 'Error' | sort @timestamp desc",
  LogGroupNames: ["my-log-group"],
  QueryLanguage: "pql",
  Name: "MyAdvancedQuery"
});
```

## Adopt Existing Resource

If you want to adopt an existing QueryDefinition instead of creating a new one, you can set the adopt option to true.

```ts
const adoptQueryDefinition = await AWS.Logs.QueryDefinition("AdoptExistingQuery", {
  QueryString: "fields @timestamp, @message",
  Name: "AdoptedQuery",
  adopt: true
});
```