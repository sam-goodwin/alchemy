---
title: Dataset
description: Learn how to create, update, and manage AWS IoTSiteWise Datasets using Alchemy Cloud Control.
---


The Dataset resource allows you to manage [AWS IoTSiteWise Datasets](https://docs.aws.amazon.com/iotsitewise/latest/userguide/) which are used to store and analyze timestamped data from your industrial assets.

## Minimal Example

Create a basic IoTSiteWise Dataset with required properties and a description:

```ts
import AWS from "alchemy/aws/control";

const basicDataset = await AWS.IoTSiteWise.Dataset("basicDataset", {
  DatasetName: "ProductionData",
  DatasetSource: {
    type: "DATA_QUERY",
    dataQuery: {
      queryString: "SELECT * FROM AssetData",
      aggregation: "AVG"
    }
  },
  DatasetDescription: "Dataset for production data analysis"
});
```

## Advanced Configuration

Configure an IoTSiteWise Dataset with tags for better organization and identification:

```ts
const advancedDataset = await AWS.IoTSiteWise.Dataset("advancedDataset", {
  DatasetName: "QualityMetrics",
  DatasetSource: {
    type: "DATA_QUERY",
    dataQuery: {
      queryString: "SELECT * FROM QualityData WHERE condition = 'pass'",
      aggregation: "SUM"
    }
  },
  DatasetDescription: "Dataset for quality metrics analysis",
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "Quality Assurance" }
  ]
});
```

## Using Existing Resources

Adopt an existing Dataset without failing if it already exists:

```ts
const adoptDataset = await AWS.IoTSiteWise.Dataset("adoptDataset", {
  DatasetName: "LegacyData",
  DatasetSource: {
    type: "DATA_QUERY",
    dataQuery: {
      queryString: "SELECT * FROM LegacyData WHERE status = 'active'",
      aggregation: "MAX"
    }
  },
  DatasetDescription: "Adoption of existing legacy dataset",
  adopt: true
});
```

## Scheduled Updates

Create a Dataset that updates its values on a scheduled basis:

```ts
const scheduledUpdateDataset = await AWS.IoTSiteWise.Dataset("scheduledDataset", {
  DatasetName: "ScheduledUpdatesData",
  DatasetSource: {
    type: "DATA_QUERY",
    dataQuery: {
      queryString: "SELECT * FROM ScheduledData",
      aggregation: "AVG"
    }
  },
  DatasetDescription: "Dataset for data that updates at scheduled intervals",
  Tags: [
    { Key: "UpdateFrequency", Value: "Hourly" }
  ]
});
```
