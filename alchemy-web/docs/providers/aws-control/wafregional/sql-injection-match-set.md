---
title: Managing AWS WAFRegional SqlInjectionMatchSets with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional SqlInjectionMatchSets using Alchemy Cloud Control.
---

# SqlInjectionMatchSet

The SqlInjectionMatchSet resource lets you create and manage [AWS WAFRegional SqlInjectionMatchSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-sqlinjectionmatchset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const sqlinjectionmatchset = await AWS.WAFRegional.SqlInjectionMatchSet(
  "sqlinjectionmatchset-example",
  { Name: "sqlinjectionmatchset-" }
);
```

