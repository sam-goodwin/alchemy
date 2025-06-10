---
title: XssMatchSet
description: Learn how to create, update, and manage AWS WAF XssMatchSets using Alchemy Cloud Control.
---


The XssMatchSet resource allows you to configure and manage [AWS WAF XssMatchSets](https://docs.aws.amazon.com/waf/latest/userguide/), which are used to block or allow web requests based on cross-site scripting (XSS) attacks.

## Minimal Example

Create a basic XssMatchSet with required properties:

```ts
import AWS from "alchemy/aws/control";

const xssMatchSet = await AWS.WAF.XssMatchSet("basicXssMatchSet", {
  name: "MyXssMatchSet",
  xssMatchTuples: [
    {
      fieldToMatch: {
        type: "URI",
      },
      textTransformation: "URL_DECODE",
    }
  ]
});
```

## Advanced Configuration

Configure an XssMatchSet with multiple XSS match tuples for enhanced security:

```ts
const advancedXssMatchSet = await AWS.WAF.XssMatchSet("advancedXssMatchSet", {
  name: "AdvancedXssMatchSet",
  xssMatchTuples: [
    {
      fieldToMatch: {
        type: "QUERY_STRING",
      },
      textTransformation: "HTML_ENTITY_DECODE",
    },
    {
      fieldToMatch: {
        type: "BODY",
      },
      textTransformation: "URL_DECODE",
    }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Using with WebACL

Integrate the XssMatchSet with a WebACL to provide comprehensive protection for your application:

```ts
import AWS from "alchemy/aws/control";

const webAcl = await AWS.WAF.WebAcl("myWebAcl", {
  name: "MyWebAcl",
  defaultAction: {
    type: "ALLOW",
  },
  rules: [
    {
      priority: 1,
      ruleId: xssMatchSet.id,
      action: {
        type: "BLOCK",
      },
      type: "REGULAR"
    }
  ]
});
```

## Example with Multiple Text Transformations

Demonstrate the use of an XssMatchSet with various text transformations for different fields:

```ts
const multiTransformXssMatchSet = await AWS.WAF.XssMatchSet("multiTransformXssMatchSet", {
  name: "MultiTransformXssMatchSet",
  xssMatchTuples: [
    {
      fieldToMatch: {
        type: "HEADER",
        data: "User-Agent",
      },
      textTransformation: "CLEAN_URL",
    },
    {
      fieldToMatch: {
        type: "BODY",
      },
      textTransformation: "HTML_ENTITY_DECODE",
    }
  ]
});
```
