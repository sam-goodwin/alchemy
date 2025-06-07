---
title: Managing AWS Glue Crawlers with Alchemy
description: Learn how to create, update, and manage AWS Glue Crawlers using Alchemy Cloud Control.
---

# Crawler

The Crawler resource allows you to create, update, and manage [AWS Glue Crawlers](https://docs.aws.amazon.com/glue/latest/userguide/) which automatically infer the schema of your data stored in various sources.

## Minimal Example

Create a basic AWS Glue Crawler with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const BasicCrawler = await AWS.Glue.Crawler("BasicCrawler", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Targets: {
    S3Targets: [{
      Path: "s3://my-data-bucket/"
    }]
  },
  DatabaseName: "my_database",
  Description: "A simple crawler to infer schema from S3 data."
});
```

## Advanced Configuration

Configure a crawler with advanced settings including classifiers and a schedule.

```ts
const AdvancedCrawler = await AWS.Glue.Crawler("AdvancedCrawler", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Targets: {
    S3Targets: [{
      Path: "s3://my-advanced-data-bucket/"
    }]
  },
  Classifiers: ["my-classifier"],
  Schedule: {
    ScheduleExpression: "cron(0 12 * * ? *)" // Runs every day at 12 PM UTC
  },
  SchemaChangePolicy: {
    UpdateBehavior: "UPDATE_IN_DATABASE",
    DeleteBehavior: "DELETE_FROM_DATABASE"
  },
  CrawlerSecurityConfiguration: "my-security-configuration"
});
```

## Recrawl Policy Example

Set up a crawler with a specific recrawl policy to manage data changes.

```ts
const RecrawlPolicyCrawler = await AWS.Glue.Crawler("RecrawlPolicyCrawler", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Targets: {
    S3Targets: [{
      Path: "s3://my-recrawl-data-bucket/"
    }]
  },
  RecrawlPolicy: {
    RecrawlBehavior: "CRAWL_NEW_FOLDERS_ONLY"
  },
  DatabaseName: "my_database_recrawl",
  Description: "Crawler with specific recrawl policy."
});
```

## Tagging Example

Create a crawler with tags for better resource management.

```ts
const TaggedCrawler = await AWS.Glue.Crawler("TaggedCrawler", {
  Role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  Targets: {
    S3Targets: [{
      Path: "s3://my-tagged-data-bucket/"
    }]
  },
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DataEngineering" }
  ],
  DatabaseName: "my_database_tagged",
  Description: "A crawler with tags for identification."
});
```