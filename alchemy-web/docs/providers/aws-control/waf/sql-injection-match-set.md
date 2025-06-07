---
title: Managing AWS WAF SqlInjectionMatchSets with Alchemy
description: Learn how to create, update, and manage AWS WAF SqlInjectionMatchSets using Alchemy Cloud Control.
---

# SqlInjectionMatchSet

The SqlInjectionMatchSet resource lets you create and manage [AWS WAF SqlInjectionMatchSets](https://docs.aws.amazon.com/waf/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-waf-sqlinjectionmatchset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const sqlinjectionmatchset = await AWS.WAF.SqlInjectionMatchSet("sqlinjectionmatchset-example", {
  Name: "sqlinjectionmatchset-",
});
```

