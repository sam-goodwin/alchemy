---
title: Managing AWS WAFRegional XssMatchSets with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional XssMatchSets using Alchemy Cloud Control.
---

# XssMatchSet

The XssMatchSet resource lets you create and manage [AWS WAFRegional XssMatchSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-xssmatchset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const xssmatchset = await AWS.WAFRegional.XssMatchSet("xssmatchset-example", {
  Name: "xssmatchset-",
});
```

