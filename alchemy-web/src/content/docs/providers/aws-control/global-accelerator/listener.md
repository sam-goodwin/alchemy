---
title: Listener
description: Learn how to create, update, and manage AWS GlobalAccelerator Listeners using Alchemy Cloud Control.
---


The Listener resource lets you manage [AWS GlobalAccelerator Listeners](https://docs.aws.amazon.com/globalaccelerator/latest/userguide/) that route incoming traffic to your application endpoints based on specific protocols and port ranges.

## Minimal Example

Create a basic GlobalAccelerator listener with required properties:

```ts
import AWS from "alchemy/aws/control";

const basicListener = await AWS.GlobalAccelerator.Listener("basic-listener", {
  PortRanges: [{ FromPort: 80, ToPort: 80 }],
  AcceleratorArn: "arn:aws:globalaccelerator::123456789012:accelerator/abcd1234-efgh-5678-ijkl-9012mnop3456",
  Protocol: "TCP"
});
```

## Advanced Configuration

Configure a listener with additional options such as client affinity:

```ts
const advancedListener = await AWS.GlobalAccelerator.Listener("advanced-listener", {
  PortRanges: [{ FromPort: 443, ToPort: 443 }],
  AcceleratorArn: "arn:aws:globalaccelerator::123456789012:accelerator/abcd1234-efgh-5678-ijkl-9012mnop3456",
  Protocol: "TCP",
  ClientAffinity: "SOURCE_IP" // Enables source IP affinity for the listener
});
```

## Multiple Port Ranges

Set up a listener that handles multiple port ranges for different services:

```ts
const multiPortListener = await AWS.GlobalAccelerator.Listener("multi-port-listener", {
  PortRanges: [
    { FromPort: 80, ToPort: 80 },
    { FromPort: 443, ToPort: 443 }
  ],
  AcceleratorArn: "arn:aws:globalaccelerator::123456789012:accelerator/abcd1234-efgh-5678-ijkl-9012mnop3456",
  Protocol: "TCP"
});
```

## Listener with Adoption

Create a listener that adopts an existing resource instead of failing:

```ts
const adoptListener = await AWS.GlobalAccelerator.Listener("adopt-listener", {
  PortRanges: [{ FromPort: 8080, ToPort: 8080 }],
  AcceleratorArn: "arn:aws:globalaccelerator::123456789012:accelerator/abcd1234-efgh-5678-ijkl-9012mnop3456",
  Protocol: "TCP",
  adopt: true // Use this to adopt an existing listener if it exists
});
```
