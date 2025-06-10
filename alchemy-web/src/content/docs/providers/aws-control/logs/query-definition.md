---
title: QueryDefinition
description: Learn how to create, update, and manage AWS Logs QueryDefinitions using Alchemy Cloud Control.
---


The QueryDefinition resource lets you manage [AWS Logs QueryDefinitions](https://docs.aws.amazon.com/logs/latest/userguide/) for defining queries on log data. 

## Minimal Example

Create a basic query definition with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicQueryDefinition = await AWS.Logs.QueryDefinition("basicQuery", {
  Name: "ErrorLogQuery",
  QueryString: "fields @timestamp, @message | sort @timestamp desc | limit 20",
  LogGroupNames: ["application-logs"]
});
```

## Advanced Configuration

Define a query with additional configuration such as specifying the query language:

```ts
const advancedQueryDefinition = await AWS.Logs.QueryDefinition("advancedQuery", {
  Name: "DebugLogQuery",
  QueryString: "fields @timestamp, @message | filter @message like /DEBUG/ | sort @timestamp desc | limit 20",
  LogGroupNames: ["application-logs", "system-logs"],
  QueryLanguage: "SQL"
});
```

## Query with Adoption

Create a query definition that adopts an existing resource if it already exists:

```ts
const adoptedQueryDefinition = await AWS.Logs.QueryDefinition("adoptedQuery", {
  Name: "AdoptedErrorLogQuery",
  QueryString: "fields @timestamp, @message | filter @message like /ERROR/",
  LogGroupNames: ["application-logs"],
  adopt: true
});
```
