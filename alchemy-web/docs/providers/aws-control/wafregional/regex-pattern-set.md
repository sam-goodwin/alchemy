---
title: Managing AWS WAFRegional RegexPatternSets with Alchemy
description: Learn how to create, update, and manage AWS WAFRegional RegexPatternSets using Alchemy Cloud Control.
---

# RegexPatternSet

The RegexPatternSet resource lets you create and manage [AWS WAFRegional RegexPatternSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafregional-regexpatternset.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const regexpatternset = await AWS.WAFRegional.RegexPatternSet("regexpatternset-example", {
  RegexPatternStrings: ["example-regexpatternstrings-1"],
  Name: "regexpatternset-",
});
```

