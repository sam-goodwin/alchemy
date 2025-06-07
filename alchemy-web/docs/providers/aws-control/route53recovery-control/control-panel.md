---
title: Managing AWS Route53RecoveryControl ControlPanels with Alchemy
description: Learn how to create, update, and manage AWS Route53RecoveryControl ControlPanels using Alchemy Cloud Control.
---

# ControlPanel

The ControlPanel resource lets you manage [AWS Route53RecoveryControl ControlPanels](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) for controlling the routing of traffic in a multi-region setup.

## Minimal Example

Create a basic ControlPanel with required properties and some optional tags.

```ts
import AWS from "alchemy/aws/control";

const BasicControlPanel = await AWS.Route53RecoveryControl.ControlPanel("BasicControlPanel", {
  Name: "PrimaryControlPanel",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster-id",
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```

## Advanced Configuration

Configure a ControlPanel with an adoption strategy in case the resource already exists.

```ts
const AdvancedControlPanel = await AWS.Route53RecoveryControl.ControlPanel("AdvancedControlPanel", {
  Name: "FallbackControlPanel",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster-id",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "QA" }
  ]
});
```

## Monitoring and Management

Retrieve the ARN and creation time of the ControlPanel for monitoring purposes.

```ts
const ControlPanelDetails = await AWS.Route53RecoveryControl.ControlPanel("ControlPanelDetails", {
  Name: "MonitoringControlPanel",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster-id"
});

// Log the details for monitoring
console.log(`Control Panel ARN: ${ControlPanelDetails.Arn}`);
console.log(`Created At: ${ControlPanelDetails.CreationTime}`);
```

## Tagging for Resource Organization

Create a ControlPanel with specific tags to help organize resources within your AWS account.

```ts
const TaggedControlPanel = await AWS.Route53RecoveryControl.ControlPanel("TaggedControlPanel", {
  Name: "TaggedControlPanel",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster/my-cluster-id",
  Tags: [
    { Key: "Project", Value: "DisasterRecovery" },
    { Key: "Owner", Value: "JohnDoe" },
    { Key: "CostCenter", Value: "CC1001" }
  ]
});
```