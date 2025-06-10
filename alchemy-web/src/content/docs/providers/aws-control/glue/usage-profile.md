---
title: UsageProfile
description: Learn how to create, update, and manage AWS Glue UsageProfiles using Alchemy Cloud Control.
---


The UsageProfile resource allows you to manage [AWS Glue UsageProfiles](https://docs.aws.amazon.com/glue/latest/userguide/) that define the usage metrics and configurations for your Glue jobs and crawlers.

## Minimal Example

Create a basic UsageProfile with a name and description:

```ts
import AWS from "alchemy/aws/control";

const usageProfile = await AWS.Glue.UsageProfile("basicUsageProfile", {
  name: "DataProcessingProfile",
  description: "Profile for managing data processing jobs."
});
```

## Advanced Configuration

Configure a UsageProfile with detailed settings and tags:

```ts
import AWS from "alchemy/aws/control";

const advancedUsageProfile = await AWS.Glue.UsageProfile("advancedUsageProfile", {
  name: "ETLProcessingProfile",
  description: "Profile for advanced ETL processing.",
  configuration: {
    maxConcurrentRuns: 5,
    timeout: 60 // in minutes
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Department", value: "DataEngineering" }
  ]
});
```

## Adoption of Existing Resource

Adopt an existing UsageProfile if it already exists instead of failing:

```ts
import AWS from "alchemy/aws/control";

const adoptedUsageProfile = await AWS.Glue.UsageProfile("adoptedUsageProfile", {
  name: "ExistingDataProfile",
  description: "Adopt existing UsageProfile for data operations.",
  adopt: true
});
```

## UsageProfile with Configuration

Create a UsageProfile that specifies custom configuration settings:

```ts
import AWS from "alchemy/aws/control";

const configuredUsageProfile = await AWS.Glue.UsageProfile("configuredUsageProfile", {
  name: "CustomConfigProfile",
  description: "Profile with custom configuration for Glue jobs.",
  configuration: {
    maxRetries: 3,
    workerType: "G.2X",
    numberOfWorkers: 10
  },
  tags: [
    { key: "Project", value: "DataPipeline" }
  ]
});
```
