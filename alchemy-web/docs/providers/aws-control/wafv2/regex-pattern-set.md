---
title: Managing AWS WAFv2 RegexPatternSets with Alchemy
description: Learn how to create, update, and manage AWS WAFv2 RegexPatternSets using Alchemy Cloud Control.
---

# RegexPatternSet

The RegexPatternSet resource lets you manage [AWS WAFv2 RegexPatternSets](https://docs.aws.amazon.com/wafv2/latest/userguide/) for defining regular expressions to match against web requests.

## Minimal Example

Create a basic RegexPatternSet with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const BasicRegexPatternSet = await AWS.WAFv2.RegexPatternSet("basicRegexPatternSet", {
  Name: "BasicRegexPatternSet",
  Scope: "REGIONAL",
  RegularExpressionList: [
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" // Pattern for matching email addresses
  ],
  Description: "A basic regex pattern set for validating email formats"
});
```

## Advanced Configuration

Configure a RegexPatternSet with multiple regular expressions and tags for better resource management.

```ts
const AdvancedRegexPatternSet = await AWS.WAFv2.RegexPatternSet("advancedRegexPatternSet", {
  Name: "AdvancedRegexPatternSet",
  Scope: "REGIONAL",
  RegularExpressionList: [
    "^.*(script|src|href).*$", // Pattern to match any request containing 'script', 'src', or 'href'
    ".*<[^>]+>.*" // Pattern to match any HTML tags
  ],
  Description: "An advanced regex pattern set for filtering malicious requests",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Use Case: Blocking SQL Injection Attempts

This example demonstrates how to create a RegexPatternSet specifically designed to identify and block SQL injection attempts.

```ts
const SqlInjectionRegexPatternSet = await AWS.WAFv2.RegexPatternSet("sqlInjectionPatternSet", {
  Name: "SQLInjectionPatternSet",
  Scope: "REGIONAL",
  RegularExpressionList: [
    ".*(SELECT|INSERT|DELETE|UPDATE|DROP|UNION).*", // Pattern to identify common SQL commands
    ".*(['\";]+).*" // Pattern to match quotes and semicolons, often used in injections
  ],
  Description: "A regex pattern set to detect SQL injection attempts"
});
```