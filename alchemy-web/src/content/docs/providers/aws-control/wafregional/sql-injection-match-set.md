---
title: SqlInjectionMatchSet
description: Learn how to create, update, and manage AWS WAFRegional SqlInjectionMatchSets using Alchemy Cloud Control.
---


The SqlInjectionMatchSet resource allows you to define a set of SQL injection match tuples that can be used to identify SQL injection attacks in web requests. For more information, refer to the [AWS WAFRegional SqlInjectionMatchSets documentation](https://docs.aws.amazon.com/wafregional/latest/userguide/).

## Minimal Example

Create a basic SqlInjectionMatchSet with one SQL injection match tuple.

```ts
import AWS from "alchemy/aws/control";

const sqlInjectionMatchSet = await AWS.WAFRegional.SqlInjectionMatchSet("basicSqlInjectionMatchSet", {
  Name: "BasicSQLInjectionSet",
  SqlInjectionMatchTuples: [{
    FieldToMatch: {
      Type: "QUERY_STRING"
    },
    TextTransformation: "URL_DECODE",
    TargetString: "SELECT * FROM"
  }]
});
```

## Advanced Configuration

Configure a SqlInjectionMatchSet with multiple SQL injection match tuples for enhanced protection.

```ts
const advancedSqlInjectionMatchSet = await AWS.WAFRegional.SqlInjectionMatchSet("advancedSqlInjectionMatchSet", {
  Name: "AdvancedSQLInjectionSet",
  SqlInjectionMatchTuples: [
    {
      FieldToMatch: {
        Type: "BODY"
      },
      TextTransformation: "URL_DECODE",
      TargetString: "DROP TABLE"
    },
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TextTransformation: "LOWERCASE",
      TargetString: "UNION SELECT"
    }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing SqlInjectionMatchSet without creating a new one, use the `adopt` property.

```ts
const existingSqlInjectionMatchSet = await AWS.WAFRegional.SqlInjectionMatchSet("existingSqlInjectionMatchSet", {
  Name: "ExistingSQLInjectionSet",
  adopt: true
});
```

## Use Case: Associating with WebACL

Demonstrate how to associate a SqlInjectionMatchSet with a WebACL for comprehensive security.

```ts
const webAclWithSqlInjectionProtection = await AWS.WAFRegional.WebACL("webAclWithSqlInjectionProtection", {
  Name: "WebAclWithSQLInjectionProtection",
  DefaultAction: {
    Type: "ALLOW"
  },
  Rules: [{
    Type: "REGULAR",
    Priority: 1,
    RuleId: sqlInjectionMatchSet.id, // Assuming this matches the ID of the created SqlInjectionMatchSet
    Action: {
      Type: "BLOCK"
    }
  }]
});
```
