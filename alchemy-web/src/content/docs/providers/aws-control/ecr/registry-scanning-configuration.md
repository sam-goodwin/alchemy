---
title: RegistryScanningConfiguration
description: Learn how to create, update, and manage AWS ECR RegistryScanningConfigurations using Alchemy Cloud Control.
---


The RegistryScanningConfiguration resource allows you to manage the scanning configurations for Amazon ECR (Elastic Container Registry) repositories, enabling you to automate security scanning of your container images. For more details, visit the [AWS ECR RegistryScanningConfigurations documentation](https://docs.aws.amazon.com/ecr/latest/userguide/).

## Minimal Example

Create a basic registry scanning configuration with the required properties:

```ts
import AWS from "alchemy/aws/control";

const scanningConfiguration = await AWS.ECR.RegistryScanningConfiguration("basicScanningConfig", {
  ScanType: "BASIC",
  Rules: [
    {
      RepositoryFilter: {
        Filter: "my-repo/*",
        FilterType: "PREFIX"
      },
      ScanFrequency: "ON_DEMAND"
    }
  ],
  adopt: true // Optional: adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a more advanced registry scanning setup with custom rules and scan types:

```ts
const advancedScanningConfiguration = await AWS.ECR.RegistryScanningConfiguration("advancedScanningConfig", {
  ScanType: "ENHANCED",
  Rules: [
    {
      RepositoryFilter: {
        Filter: "my-advanced-repo/*",
        FilterType: "PREFIX"
      },
      ScanFrequency: "DAILY"
    },
    {
      RepositoryFilter: {
        Filter: "my-other-repo/*",
        FilterType: "PREFIX"
      },
      ScanFrequency: "WEEKLY"
    }
  ],
  adopt: false // Optional: do not adopt existing resource
});
```

## Use Case: On-Demand Scanning Configuration

Set up a scanning configuration that triggers scans on-demand for specific repositories:

```ts
const onDemandScanningConfiguration = await AWS.ECR.RegistryScanningConfiguration("onDemandScanningConfig", {
  ScanType: "BASIC",
  Rules: [
    {
      RepositoryFilter: {
        Filter: "my-on-demand-repo",
        FilterType: "EQUALS"
      },
      ScanFrequency: "ON_DEMAND"
    }
  ]
});
```

## Use Case: Daily Scans for Multiple Repositories

Create a configuration that applies daily scans to multiple repositories based on specific filters:

```ts
const dailyScanConfiguration = await AWS.ECR.RegistryScanningConfiguration("dailyScanConfig", {
  ScanType: "ENHANCED",
  Rules: [
    {
      RepositoryFilter: {
        Filter: "my-first-repo/*",
        FilterType: "PREFIX"
      },
      ScanFrequency: "DAILY"
    },
    {
      RepositoryFilter: {
        Filter: "my-second-repo/*",
        FilterType: "PREFIX"
      },
      ScanFrequency: "DAILY"
    }
  ]
});
```
