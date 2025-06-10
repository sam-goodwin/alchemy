---
title: CustomDataIdentifier
description: Learn how to create, update, and manage AWS Macie CustomDataIdentifiers using Alchemy Cloud Control.
---


The CustomDataIdentifier resource allows you to create and manage [AWS Macie Custom Data Identifiers](https://docs.aws.amazon.com/macie/latest/userguide/) that help in detecting sensitive data in your organization’s data stores.

## Minimal Example

Create a basic custom data identifier with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicCustomDataIdentifier = await AWS.Macie.CustomDataIdentifier("basicIdentifier", {
  name: "SSN Identifier",
  description: "Identifies Social Security Numbers",
  regex: "\\b\\d{3}-\\d{2}-\\d{4}\\b",
  keywords: ["SSN", "Social Security Number"]
});
```

## Advanced Configuration

Configure a custom data identifier with additional properties such as ignore words and maximum match distance.

```ts
const advancedCustomDataIdentifier = await AWS.Macie.CustomDataIdentifier("advancedIdentifier", {
  name: "Credit Card Identifier",
  description: "Identifies Credit Card Numbers",
  regex: "\\b(?:\\d[ -]*?){13,16}\\b",
  keywords: ["Credit Card", "CC"],
  ignoreWords: ["test", "dummy"],
  maximumMatchDistance: 5,
  tags: [
    { Key: "Project", Value: "Finance" },
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Use Case: Sensitive Data Detection

Create a custom data identifier specifically for detecting sensitive health information.

```ts
const healthInfoIdentifier = await AWS.Macie.CustomDataIdentifier("healthInfoIdentifier", {
  name: "Health Information Identifier",
  description: "Identifies sensitive health information",
  regex: "\\b(?:[A-Z][a-z]+(?:\\s|\\-)?)+\\b", // Example regex for health terms
  keywords: ["Health", "Insurance", "HIPAA"],
  ignoreWords: ["generic", "sample"],
  maximumMatchDistance: 2,
});
```
