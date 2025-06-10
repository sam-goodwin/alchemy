---
title: DataSource
description: Learn how to create, update, and manage AWS DataZone DataSources using Alchemy Cloud Control.
---


The DataSource resource lets you manage [AWS DataZone DataSources](https://docs.aws.amazon.com/datazone/latest/userguide/) and their configuration settings.

## Minimal Example

Create a basic DataSource with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicDataSource = await AWS.DataZone.DataSource("myBasicDataSource", {
  projectIdentifier: "myProjectIdentifier",
  name: "My Data Source",
  type: "S3",
  domainIdentifier: "myDomainIdentifier",
  publishOnImport: true,
  description: "This is a basic data source for demonstration purposes."
});
```

## Advanced Configuration

Configure a DataSource with advanced settings such as connection identifier and schedule configuration.

```ts
const advancedDataSource = await AWS.DataZone.DataSource("myAdvancedDataSource", {
  projectIdentifier: "myProjectIdentifier",
  name: "Advanced Data Source",
  type: "API",
  domainIdentifier: "myDomainIdentifier",
  connectionIdentifier: "myConnectionIdentifier",
  schedule: {
    frequency: "DAILY",
    time: "02:00" // UTC time
  },
  configuration: {
    endpoint: "https://api.example.com/data",
    method: "GET",
    headers: {
      "Authorization": "Bearer myAccessToken"
    }
  }
});
```

## Data Source with Asset Forms

Create a DataSource that includes asset forms for additional input parameters.

```ts
const dataSourceWithAssets = await AWS.DataZone.DataSource("myDataSourceWithAssets", {
  projectIdentifier: "myProjectIdentifier",
  name: "Data Source with Assets",
  type: "Database",
  domainIdentifier: "myDomainIdentifier",
  assetFormsInput: [
    {
      form: {
        name: "Database Credentials",
        fields: [
          {
            name: "username",
            type: "String",
            required: true
          },
          {
            name: "password",
            type: "Secret",
            required: true
          }
        ]
      }
    }
  ],
  recommendation: {
    type: "AUTO",
    priority: "HIGH"
  }
});
```

## DataSource with Configuration

Create a DataSource that specifies a configuration for data ingestion.

```ts
const configuredDataSource = await AWS.DataZone.DataSource("myConfiguredDataSource", {
  projectIdentifier: "myProjectIdentifier",
  name: "Configured Data Source",
  type: "Kafka",
  domainIdentifier: "myDomainIdentifier",
  configuration: {
    brokers: ["kafka-broker1:9092", "kafka-broker2:9092"],
    topic: "my-topic",
    groupId: "my-group-id"
  },
  enableSetting: "AUTO_SCALING"
});
```
