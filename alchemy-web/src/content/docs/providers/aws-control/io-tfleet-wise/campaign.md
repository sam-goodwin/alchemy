---
title: Campaign
description: Learn how to create, update, and manage AWS IoTFleetWise Campaigns using Alchemy Cloud Control.
---


The Campaign resource allows you to manage [AWS IoTFleetWise Campaigns](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) that enable efficient data collection from vehicles. Campaigns define the collection schemes, signals, and other configurations to gather valuable telematics data.

## Minimal Example

Create a basic IoTFleetWise Campaign with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const basicCampaign = await AWS.IoTFleetWise.Campaign("basicCampaign", {
  name: "Basic Campaign",
  signalCatalogArn: "arn:aws:iotfleetwise:us-east-1:123456789012:signal-catalogs/SignalCatalog1",
  collectionScheme: {
    frequency: 15,
    duration: 3600
  },
  action: "START"
});
```

## Advanced Configuration

Configure a campaign with advanced options such as data partitions and multiple signals to collect.

```ts
const advancedCampaign = await AWS.IoTFleetWise.Campaign("advancedCampaign", {
  name: "Advanced Campaign",
  signalCatalogArn: "arn:aws:iotfleetwise:us-east-1:123456789012:signal-catalogs/SignalCatalog2",
  collectionScheme: {
    frequency: 10,
    duration: 7200
  },
  dataPartitions: [
    { key: "VehicleType", value: "SUV" },
    { key: "Region", value: "North America" }
  ],
  signalsToCollect: [
    { name: "EngineSpeed", aggregation: "AVG" },
    { name: "FuelLevel", aggregation: "SUM" }
  ],
  spoolingMode: "ON"
});
```

## Data Destination Configuration

Create a campaign with specific data destination configurations to store collected data.

```ts
const dataDestinationCampaign = await AWS.IoTFleetWise.Campaign("dataDestinationCampaign", {
  name: "Data Destination Campaign",
  signalCatalogArn: "arn:aws:iotfleetwise:us-east-1:123456789012:signal-catalogs/SignalCatalog3",
  collectionScheme: {
    frequency: 5,
    duration: 1800
  },
  dataDestinationConfigs: [
    {
      type: "S3",
      bucketArn: "arn:aws:s3:::my-iot-data-bucket",
      prefix: "iot-data/"
    }
  ],
  signalsToFetch: [
    { name: "VehicleSpeed" },
    { name: "Odometer" }
  ]
});
```

## Tagging Campaigns

Create a campaign with tags for better resource management and organization.

```ts
const taggedCampaign = await AWS.IoTFleetWise.Campaign("taggedCampaign", {
  name: "Tagged Campaign",
  signalCatalogArn: "arn:aws:iotfleetwise:us-east-1:123456789012:signal-catalogs/SignalCatalog4",
  collectionScheme: {
    frequency: 20,
    duration: 3600
  },
  tags: [
    { key: "Environment", value: "Production" },
    { key: "Project", value: "IoT Data Collection" }
  ]
});
```
