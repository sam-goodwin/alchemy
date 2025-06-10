---
title: RoutingControl
description: Learn how to create, update, and manage AWS Route53RecoveryControl RoutingControls using Alchemy Cloud Control.
---


The RoutingControl resource allows you to manage [AWS Route53RecoveryControl RoutingControls](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) for controlling traffic routing across multiple endpoints.

## Minimal Example

Create a basic RoutingControl with required properties and an optional ClusterArn.

```ts
import AWS from "alchemy/aws/control";

const routingControl = await AWS.Route53RecoveryControl.RoutingControl("primaryRoutingControl", {
  Name: "PrimaryRoutingControl",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster",
  ControlPanelArn: "arn:aws:route53-recovery-control::123456789012:controlpanel/my-controlpanel",
  adopt: true // Adopt existing resource if it already exists
});
```

## Advanced Configuration

Configure a RoutingControl with detailed properties including control panel settings.

```ts
const advancedRoutingControl = await AWS.Route53RecoveryControl.RoutingControl("advancedRoutingControl", {
  Name: "AdvancedRoutingControl",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster",
  ControlPanelArn: "arn:aws:route53-recovery-control::123456789012:controlpanel/my-controlpanel",
  adopt: false // Do not adopt existing resources
});
```

## Usage in Multi-Endpoint Configuration

Demonstrate using multiple RoutingControls as part of a resilient architecture.

```ts
const primaryRoutingControl = await AWS.Route53RecoveryControl.RoutingControl("primaryRoutingControl", {
  Name: "PrimaryRoutingControl",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster",
  ControlPanelArn: "arn:aws:route53-recovery-control::123456789012:controlpanel/my-controlpanel"
});

const secondaryRoutingControl = await AWS.Route53RecoveryControl.RoutingControl("secondaryRoutingControl", {
  Name: "SecondaryRoutingControl",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster",
  ControlPanelArn: "arn:aws:route53-recovery-control::123456789012:controlpanel/my-controlpanel"
});
```

This setup allows you to control traffic routing seamlessly, switching between different routing controls based on your application's needs.
