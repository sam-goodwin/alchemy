---
title: FlowOutput
description: Learn how to create, update, and manage AWS MediaConnect FlowOutputs using Alchemy Cloud Control.
---


The FlowOutput resource lets you manage [AWS MediaConnect FlowOutputs](https://docs.aws.amazon.com/mediaconnect/latest/userguide/) for delivering live video streams. This resource allows you to configure various output parameters such as destination, protocol, and encryption settings.

## Minimal Example

Create a basic FlowOutput with required properties and a common optional property:

```ts
import AWS from "alchemy/aws/control";

const basicFlowOutput = await AWS.MediaConnect.FlowOutput("basicFlowOutput", {
  FlowArn: "arn:aws:mediaconnect:us-west-2:123456789012:flow:example-flow",
  Protocol: "RTP",
  Destination: "192.0.2.0:5000", // Example destination for RTP stream
  Name: "MyBasicOutput"
});
```

## Advanced Configuration

Configure a FlowOutput with advanced options, including encryption and additional output settings:

```ts
const advancedFlowOutput = await AWS.MediaConnect.FlowOutput("advancedFlowOutput", {
  FlowArn: "arn:aws:mediaconnect:us-west-2:123456789012:flow:example-flow",
  Protocol: "RTP",
  Destination: "203.0.113.0:6000", // Advanced destination for RTP stream
  Encryption: {
    Algorithm: "aes128", // Example encryption algorithm
    RoleArn: "arn:aws:iam::123456789012:role/MediaConnectEncryptionRole",
    KeyType: "static-key",
    StaticKeyValue: "my-static-key-value" // Replace with your static key value
  },
  SmoothingLatency: 100, // Set smoothing latency to 100 ms
  Name: "MyAdvancedOutput"
});
```

## Using Media Stream Output Configurations

Create a FlowOutput with media stream output configurations for more complex use cases:

```ts
const mediaStreamOutputConfiguration = [{
  MediaStreamName: "videoStream",
  StreamId: "stream1",
  // Additional configurations can go here
}];

const mediaStreamFlowOutput = await AWS.MediaConnect.FlowOutput("mediaStreamFlowOutput", {
  FlowArn: "arn:aws:mediaconnect:us-west-2:123456789012:flow:example-flow",
  Protocol: "RTP-FEC",
  Destination: "198.51.100.0:7000", // Example destination for RTP-FEC
  MediaStreamOutputConfigurations: mediaStreamOutputConfiguration,
  Name: "MyMediaStreamOutput"
});
```

## Setting Up with VPC Interface Attachment

Configure a FlowOutput with a VPC Interface Attachment for secure network configuration:

```ts
const vpcInterfaceAttachment = {
  VpcInterfaceName: "MyVpcInterface",
  NetworkInterfaceId: "eni-abcdefgh", // Replace with your network interface ID
};

const vpcFlowOutput = await AWS.MediaConnect.FlowOutput("vpcFlowOutput", {
  FlowArn: "arn:aws:mediaconnect:us-west-2:123456789012:flow:example-flow",
  Protocol: "RTP",
  Destination: "192.0.2.0:8000", // Secure VPC destination
  VpcInterfaceAttachment: vpcInterfaceAttachment,
  Name: "MyVpcFlowOutput"
});
```
