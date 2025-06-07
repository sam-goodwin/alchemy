---
title: Managing AWS WAFRegional SizeConstraintSets with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional SizeConstraintSets using Alchemy Cloud Control.
---

# SizeConstraintSet

The SizeConstraintSet resource lets you define a set of size constraints for your AWS WAFRegional web ACLs. This allows you to specify rules based on the size of specified request components. For more information, visit the [AWS WAFRegional SizeConstraintSets](https://docs.aws.amazon.com/wafregional/latest/userguide/).

## Minimal Example

Create a basic SizeConstraintSet with required properties and common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicSizeConstraintSet = await AWS.WAFRegional.SizeConstraintSet("BasicSizeConstraintSet", {
  Name: "MySizeConstraintSet",
  SizeConstraints: [
    {
      ComparisonOperator: "GT",
      Size: 100,
      FieldToMatch: {
        Type: "HEADER",
        Data: "Content-Length"
      },
      TextTransformation: "NONE"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a SizeConstraintSet with multiple size constraints for different fields.

```ts
const AdvancedSizeConstraintSet = await AWS.WAFRegional.SizeConstraintSet("AdvancedSizeConstraintSet", {
  Name: "AdvancedSizeConstraintSet",
  SizeConstraints: [
    {
      ComparisonOperator: "LE",
      Size: 200,
      FieldToMatch: {
        Type: "QUERY_STRING",
        Data: "param1"
      },
      TextTransformation: "URL_DECODE"
    },
    {
      ComparisonOperator: "EQ",
      Size: 150,
      FieldToMatch: {
        Type: "BODY",
        Data: ""
      },
      TextTransformation: "HTML_ENTITY_DECODE"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Use Case: Enforcing Size Limits

Create a SizeConstraintSet to enforce limits on request body sizes for security purposes.

```ts
const SecuritySizeConstraintSet = await AWS.WAFRegional.SizeConstraintSet("SecuritySizeConstraintSet", {
  Name: "SecuritySizeLimits",
  SizeConstraints: [
    {
      ComparisonOperator: "GT",
      Size: 5120, // Limit to 5 KB
      FieldToMatch: {
        Type: "BODY",
        Data: ""
      },
      TextTransformation: "NONE"
    }
  ],
  adopt: false // Fail if resource already exists
});
```

## Use Case: Filtering Based on Header Size

Define a SizeConstraintSet that checks the size of a custom header.

```ts
const HeaderSizeConstraintSet = await AWS.WAFRegional.SizeConstraintSet("HeaderSizeConstraintSet", {
  Name: "HeaderSizeConstraints",
  SizeConstraints: [
    {
      ComparisonOperator: "EQ",
      Size: 50,
      FieldToMatch: {
        Type: "HEADER",
        Data: "X-Custom-Header"
      },
      TextTransformation: "NONE"
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```