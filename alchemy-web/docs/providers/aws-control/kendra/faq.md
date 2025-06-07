---
title: Managing AWS Kendra Faqs with Alchemy
description: Learn how to create, update, and manage AWS Kendra Faqs using Alchemy Cloud Control.
---

# Faq

The Faq resource lets you manage [AWS Kendra Faqs](https://docs.aws.amazon.com/kendra/latest/userguide/) for your search applications, allowing you to provide users with relevant answers to their questions directly from your content.

## Minimal Example

Create a basic FAQ entry with required properties and a few optional ones:

```ts
import AWS from "alchemy/aws/control";

const BasicFaq = await AWS.Kendra.Faq("BasicFaq", {
  IndexId: "your-kendra-index-id",
  S3Path: {
    Bucket: "your-s3-bucket",
    Key: "faqs/faq-data.csv"
  },
  RoleArn: "arn:aws:iam::123456789012:role/your-kendra-role",
  Name: "Basic FAQ Entry",
  LanguageCode: "en",
  Description: "A basic FAQ entry for demonstration."
});
```

## Advanced Configuration

Configure an FAQ entry with additional tags and file format options:

```ts
const AdvancedFaq = await AWS.Kendra.Faq("AdvancedFaq", {
  IndexId: "your-kendra-index-id",
  S3Path: {
    Bucket: "your-s3-bucket",
    Key: "faqs/advanced-faq-data.csv"
  },
  RoleArn: "arn:aws:iam::123456789012:role/your-kendra-role",
  Name: "Advanced FAQ Entry",
  FileFormat: "CSV",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "Support" }
  ]
});
```

## FAQ Entry Adoption

Create an FAQ entry that adopts an existing resource instead of failing if it already exists:

```ts
const AdoptedFaq = await AWS.Kendra.Faq("AdoptedFaq", {
  IndexId: "your-kendra-index-id",
  S3Path: {
    Bucket: "your-s3-bucket",
    Key: "faqs/adopted-faq-data.csv"
  },
  RoleArn: "arn:aws:iam::123456789012:role/your-kendra-role",
  Name: "Adopted FAQ Entry",
  adopt: true
});
```

## Updating an Existing FAQ

Update an existing FAQ entry with a new description and tags:

```ts
const UpdatedFaq = await AWS.Kendra.Faq("UpdatedFaq", {
  IndexId: "your-kendra-index-id",
  S3Path: {
    Bucket: "your-s3-bucket",
    Key: "faqs/updated-faq-data.csv"
  },
  RoleArn: "arn:aws:iam::123456789012:role/your-kendra-role",
  Name: "Updated FAQ Entry",
  LanguageCode: "en",
  Description: "An updated description for the FAQ entry.",
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "Development" }
  ]
});
```