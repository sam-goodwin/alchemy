---
title: Datastore
description: Learn how to create, update, and manage AWS IoTAnalytics Datastores using Alchemy Cloud Control.
---


The Datastore resource lets you manage [AWS IoTAnalytics Datastores](https://docs.aws.amazon.com/iotanalytics/latest/userguide/) for storing and querying data from IoT devices.

## Minimal Example

Create a basic IoTAnalytics Datastore with required properties and a retention period.

```ts
import AWS from "alchemy/aws/control";

const basicDatastore = await AWS.IoTAnalytics.Datastore("basicDatastore", {
  DatastoreName: "BasicDatastore",
  DatastoreStorage: {
    S3: {
      Bucket: "my-iot-analytics-bucket",
      KeyPrefix: "datastore/"
    }
  },
  RetentionPeriod: {
    NumberOfDays: 30,
    Unlimited: false
  }
});
```

## Advanced Configuration

Configure an IoTAnalytics Datastore with file format settings and partitioning.

```ts
const advancedDatastore = await AWS.IoTAnalytics.Datastore("advancedDatastore", {
  DatastoreName: "AdvancedDatastore",
  DatastoreStorage: {
    S3: {
      Bucket: "my-iot-analytics-advanced-bucket",
      KeyPrefix: "advanced-datastore/"
    }
  },
  FileFormatConfiguration: {
    Json: {
      Enable: true
    }
  },
  DatastorePartitions: {
    Partitions: [
      {
        Partition: {
          Attribute: "deviceId",
          Type: "STRING"
        }
      }
    ]
  },
  RetentionPeriod: {
    NumberOfDays: 60,
    Unlimited: false
  }
});
```

## Using Tags

Create a Datastore with tags for better resource management.

```ts
const taggedDatastore = await AWS.IoTAnalytics.Datastore("taggedDatastore", {
  DatastoreName: "TaggedDatastore",
  DatastoreStorage: {
    S3: {
      Bucket: "my-iot-analytics-tagged-bucket",
      KeyPrefix: "tagged-datastore/"
    }
  },
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "IoTAnalytics"
    }
  ]
});
```

## Adopting Existing Resources

Create a Datastore while adopting an existing resource if it already exists.

```ts
const adoptExistingDatastore = await AWS.IoTAnalytics.Datastore("adoptExistingDatastore", {
  DatastoreName: "ExistingDatastore",
  DatastoreStorage: {
    S3: {
      Bucket: "my-existing-bucket",
      KeyPrefix: "existing-datastore/"
    }
  },
  adopt: true
});
```
