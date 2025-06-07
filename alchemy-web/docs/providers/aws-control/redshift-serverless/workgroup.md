---
title: Managing AWS RedshiftServerless Workgroups with Alchemy
description: Learn how to create, update, and manage AWS RedshiftServerless Workgroups using Alchemy Cloud Control.
---

# Workgroup

The Workgroup resource lets you manage [AWS RedshiftServerless Workgroups](https://docs.aws.amazon.com/redshiftserverless/latest/userguide/) and their configurations, enabling you to easily scale and manage your data workloads.

## Minimal Example

Create a basic RedshiftServerless Workgroup with required properties and a few common optional settings.

```ts
import AWS from "alchemy/aws/control";

const BasicWorkgroup = await AWS.RedshiftServerless.Workgroup("MyBasicWorkgroup", {
  WorkgroupName: "MyWorkgroup",
  Port: 5439,
  BaseCapacity: 2,
  EnhancedVpcRouting: true,
  Tags: [
    { Key: "Environment", Value: "development" },
    { Key: "Owner", Value: "data-team" }
  ]
});
```

## Advanced Configuration

Configure a Workgroup with additional parameters for more complex use cases, such as specifying security groups and subnets.

```ts
const AdvancedWorkgroup = await AWS.RedshiftServerless.Workgroup("MyAdvancedWorkgroup", {
  WorkgroupName: "AdvancedWorkgroup",
  Port: 5439,
  BaseCapacity: 4,
  SecurityGroupIds: ["sg-0123456789abcdef0"],
  SubnetIds: ["subnet-0123456789abcdef0", "subnet-0987654321abcdef0"],
  EnhancedVpcRouting: true,
  Tags: [
    { Key: "Environment", Value: "production" },
    { Key: "Team", Value: "analytics" }
  ]
});
```

## Snapshot Configuration

Create a Workgroup that leverages snapshots for recovery and management.

```ts
const SnapshotWorkgroup = await AWS.RedshiftServerless.Workgroup("MySnapshotWorkgroup", {
  WorkgroupName: "SnapshotWorkgroup",
  SnapshotArn: "arn:aws:redshift-serverless:us-west-2:123456789012:snapshot:snapshot-name",
  SnapshotOwnerAccount: "123456789012",
  RecoveryPointId: "recovery-point-id",
  Tags: [
    { Key: "Environment", Value: "testing" },
    { Key: "Project", Value: "data-recovery" }
  ]
});
```

## Public Accessibility Configuration

Set up a Workgroup that is publicly accessible for external connections.

```ts
const PublicWorkgroup = await AWS.RedshiftServerless.Workgroup("MyPublicWorkgroup", {
  WorkgroupName: "PublicWorkgroup",
  Port: 5439,
  BaseCapacity: 2,
  PubliclyAccessible: true,
  SecurityGroupIds: ["sg-abcdef1234567890"],
  SubnetIds: ["subnet-abcdef1234567890"],
  Tags: [
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "dev" }
  ]
});
```