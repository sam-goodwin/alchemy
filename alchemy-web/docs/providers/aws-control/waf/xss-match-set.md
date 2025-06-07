---
title: Managing AWS WAF XssMatchSets with Alchemy
description: Learn how to create, update, and manage AWS WAF XssMatchSets using Alchemy Cloud Control.
---

# XssMatchSet

The XssMatchSet resource lets you create and manage [AWS WAF XssMatchSets](https://docs.aws.amazon.com/waf/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-waf-xssmatchset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const xssmatchset = await AWS.WAF.XssMatchSet("xssmatchset-example", {
  Name: "xssmatchset-",
  XssMatchTuples: [],
});
```

