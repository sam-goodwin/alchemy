---
title: Listener
description: Learn how to create, update, and manage AWS VpcLattice Listeners using Alchemy Cloud Control.
---


The Listener resource lets you manage [AWS VpcLattice Listeners](https://docs.aws.amazon.com/vpclattice/latest/userguide/) that serve as entry points for traffic routing in your application. 

## Minimal Example

Create a basic VpcLattice Listener with required properties and one optional property.

```ts
import AWS from "alchemy/aws/control";

const basicListener = await AWS.VpcLattice.Listener("basicListener", {
  DefaultAction: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/my-target-group"
  },
  Port: 80,
  Protocol: "HTTP"
});
```

## Advanced Configuration

Configure a listener with additional options, such as tags and a specific service identifier.

```ts
const advancedListener = await AWS.VpcLattice.Listener("advancedListener", {
  DefaultAction: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/my-advanced-target-group"
  },
  Port: 443,
  Protocol: "HTTPS",
  ServiceIdentifier: "my-service",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    },
    {
      Key: "Project",
      Value: "WebApp"
    }
  ]
});
```

## Custom Listener for Multiple Protocols

Create a listener that supports multiple protocols by defining different default actions.

```ts
const multiProtocolListener = await AWS.VpcLattice.Listener("multiProtocolListener", {
  DefaultAction: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/my-multi-protocol-target-group"
  },
  Port: 8080,
  Protocol: "HTTP",
  Tags: [
    {
      Key: "Type",
      Value: "Multi-Protocol"
    }
  ]
});

// Add another listener for a different protocol
const httpsListener = await AWS.VpcLattice.Listener("httpsListener", {
  DefaultAction: {
    Type: "forward",
    TargetGroupArn: "arn:aws:vpclattice:us-west-2:123456789012:targetgroup/my-https-target-group"
  },
  Port: 8443,
  Protocol: "HTTPS",
  Tags: [
    {
      Key: "Type",
      Value: "Secure"
    }
  ]
});
```
