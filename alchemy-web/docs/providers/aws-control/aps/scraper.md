---
title: Managing AWS APS Scrapers with Alchemy
description: Learn how to create, update, and manage AWS APS Scrapers using Alchemy Cloud Control.
---

# Scraper

The Scraper resource lets you create and manage [AWS APS Scrapers](https://docs.aws.amazon.com/aps/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-aps-scraper.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const scraper = await AWS.APS.Scraper("scraper-example", {
  ScrapeConfiguration: "example-scrapeconfiguration",
  Destination: "example-destination",
  Source: "example-source",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
});
```

## Advanced Configuration

Create a scraper with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedScraper = await AWS.APS.Scraper("advanced-scraper", {
  ScrapeConfiguration: "example-scrapeconfiguration",
  Destination: "example-destination",
  Source: "example-source",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
});
```

