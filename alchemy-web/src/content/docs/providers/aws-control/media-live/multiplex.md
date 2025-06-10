---
title: Multiplex
description: Learn how to create, update, and manage AWS MediaLive Multiplexs using Alchemy Cloud Control.
---


The Multiplex resource allows you to manage [AWS MediaLive Multiplexs](https://docs.aws.amazon.com/medialive/latest/userguide/) which serve as containers for managing multiple input streams and output destinations for live video broadcasting.

## Minimal Example

Create a basic MediaLive Multiplex with required settings and a single destination.

```ts
import AWS from "alchemy/aws/control";

const multiplex = await AWS.MediaLive.Multiplex("myMultiplex", {
  name: "MyFirstMultiplex",
  availabilityZones: ["us-east-1a", "us-east-1b"],
  multiplexSettings: {
    transportStream: {
      segmentationMode: "useSegmentDuration",
      segmentDuration: 10,
      outputScteMarkers: "none"
    }
  },
  destinations: [{
    id: "destination1",
    settings: {
      destinationRefId: "myDestinationRef"
    }
  }]
});
```

## Advanced Configuration

Configure a Multiplex with additional tags and multiple destinations for complex broadcasting needs.

```ts
const advancedMultiplex = await AWS.MediaLive.Multiplex("advancedMultiplex", {
  name: "AdvancedMultiplex",
  availabilityZones: ["us-west-2a", "us-west-2b"],
  multiplexSettings: {
    transportStream: {
      segmentationMode: "useInputSegmentation",
      segmentDuration: 5,
      outputScteMarkers: "passthrough"
    }
  },
  destinations: [
    {
      id: "destination1",
      settings: {
        destinationRefId: "destinationRef1"
      }
    },
    {
      id: "destination2",
      settings: {
        destinationRefId: "destinationRef2"
      }
    }
  ],
  tags: [
    {
      key: "Environment",
      value: "Production"
    },
    {
      key: "Owner",
      value: "TeamA"
    }
  ]
});
```

## Complex Use Case with Multiple Outputs

Create a Multiplex that outputs to multiple destinations with different configurations.

```ts
const complexMultiplex = await AWS.MediaLive.Multiplex("complexMultiplex", {
  name: "ComplexMultiplex",
  availabilityZones: ["us-east-1a", "us-east-1b"],
  multiplexSettings: {
    transportStream: {
      segmentationMode: "useSegmentDuration",
      segmentDuration: 5,
      outputScteMarkers: "none"
    }
  },
  destinations: [
    {
      id: "primaryDestination",
      settings: {
        destinationRefId: "primaryOutput"
      }
    },
    {
      id: "secondaryDestination",
      settings: {
        destinationRefId: "secondaryOutput"
      }
    }
  ],
  tags: [
    {
      key: "Project",
      value: "LiveStreaming"
    }
  ]
});
```
