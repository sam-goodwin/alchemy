---
title: RegexPatternSet
description: Learn how to create, update, and manage AWS WAFv2 RegexPatternSets using Alchemy Cloud Control.
---


The RegexPatternSet resource allows you to manage [AWS WAFv2 RegexPatternSets](https://docs.aws.amazon.com/wafv2/latest/userguide/) that contain regular expressions for filtering web requests.

## Minimal Example

Create a basic RegexPatternSet with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const regexPatternSet = await AWS.WAFv2.RegexPatternSet("myRegexPatternSet", {
  Scope: "REGIONAL",
  RegularExpressionList: [
    "^(example\\.)?mywebsite\\.com$"
  ],
  Description: "A set of regex patterns for my website"
});
```

## Advanced Configuration

Configure a RegexPatternSet with tags and an optional name.

```ts
const advancedRegexPatternSet = await AWS.WAFv2.RegexPatternSet("advancedRegexPatternSet", {
  Scope: "CLOUDFRONT",
  RegularExpressionList: [
    "^.*\\.example\\.com$",
    "^.*mywebsite\\.com$"
  ],
  Name: "MyAdvancedRegexPatternSet",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Project", Value: "WebSecurity" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing RegexPatternSet instead of failing if it already exists.

```ts
const adoptedRegexPatternSet = await AWS.WAFv2.RegexPatternSet("adoptedRegexPatternSet", {
  Scope: "REGIONAL",
  RegularExpressionList: [
    "^secure\\.mywebsite\\.com$"
  ],
  adopt: true // Adopts the existing resource if it already exists
});
```
