---
title: Managing AWS WAFRegional ByteMatchSets with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional ByteMatchSets using Alchemy Cloud Control.
---

# ByteMatchSet

The ByteMatchSet resource lets you manage [AWS WAFRegional ByteMatchSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) for inspecting and matching byte sequences in web requests.

## Minimal Example

Create a basic ByteMatchSet with a simple byte match tuple.

```ts
import AWS from "alchemy/aws/control";

const BasicByteMatchSet = await AWS.WAFRegional.ByteMatchSet("BasicByteMatchSet", {
  Name: "MyByteMatchSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TargetString: "BadBot",
      TextTransformation: "NONE",
      PositionalConstraint: "CONTAINS"
    }
  ]
});
```

## Advanced Configuration

Configure a ByteMatchSet with multiple match tuples and transformations.

```ts
const AdvancedByteMatchSet = await AWS.WAFRegional.ByteMatchSet("AdvancedByteMatchSet", {
  Name: "AdvancedByteMatchSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "BODY"
      },
      TargetString: "malicious_code",
      TextTransformation: "URL_DECODE",
      PositionalConstraint: "EXACTLY"
    },
    {
      FieldToMatch: {
        Type: "QUERY_STRING"
      },
      TargetString: "suspicious_parameter",
      TextTransformation: "NONE",
      PositionalConstraint: "STARTS_WITH"
    }
  ]
});
```

## Use Case: Protecting Against SQL Injection

Create a ByteMatchSet specifically designed to detect SQL injection attempts.

```ts
const SqlInjectionByteMatchSet = await AWS.WAFRegional.ByteMatchSet("SqlInjectionByteMatchSet", {
  Name: "SQLInjectionProtection",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "QUERY_STRING"
      },
      TargetString: "SELECT",
      TextTransformation: "LOWERCASE",
      PositionalConstraint: "CONTAINS"
    },
    {
      FieldToMatch: {
        Type: "BODY"
      },
      TargetString: "UNION",
      TextTransformation: "LOWERCASE",
      PositionalConstraint: "CONTAINS"
    }
  ]
});
```

## Use Case: Blocking Specific User Agents

Create a ByteMatchSet to block requests from certain user agents.

```ts
const UserAgentBlockByteMatchSet = await AWS.WAFRegional.ByteMatchSet("UserAgentBlockByteMatchSet", {
  Name: "BlockBadUserAgents",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TargetString: "BadBot",
      TextTransformation: "NONE",
      PositionalConstraint: "EXACTLY"
    },
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TargetString: "MaliciousCrawler",
      TextTransformation: "NONE",
      PositionalConstraint: "EXACTLY"
    }
  ]
});
```