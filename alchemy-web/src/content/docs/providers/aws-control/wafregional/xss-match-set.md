---
title: XssMatchSet
description: Learn how to create, update, and manage AWS WAFRegional XssMatchSets using Alchemy Cloud Control.
---


The XssMatchSet resource lets you manage [AWS WAFRegional XssMatchSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) to help protect your web applications from cross-site scripting (XSS) attacks by specifying the XSS match criteria.

## Minimal Example

Create a basic XssMatchSet with a single XSS match tuple.

```ts
import AWS from "alchemy/aws/control";

const xssMatchSet = await AWS.WAFRegional.XssMatchSet("basicXssMatchSet", {
  name: "BasicXssMatchSet",
  xssMatchTuples: [{
    fieldToMatch: {
      type: "QUERY_STRING"
    },
    textTransformation: "URL_DECODE",
    targetString: "<script>"
  }]
});
```

## Advanced Configuration

Configure an XssMatchSet with multiple XSS match tuples and additional properties.

```ts
const advancedXssMatchSet = await AWS.WAFRegional.XssMatchSet("advancedXssMatchSet", {
  name: "AdvancedXssMatchSet",
  xssMatchTuples: [
    {
      fieldToMatch: {
        type: "HEADER",
        data: "User-Agent"
      },
      textTransformation: "HTML_ENTITY_DECODE",
      targetString: "<script>"
    },
    {
      fieldToMatch: {
        type: "BODY"
      },
      textTransformation: "CSS_DECODE",
      targetString: "<img src=x onerror=alert(1)>"
    }
  ],
  adopt: true // Adopts the existing resource if it already exists
});
```

## Using with AWS WAFRegional WebACL

This example demonstrates how to associate an XssMatchSet with a WebACL for comprehensive protection.

```ts
import AWS from "alchemy/aws/control";

const webAcl = await AWS.WAFRegional.WebACL("myWebAcl", {
  name: "MyWebAcl",
  metricName: "MyWebAclMetric",
  defaultAction: {
    type: "ALLOW"
  },
  rules: [{
    priority: 1,
    ruleId: xssMatchSet.id, // Use the ID of the XssMatchSet created earlier
    action: {
      type: "BLOCK"
    },
    isDefault: false
  }]
});
```
