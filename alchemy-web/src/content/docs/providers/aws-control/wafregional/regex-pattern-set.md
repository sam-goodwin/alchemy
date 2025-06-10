---
title: RegexPatternSet
description: Learn how to create, update, and manage AWS WAFRegional RegexPatternSets using Alchemy Cloud Control.
---


The RegexPatternSet resource lets you manage [AWS WAFRegional RegexPatternSets](https://docs.aws.amazon.com/wafregional/latest/userguide/) which are used to specify a set of regular expression patterns to inspect web requests.

## Minimal Example

Create a basic RegexPatternSet with required properties and an optional adopt flag.

```ts
import AWS from "alchemy/aws/control";

const regexPatternSet = await AWS.WAFRegional.RegexPatternSet("basicRegexPatternSet", {
  Name: "MyRegexPatternSet",
  RegexPatternStrings: [
    "^.*(badword).*",
    ".*(malicious).*"
  ],
  adopt: true // Optional: Adopt existing resource if it already exists
});
```

## Enhanced Configuration

Configure a RegexPatternSet with additional patterns for more complex use cases.

```ts
const enhancedRegexPatternSet = await AWS.WAFRegional.RegexPatternSet("enhancedRegexPatternSet", {
  Name: "MyEnhancedRegexPatternSet",
  RegexPatternStrings: [
    "^.*(spam|scam).*",
    ".*(phishing).*",
    ".*(hack).*"
  ]
});
```

## Use Case: Filtering Malicious Requests

Create a RegexPatternSet specifically for filtering out malicious requests based on a variety of patterns.

```ts
const maliciousRequestPatternSet = await AWS.WAFRegional.RegexPatternSet("maliciousRequestPatternSet", {
  Name: "BlockMaliciousPatterns",
  RegexPatternStrings: [
    "^.*(sqlmap|cmd|shell|eval).*",
    ".*(select.*from|union.*select).*",
    ".*(script|<|>).*"
  ]
});
```

## Use Case: User Input Validation

Define a RegexPatternSet for validating user input against common patterns to prevent XSS and injection attacks.

```ts
const inputValidationPatternSet = await AWS.WAFRegional.RegexPatternSet("inputValidationPatternSet", {
  Name: "ValidateUserInput",
  RegexPatternStrings: [
    ".*(<script>).*",
    ".*(javascript:).*",
    ".*(onerror=).*"
  ]
});
```
