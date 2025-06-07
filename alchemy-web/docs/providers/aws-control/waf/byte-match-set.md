---
title: Managing AWS WAF ByteMatchSets with Alchemy
description: Learn how to create, update, and manage AWS WAF ByteMatchSets using Alchemy Cloud Control.
---

# ByteMatchSet

The ByteMatchSet resource lets you manage [AWS WAF ByteMatchSets](https://docs.aws.amazon.com/waf/latest/userguide/) which are used to inspect web requests for specific byte sequences.

## Minimal Example

Create a basic ByteMatchSet with required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const BasicByteMatchSet = await AWS.WAF.ByteMatchSet("BasicByteMatchSet", {
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

Configure a ByteMatchSet with multiple byte match tuples for more complex filtering:

```ts
const AdvancedByteMatchSet = await AWS.WAF.ByteMatchSet("AdvancedByteMatchSet", {
  Name: "AdvancedByteMatchSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "URI",
        Data: "/api/v1/resource"
      },
      TargetString: "malicious",
      TextTransformation: "NONE",
      PositionalConstraint: "CONTAINS"
    },
    {
      FieldToMatch: {
        Type: "QUERY_STRING",
        Data: "id"
      },
      TargetString: "12345",
      TextTransformation: "LOWERCASE",
      PositionalConstraint: "EXACTLY"
    }
  ]
});
```

## Use Case: Protecting Specific URIs

Create a ByteMatchSet specifically targeting a sensitive API endpoint:

```ts
const ApiProtectionByteMatchSet = await AWS.WAF.ByteMatchSet("ApiProtectionByteMatchSet", {
  Name: "ApiProtectionByteMatchSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "URI",
        Data: "/api/v1/secure-data"
      },
      TargetString: "unauthorized-access",
      TextTransformation: "NONE",
      PositionalConstraint: "CONTAINS"
    }
  ]
});
```

## Use Case: Filtering User-Agent Headers

Set up a ByteMatchSet to filter out requests from specific user agents:

```ts
const UserAgentFilteringByteMatchSet = await AWS.WAF.ByteMatchSet("UserAgentFilteringByteMatchSet", {
  Name: "UserAgentFilteringByteMatchSet",
  ByteMatchTuples: [
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TargetString: "curl",
      TextTransformation: "NONE",
      PositionalConstraint: "STARTS_WITH"
    },
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TargetString: "Postman",
      TextTransformation: "NONE",
      PositionalConstraint: "STARTS_WITH"
    }
  ]
});
```