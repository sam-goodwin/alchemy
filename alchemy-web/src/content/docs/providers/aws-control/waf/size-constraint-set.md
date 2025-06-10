---
title: SizeConstraintSet
description: Learn how to create, update, and manage AWS WAF SizeConstraintSets using Alchemy Cloud Control.
---


The SizeConstraintSet resource allows you to define a set of size constraints for AWS WAF, which can be used to filter out web requests based on the size of specific parts of the request. This is crucial for protecting your applications from various types of attacks and ensuring performance. For more information, see the [AWS WAF SizeConstraintSets documentation](https://docs.aws.amazon.com/waf/latest/userguide/).

## Minimal Example

Create a basic SizeConstraintSet with required properties and one optional property for adoption.

```ts
import AWS from "alchemy/aws/control";

const sizeConstraintSet = await AWS.WAF.SizeConstraintSet("basicSizeConstraintSet", {
  Name: "MySizeConstraintSet",
  SizeConstraints: [
    {
      ComparisonOperator: "GT",
      Size: 1000,
      FieldToMatch: {
        Type: "BODY"
      },
      TextTransformation: "NONE"
    }
  ],
  adopt: true // Optionally adopt existing resource
});
```

## Advanced Configuration

Configure a SizeConstraintSet with multiple size constraints for different parts of the request.

```ts
const advancedSizeConstraintSet = await AWS.WAF.SizeConstraintSet("advancedSizeConstraintSet", {
  Name: "AdvancedSizeConstraintSet",
  SizeConstraints: [
    {
      ComparisonOperator: "LE",
      Size: 5000,
      FieldToMatch: {
        Type: "HEADER",
        Data: "User-Agent"
      },
      TextTransformation: "NONE"
    },
    {
      ComparisonOperator: "EQ",
      Size: 300,
      FieldToMatch: {
        Type: "QUERY_STRING"
      },
      TextTransformation: "LOWERCASE"
    }
  ]
});
```

## Multiple Conditions

Create a SizeConstraintSet to enforce size limits on both headers and body.

```ts
const multiConditionSizeConstraintSet = await AWS.WAF.SizeConstraintSet("multiConditionSizeConstraintSet", {
  Name: "MultiConditionSizeConstraintSet",
  SizeConstraints: [
    {
      ComparisonOperator: "GT",
      Size: 2000,
      FieldToMatch: {
        Type: "BODY"
      },
      TextTransformation: "NONE"
    },
    {
      ComparisonOperator: "EQ",
      Size: 150,
      FieldToMatch: {
        Type: "HEADER",
        Data: "Content-Length"
      },
      TextTransformation: "NONE"
    }
  ]
});
```
