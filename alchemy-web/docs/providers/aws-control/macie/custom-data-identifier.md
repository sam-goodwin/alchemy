---
title: Managing AWS Macie CustomDataIdentifiers with Alchemy
description: Learn how to create, update, and manage AWS Macie CustomDataIdentifiers using Alchemy Cloud Control.
---

# CustomDataIdentifier

The CustomDataIdentifier resource allows you to define custom data identifiers in AWS Macie to help identify sensitive data based on keywords and regular expressions. For more information, refer to the [AWS Macie CustomDataIdentifiers documentation](https://docs.aws.amazon.com/macie/latest/userguide/).

## Minimal Example

Create a basic CustomDataIdentifier with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const CustomDataIdentifier = await AWS.Macie.CustomDataIdentifier("SensitiveDataIdentifier", {
  Name: "CreditCardIdentifier", 
  Regex: "([0-9]{4}[- ]){3}[0-9]{4}",
  Keywords: ["Credit Card", "Visa", "MasterCard"],
  Description: "Identifies credit card numbers"
});
```

## Advanced Configuration

Configure a CustomDataIdentifier with additional optional properties such as IgnoreWords and Tags.

```ts
const AdvancedCustomDataIdentifier = await AWS.Macie.CustomDataIdentifier("AdvancedIdentifier", {
  Name: "SSNIdentifier", 
  Regex: "(\\d{3}-?\\d{2}-?\\d{4})", 
  Keywords: ["Social Security Number", "SSN"],
  IgnoreWords: ["not_required"],
  MaximumMatchDistance: 50,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Compliance" }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing CustomDataIdentifier instead of failing when it already exists, you can set the adopt property to true.

```ts
const AdoptExistingCustomDataIdentifier = await AWS.Macie.CustomDataIdentifier("AdoptedIdentifier", {
  Name: "AdoptedIdentifier",
  Regex: "([0-9]{4}[- ]){3}[0-9]{4}",
  adopt: true
});
```