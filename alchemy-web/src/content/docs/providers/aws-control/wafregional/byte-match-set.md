---
title: ByteMatchSet
description: Learn how to create, update, and manage AWS WAFRegional ByteMatchSets using Alchemy Cloud Control.
---


The ByteMatchSet resource lets you manage [AWS WAFRegional ByteMatchSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) which are used to specify a sequence of bytes that you want AWS WAF to search for in web requests.

## Minimal Example

Create a basic ByteMatchSet with a name and a single ByteMatchTuple.

```ts
import AWS from "alchemy/aws/control";

const basicByteMatchSet = await AWS.WAFRegional.ByteMatchSet("basicByteMatchSet", {
  Name: "BasicByteMatchSet",
  ByteMatchTuples: [{
    FieldToMatch: {
      Type: "HEADER",
      Data: "User-Agent"
    },
    TargetString: "BadBot",
    PositionalConstraint: "CONTAINS",
    TextTransformation: "NONE"
  }]
});
```

## Advanced Configuration

Configure a ByteMatchSet with multiple ByteMatchTuples and various settings.

```ts
const advancedByteMatchSet = await AWS.WAFRegional.ByteMatchSet("advancedByteMatchSet", {
  Name: "AdvancedByteMatchSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "URI",
        Data: "/login"
      },
      TargetString: "malicious",
      PositionalConstraint: "EXACTLY",
      TextTransformation: "NONE"
    },
    {
      FieldToMatch: {
        Type: "BODY",
        Data: ""
      },
      TargetString: "attack",
      PositionalConstraint: "CONTAINS",
      TextTransformation: "URL_DECODE"
    }
  ]
});
```

## Use Case: Protect Against SQL Injection

Create a ByteMatchSet specifically designed to protect against SQL injection attacks.

```ts
const sqlInjectionByteMatchSet = await AWS.WAFRegional.ByteMatchSet("sqlInjectionByteMatchSet", {
  Name: "SQLInjectionProtectionSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "QUERY_STRING",
        Data: ""
      },
      TargetString: "' OR '1'='1",
      PositionalConstraint: "CONTAINS",
      TextTransformation: "URL_DECODE"
    },
    {
      FieldToMatch: {
        Type: "BODY",
        Data: ""
      },
      TargetString: "--",
      PositionalConstraint: "CONTAINS",
      TextTransformation: "NONE"
    }
  ]
});
```

## Use Case: Block Specific User Agents

Define a ByteMatchSet to block requests from specific user agents.

```ts
const userAgentBlockSet = await AWS.WAFRegional.ByteMatchSet("userAgentBlockSet", {
  Name: "UserAgentBlockSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TargetString: "BadBot",
      PositionalConstraint: "CONTAINS",
      TextTransformation: "NONE"
    },
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TargetString: "Scraper",
      PositionalConstraint: "CONTAINS",
      TextTransformation: "NONE"
    }
  ]
});
```
