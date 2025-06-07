---
title: Managing AWS WAFRegional IPSets with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional IPSets using Alchemy Cloud Control.
---

# IPSet

The IPSet resource lets you create and manage [AWS WAFRegional IPSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-ipset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const ipset = await AWS.WAFRegional.IPSet("ipset-example", { Name: "ipset-" });
```

