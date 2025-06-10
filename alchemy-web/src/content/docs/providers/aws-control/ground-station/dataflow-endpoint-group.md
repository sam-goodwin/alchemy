---
title: DataflowEndpointGroup
description: Learn how to create, update, and manage AWS GroundStation DataflowEndpointGroups using Alchemy Cloud Control.
---


The DataflowEndpointGroup resource lets you manage [AWS GroundStation Dataflow Endpoint Groups](https://docs.aws.amazon.com/groundstation/latest/userguide/) which define the data flow configuration for satellite communications.

## Minimal Example

Create a basic Dataflow Endpoint Group with required properties and commonly used optional settings.

```ts
import AWS from "alchemy/aws/control";

const dataflowEndpointGroup = await AWS.GroundStation.DataflowEndpointGroup("myDataflowEndpointGroup", {
  EndpointDetails: [
    {
      // Specify the details of the endpoint here
      EndpointArn: "arn:aws:groundstation:us-west-2:123456789012:endpoint/my-endpoint",
      // Further required properties for the endpoint can be added
    }
  ],
  ContactPrePassDurationSeconds: 30,
  ContactPostPassDurationSeconds: 60
});
```

## Advanced Configuration

Configure a Dataflow Endpoint Group with tags for better organization and management.

```ts
const advancedDataflowEndpointGroup = await AWS.GroundStation.DataflowEndpointGroup("advancedDataflowGroup", {
  EndpointDetails: [
    {
      // Specify the details of the endpoint here
      EndpointArn: "arn:aws:groundstation:us-west-2:123456789012:endpoint/another-endpoint",
      // Further required properties for the endpoint can be added
    }
  ],
  ContactPrePassDurationSeconds: 15,
  ContactPostPassDurationSeconds: 45,
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    },
    {
      Key: "Project",
      Value: "SatelliteCommunication"
    }
  ]
});
```

## Adoption of Existing Resource

Create a Dataflow Endpoint Group that adopts an existing resource if it already exists.

```ts
const adoptExistingDataflowGroup = await AWS.GroundStation.DataflowEndpointGroup("existingDataflowGroup", {
  EndpointDetails: [
    {
      // Specify the details of the endpoint here
      EndpointArn: "arn:aws:groundstation:us-west-2:123456789012:endpoint/existing-endpoint",
    }
  ],
  adopt: true
});
```
