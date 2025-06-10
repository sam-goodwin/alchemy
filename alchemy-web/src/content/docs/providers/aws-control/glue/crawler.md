---
title: Crawler
description: Learn how to create, update, and manage AWS Glue Crawlers using Alchemy Cloud Control.
---


The Crawler resource allows you to create and manage AWS Glue Crawlers, which can automatically discover and catalog data stored in various data sources. For more detailed information, refer to the [AWS Glue Crawlers documentation](https://docs.aws.amazon.com/glue/latest/userguide/).

## Minimal Example

This example demonstrates how to create a basic Glue Crawler with required properties and a couple of common optional properties.

```ts
import AWS from "alchemy/aws/control";

const basicCrawler = await AWS.Glue.Crawler("basicCrawler", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  targets: {
    s3Targets: [{
      path: "s3://my-data-bucket/"
    }]
  },
  databaseName: "my_database",
  name: "basic-crawler"
});
```

## Advanced Configuration

In this example, we configure a Glue Crawler with additional settings such as a schema change policy and a schedule for regular crawling.

```ts
import AWS from "alchemy/aws/control";

const advancedCrawler = await AWS.Glue.Crawler("advancedCrawler", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  targets: {
    s3Targets: [{
      path: "s3://my-data-bucket/"
    }]
  },
  databaseName: "my_database",
  name: "advanced-crawler",
  schemaChangePolicy: {
    updateBehavior: "UPDATE_IN_DATABASE",
    deleteBehavior: "LOG"
  },
  schedule: {
    scheduleExpression: "cron(0 12 * * ? *)" // Daily at 12 PM UTC
  }
});
```

## Using Classifiers

This example demonstrates how to include custom classifiers for the Crawler, which can help in identifying the schema of data files.

```ts
import AWS from "alchemy/aws/control";

const classifierCrawler = await AWS.Glue.Crawler("classifierCrawler", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  targets: {
    s3Targets: [{
      path: "s3://my-data-bucket/"
    }]
  },
  classifiers: ["my-json-classifier", "my-csv-classifier"],
  databaseName: "my_database",
  name: "classifier-crawler"
});
```

## Recrawl Policy

This example illustrates the use of a recrawl policy to determine how the Crawler should handle data changes in the target location.

```ts
import AWS from "alchemy/aws/control";

const recrawlPolicyCrawler = await AWS.Glue.Crawler("recrawlPolicyCrawler", {
  role: "arn:aws:iam::123456789012:role/service-role/AWSGlueServiceRole",
  targets: {
    s3Targets: [{
      path: "s3://my-data-bucket/"
    }]
  },
  recrawlPolicy: {
    recrawlBehavior: "CRAWL_NEW_DATA_ONLY"
  },
  databaseName: "my_database",
  name: "recrawl-policy-crawler"
});
```
