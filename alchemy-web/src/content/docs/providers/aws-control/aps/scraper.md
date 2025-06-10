---
title: Scraper
description: Learn how to create, update, and manage AWS APS Scrapers using Alchemy Cloud Control.
---


The Scraper resource allows you to manage AWS APS Scrapers, enabling you to extract data from various sources and route it to specified destinations. For more detailed information, refer to the [AWS APS Scrapers documentation](https://docs.aws.amazon.com/aps/latest/userguide/).

## Minimal Example

Create a basic Scraper with the required properties and one optional property:

```ts
import AWS from "alchemy/aws/control";

const basicScraper = await AWS.APS.Scraper("basicScraper", {
  ScrapeConfiguration: {
    // Define your scrape configuration here
    scrapeInterval: 60, // Scrape every 60 seconds
    maxRetries: 3 // Maximum number of retry attempts
  },
  Destination: {
    // Specify the destination for scraped data
    type: "S3",
    bucket: "my-data-bucket",
    prefix: "scraped-data/"
  },
  Source: {
    // Define the source from which to scrape data
    type: "http",
    url: "https://api.example.com/data"
  },
  Alias: "basicScraperAlias"
});
```

## Advanced Configuration

Configure a Scraper with detailed role configuration and tags for better management:

```ts
const advancedScraper = await AWS.APS.Scraper("advancedScraper", {
  ScrapeConfiguration: {
    scrapeInterval: 120, // Scrape every 120 seconds
    maxRetries: 5,
    timeout: 30 // Timeout after 30 seconds
  },
  Destination: {
    type: "Kinesis",
    stream: "my-kinesis-stream"
  },
  Source: {
    type: "http",
    url: "https://api.example.com/advanced-data",
    headers: {
      "Authorization": "Bearer my-secret-token"
    }
  },
  RoleConfiguration: {
    roleArn: "arn:aws:iam::123456789012:role/myScraperRole",
    policy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "s3:PutObject",
          Resource: "arn:aws:s3:::my-data-bucket/*"
        }
      ]
    })
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "DataScraping"
    }
  ]
});
```

## Using an Existing Resource

If you want to adopt an existing Scraper resource instead of failing when it already exists, you can set the `adopt` property:

```ts
const adoptedScraper = await AWS.APS.Scraper("adoptedScraper", {
  ScrapeConfiguration: {
    scrapeInterval: 60,
    maxRetries: 3
  },
  Destination: {
    type: "S3",
    bucket: "my-data-bucket",
    prefix: "scraped-data/"
  },
  Source: {
    type: "http",
    url: "https://api.example.com/data"
  },
  adopt: true // Adopt existing resource
});
```
