---
title: Managing AWS WAFRegional GeoMatchSets with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional GeoMatchSets using Alchemy Cloud Control.
---

# GeoMatchSet

The GeoMatchSet resource lets you create and manage [AWS WAFRegional GeoMatchSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-geomatchset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const geomatchset = await AWS.WAFRegional.GeoMatchSet("geomatchset-example", {
  Name: "geomatchset-",
});
```

