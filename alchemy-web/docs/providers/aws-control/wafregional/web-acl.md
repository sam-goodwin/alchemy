---
title: Managing AWS WAFRegional WebACLs with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional WebACLs using Alchemy Cloud Control.
---

# WebACL

The WebACL resource lets you create and manage [AWS WAFRegional WebACLs](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-webacl.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const webacl = await AWS.WAFRegional.WebACL("webacl-example", {
  MetricName: "webacl-metric",
  DefaultAction: "example-defaultaction",
  Name: "webacl-",
});
```

