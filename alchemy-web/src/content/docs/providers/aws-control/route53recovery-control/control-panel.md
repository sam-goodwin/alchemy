---
title: ControlPanel
description: Learn how to create, update, and manage AWS Route53RecoveryControl ControlPanels using Alchemy Cloud Control.
---


The ControlPanel resource allows you to create and manage [AWS Route53RecoveryControl ControlPanels](https://docs.aws.amazon.com/route53recoverycontrol/latest/userguide/) for controlling the failover and recovery of your applications across multiple AWS accounts and regions.

## Minimal Example

Create a basic ControlPanel with required properties and an optional tag.

```ts
import AWS from "alchemy/aws/control";

const basicControlPanel = await AWS.Route53RecoveryControl.ControlPanel("basicControlPanel", {
  Name: "PrimaryControlPanel",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster:example-cluster",
  Tags: [{ Key: "Environment", Value: "Production" }]
});
```

## Advanced Configuration

Configure a ControlPanel with a name and tags, while adopting an existing resource if it already exists.

```ts
const advancedControlPanel = await AWS.Route53RecoveryControl.ControlPanel("advancedControlPanel", {
  Name: "SecondaryControlPanel",
  ClusterArn: "arn:aws:route53-recovery-control::123456789012:cluster:example-cluster",
  Tags: [{ Key: "Environment", Value: "Staging" }],
  adopt: true
});
```

## ControlPanel without Cluster

Create a ControlPanel without specifying a ClusterArn, indicating it will not be associated with any existing cluster.

```ts
const standaloneControlPanel = await AWS.Route53RecoveryControl.ControlPanel("standaloneControlPanel", {
  Name: "StandaloneControlPanel"
});
```

## Updating a ControlPanel

An example of how to update the name of an existing ControlPanel.

```ts
const updatedControlPanel = await AWS.Route53RecoveryControl.ControlPanel("updatedControlPanel", {
  Name: "UpdatedControlPanelName"
});
```

## Deleting a ControlPanel

Illustrate how to delete a ControlPanel when it is no longer needed.

```ts
const deleteControlPanel = await AWS.Route53RecoveryControl.ControlPanel("deleteControlPanel", {
  Name: "ToBeDeletedControlPanel",
  delete: true // Indicates that the ControlPanel should be deleted on --destroy
});
```
