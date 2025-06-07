---
title: Managing AWS WAF WebACLs with Alchemy
description: Learn how to create, update, and manage AWS WAF WebACLs using Alchemy Cloud Control.
---

# WebACL

The WebACL resource lets you create and manage [AWS WAF WebACLs](https://docs.aws.amazon.com/waf/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-waf-webacl.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const webacl = await AWS.WAF.WebACL("webacl-example", {
  DefaultAction: "example-defaultaction",
  MetricName: "webacl-metric",
  Name: "webacl-",
});
```

