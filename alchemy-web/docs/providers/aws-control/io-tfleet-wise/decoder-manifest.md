---
title: Managing AWS IoTFleetWise DecoderManifests with Alchemy
description: Learn how to create, update, and manage AWS IoTFleetWise DecoderManifests using Alchemy Cloud Control.
---

# DecoderManifest

The DecoderManifest resource lets you create and manage [AWS IoTFleetWise DecoderManifests](https://docs.aws.amazon.com/iotfleetwise/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iotfleetwise-decodermanifest.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const decodermanifest = await AWS.IoTFleetWise.DecoderManifest("decodermanifest-example", {
  ModelManifestArn: "example-modelmanifestarn",
  Name: "decodermanifest-",
  Tags: { Environment: "production", ManagedBy: "Alchemy" },
  Description: "A decodermanifest resource managed by Alchemy",
});
```

## Advanced Configuration

Create a decodermanifest with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedDecoderManifest = await AWS.IoTFleetWise.DecoderManifest("advanced-decodermanifest", {
  ModelManifestArn: "example-modelmanifestarn",
  Name: "decodermanifest-",
  Tags: {
    Environment: "production",
    Team: "DevOps",
    Project: "MyApp",
    CostCenter: "Engineering",
    ManagedBy: "Alchemy",
  },
  Description: "A decodermanifest resource managed by Alchemy",
});
```

