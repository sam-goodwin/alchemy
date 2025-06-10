---
title: SizeConstraintSet
description: Learn how to create, update, and manage AWS WAFRegional SizeConstraintSets using Alchemy Cloud Control.
---


The SizeConstraintSet resource allows you to create and manage [AWS WAFRegional SizeConstraintSets](https://docs.aws.amazon.com/wafregional/latest/userguide/), which are used to specify size constraints for web requests.

## Minimal Example

Create a basic SizeConstraintSet with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicSizeConstraintSet = await AWS.WAFRegional.SizeConstraintSet("basicSizeConstraintSet", {
  name: "BasicSizeConstraintSet",
  sizeConstraints: [
    {
      fieldToMatch: { type: "URI" },
      comparisonOperator: "GT",
      size: 1024,
      textTransformation: "NONE"
    }
  ]
});
```

## Advanced Configuration

Configure a SizeConstraintSet with multiple size constraints and various fields.

```ts
const advancedSizeConstraintSet = await AWS.WAFRegional.SizeConstraintSet("advancedSizeConstraintSet", {
  name: "AdvancedSizeConstraintSet",
  sizeConstraints: [
    {
      fieldToMatch: { type: "HEADER", data: "User-Agent" },
      comparisonOperator: "EQ",
      size: 256,
      textTransformation: "NONE"
    },
    {
      fieldToMatch: { type: "BODY" },
      comparisonOperator: "LE",
      size: 2048,
      textTransformation: "NONE"
    }
  ]
});
```

## Use Case: Blocking Large Requests

Create a SizeConstraintSet to block requests with a body larger than a specified size.

```ts
const blockLargeRequestsSet = await AWS.WAFRegional.SizeConstraintSet("blockLargeRequestsSet", {
  name: "BlockLargeRequestsSet",
  sizeConstraints: [
    {
      fieldToMatch: { type: "BODY" },
      comparisonOperator: "GT",
      size: 4096,
      textTransformation: "NONE"
    }
  ]
});
```

## Use Case: Limiting Header Size

Create a SizeConstraintSet to limit the size of a specific header.

```ts
const limitHeaderSizeSet = await AWS.WAFRegional.SizeConstraintSet("limitHeaderSizeSet", {
  name: "LimitHeaderSizeSet",
  sizeConstraints: [
    {
      fieldToMatch: { type: "HEADER", data: "Content-Length" },
      comparisonOperator: "GT",
      size: 512,
      textTransformation: "NONE"
    }
  ]
});
```
