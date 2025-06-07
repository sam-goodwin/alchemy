---
title: Managing AWS WAF SizeConstraintSets with Alchemy
description: Learn how to create, update, and manage AWS WAF SizeConstraintSets using Alchemy Cloud Control.
---

# SizeConstraintSet

The SizeConstraintSet resource lets you manage [AWS WAF SizeConstraintSets](https://docs.aws.amazon.com/waf/latest/userguide/) to control web traffic based on the size of specific parts of the request (like headers, body, etc.).

## Minimal Example

Create a basic SizeConstraintSet with required properties.

```ts
import AWS from "alchemy/aws/control";

const sizeConstraintSet = await AWS.WAF.SizeConstraintSet("BasicSizeConstraintSet", {
  Name: "BasicSizeConstraintSet",
  SizeConstraints: [
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      ComparisonOperator: "GT",
      Size: 100,
      TextTransformation: "NONE"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a SizeConstraintSet with multiple size constraints and transformations.

```ts
const advancedSizeConstraintSet = await AWS.WAF.SizeConstraintSet("AdvancedSizeConstraintSet", {
  Name: "AdvancedSizeConstraintSet",
  SizeConstraints: [
    {
      FieldToMatch: {
        Type: "QUERY_STRING",
        Data: "search"
      },
      ComparisonOperator: "LE",
      Size: 200,
      TextTransformation: "URL_DECODE"
    },
    {
      FieldToMatch: {
        Type: "BODY",
      },
      ComparisonOperator: "EQ",
      Size: 500,
      TextTransformation: "NONE"
    }
  ]
});
```

## Multiple Size Constraints

Create a SizeConstraintSet with several constraints for different fields.

```ts
const multiSizeConstraintSet = await AWS.WAF.SizeConstraintSet("MultiSizeConstraintSet", {
  Name: "MultiSizeConstraintSet",
  SizeConstraints: [
    {
      FieldToMatch: {
        Type: "URI",
      },
      ComparisonOperator: "GT",
      Size: 50,
      TextTransformation: "NONE"
    },
    {
      FieldToMatch: {
        Type: "HEADER",
        Data: "Content-Length"
      },
      ComparisonOperator: "LT",
      Size: 1000,
      TextTransformation: "NONE"
    }
  ]
});
```