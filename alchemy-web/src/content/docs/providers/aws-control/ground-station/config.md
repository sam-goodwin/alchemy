---
title: Config
description: Learn how to create, update, and manage AWS GroundStation Configs using Alchemy Cloud Control.
---


The Config resource allows you to manage [AWS GroundStation Configs](https://docs.aws.amazon.com/groundstation/latest/userguide/) for satellite communications and data processing.

## Minimal Example

Create a basic GroundStation Config with required properties and a tag.

```ts
import AWS from "alchemy/aws/control";

const groundStationConfig = await AWS.GroundStation.Config("basicConfig", {
  name: "BasicGroundStationConfig",
  configData: {
    type: "DATAFLOW",
    dataflow: {
      dataflowSource: {
        type: "S3",
        uri: "s3://my-bucket/groundstation-data"
      },
      dataflowDestination: {
        type: "S3",
        uri: "s3://my-bucket/processed-data"
      }
    }
  },
  tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Advanced Configuration

Configure a GroundStation Config with advanced properties including multiple tags and additional settings.

```ts
const advancedGroundStationConfig = await AWS.GroundStation.Config("advancedConfig", {
  name: "AdvancedGroundStationConfig",
  configData: {
    type: "DATAFLOW",
    dataflow: {
      dataflowSource: {
        type: "S3",
        uri: "s3://my-bucket/groundstation-data"
      },
      dataflowDestination: {
        type: "S3",
        uri: "s3://my-bucket/processed-data"
      },
      additionalSettings: {
        encryption: {
          enabled: true,
          key: "arn:aws:kms:us-west-2:123456789012:key/my-key"
        }
      }
    }
  },
  tags: [{
    Key: "Environment",
    Value: "Production"
  }, {
    Key: "Owner",
    Value: "Team Alpha"
  }]
});
```

## Adoption of Existing Resources

Create a GroundStation Config that adopts an existing resource instead of failing when it already exists.

```ts
const adoptedGroundStationConfig = await AWS.GroundStation.Config("adoptedConfig", {
  name: "AdoptedGroundStationConfig",
  configData: {
    type: "DATAFLOW",
    dataflow: {
      dataflowSource: {
        type: "S3",
        uri: "s3://my-bucket/groundstation-data"
      },
      dataflowDestination: {
        type: "S3",
        uri: "s3://my-bucket/processed-data"
      }
    }
  },
  adopt: true
});
```
