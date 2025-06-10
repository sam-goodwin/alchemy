---
title: ByteMatchSet
description: Learn how to create, update, and manage AWS WAF ByteMatchSets using Alchemy Cloud Control.
---


The ByteMatchSet resource lets you manage [AWS WAF ByteMatchSets](https://docs.aws.amazon.com/waf/latest/userguide/) which are used to inspect web requests and match specific byte sequences.

## Minimal Example

Create a basic ByteMatchSet with a name and one ByteMatchTuple.

```ts
import AWS from "alchemy/aws/control";

const basicByteMatchSet = await AWS.WAF.ByteMatchSet("basicByteMatchSet", {
  name: "MyByteMatchSet",
  byteMatchTuples: [
    {
      fieldToMatch: {
        type: "HEADER",
        data: "User-Agent"
      },
      targetString: "BadBot",
      textTransformation: "NONE",
      positionalConstraint: "CONTAINS"
    }
  ]
});
```

## Advanced Configuration

Configure a ByteMatchSet with multiple ByteMatchTuples and different text transformations.

```ts
const advancedByteMatchSet = await AWS.WAF.ByteMatchSet("advancedByteMatchSet", {
  name: "AdvancedByteMatchSet",
  byteMatchTuples: [
    {
      fieldToMatch: {
        type: "QUERY_STRING",
        data: "session"
      },
      targetString: "malicious",
      textTransformation: "URL_DECODE",
      positionalConstraint: "EXACTLY"
    },
    {
      fieldToMatch: {
        type: "BODY",
        data: ""
      },
      targetString: "SELECT * FROM users",
      textTransformation: "NONE",
      positionalConstraint: "CONTAINS"
    }
  ]
});
```

## Example with Adoption

Create a ByteMatchSet while adopting an existing resource if it already exists.

```ts
const adoptedByteMatchSet = await AWS.WAF.ByteMatchSet("adoptedByteMatchSet", {
  name: "AdoptedByteMatchSet",
  byteMatchTuples: [
    {
      fieldToMatch: {
        type: "URI",
        data: ""
      },
      targetString: "/admin",
      textTransformation: "LOWERCASE",
      positionalConstraint: "STARTS_WITH"
    }
  ],
  adopt: true // If true, adopt existing resource instead of failing
});
```

## Example with Multiple Match Conditions

Create a ByteMatchSet that includes multiple conditions to enhance security through pattern matching.

```ts
const multiConditionByteMatchSet = await AWS.WAF.ByteMatchSet("multiConditionByteMatchSet", {
  name: "MultiConditionByteMatchSet",
  byteMatchTuples: [
    {
      fieldToMatch: {
        type: "HEADER",
        data: "Referer"
      },
      targetString: "malicious-site.com",
      textTransformation: "NONE",
      positionalConstraint: "CONTAINS"
    },
    {
      fieldToMatch: {
        type: "BODY",
        data: ""
      },
      targetString: "DROP TABLE",
      textTransformation: "NONE",
      positionalConstraint: "CONTAINS"
    }
  ]
});
```
