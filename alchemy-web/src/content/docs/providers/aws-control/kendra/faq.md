---
title: Faq
description: Learn how to create, update, and manage AWS Kendra Faqs using Alchemy Cloud Control.
---


The Faq resource lets you manage [AWS Kendra Faqs](https://docs.aws.amazon.com/kendra/latest/userguide/) to improve search capabilities by providing frequently asked questions and their answers.

## Minimal Example

Create a basic FAQ entry in AWS Kendra with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const faqEntry = await AWS.Kendra.Faq("faqEntry", {
  indexId: "my-kendra-index",
  s3Path: {
    bucket: "my-kendra-faq-bucket",
    key: "faqs.csv"
  },
  roleArn: "arn:aws:iam::123456789012:role/KendraFAQRole",
  languageCode: "en"
});
```

## Advanced Configuration

Configure a more detailed FAQ entry with additional optional properties such as description and tags.

```ts
const advancedFaqEntry = await AWS.Kendra.Faq("advancedFaqEntry", {
  indexId: "my-kendra-index",
  s3Path: {
    bucket: "my-kendra-faq-bucket",
    key: "advanced_faqs.csv"
  },
  roleArn: "arn:aws:iam::123456789012:role/KendraFAQRole",
  description: "This FAQ entry provides advanced troubleshooting information.",
  tags: [
    { key: "category", value: "troubleshooting" },
    { key: "status", value: "active" }
  ]
});
```

## Adopting Existing Resources

Create a FAQ entry while adopting an existing resource instead of failing if it already exists.

```ts
const adoptedFaqEntry = await AWS.Kendra.Faq("adoptedFaqEntry", {
  indexId: "my-kendra-index",
  s3Path: {
    bucket: "my-kendra-faq-bucket",
    key: "existing_faqs.csv"
  },
  roleArn: "arn:aws:iam::123456789012:role/KendraFAQRole",
  adopt: true // Adopt existing resource if it already exists
});
```
