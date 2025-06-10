---
title: SqlInjectionMatchSet
description: Learn how to create, update, and manage AWS WAF SqlInjectionMatchSets using Alchemy Cloud Control.
---


The SqlInjectionMatchSet resource allows you to manage SQL injection match sets for AWS WAF, providing a way to define sets of SQL injection match tuples to inspect web requests. For more detailed information, refer to the [AWS WAF SqlInjectionMatchSets documentation](https://docs.aws.amazon.com/waf/latest/userguide/).

## Minimal Example

Create a basic SqlInjectionMatchSet with a name and a SQL injection match tuple.

```ts
import AWS from "alchemy/aws/control";

const sqlInjectionMatchSet = await AWS.WAF.SqlInjectionMatchSet("basicSqlInjectionMatchSet", {
  Name: "BasicSqlInjectionMatchSet",
  SqlInjectionMatchTuples: [
    {
      FieldToMatch: {
        Type: "QUERY_STRING",
        Data: "userInput"
      },
      TextTransformation: "URL_DECODE",
      TargetString: "SELECT * FROM"
    }
  ]
});
```

## Advanced Configuration

Define a SqlInjectionMatchSet with multiple SQL injection match tuples for enhanced security.

```ts
const advancedSqlInjectionMatchSet = await AWS.WAF.SqlInjectionMatchSet("advancedSqlInjectionMatchSet", {
  Name: "AdvancedSqlInjectionMatchSet",
  SqlInjectionMatchTuples: [
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TextTransformation: "URL_DECODE",
      TargetString: "' OR '1'='1"
    },
    {
      FieldToMatch: {
        Type: "BODY",
        Data: "payload"
      },
      TextTransformation: "URL_DECODE",
      TargetString: "DROP TABLE"
    }
  ]
});
```

## Example with Adoption

Create a SqlInjectionMatchSet that adopts an existing resource if it already exists.

```ts
const adoptedSqlInjectionMatchSet = await AWS.WAF.SqlInjectionMatchSet("adoptedSqlInjectionMatchSet", {
  Name: "AdoptedSqlInjectionMatchSet",
  SqlInjectionMatchTuples: [
    {
      FieldToMatch: {
        Type: "QUERY_STRING",
        Data: "search"
      },
      TextTransformation: "URL_DECODE",
      TargetString: "SELECT"
    }
  ],
  adopt: true
});
```
