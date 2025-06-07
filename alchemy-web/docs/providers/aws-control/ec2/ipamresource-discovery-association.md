---
title: Managing AWS EC2 IPAMResourceDiscoveryAssociations with Alchemy
description: Learn how to create, update, and manage AWS EC2 IPAMResourceDiscoveryAssociations using Alchemy Cloud Control.
---

# IPAMResourceDiscoveryAssociation

The IPAMResourceDiscoveryAssociation resource allows you to manage associations between an IPAM resource discovery and the IPAM itself in AWS. This is useful for organizing and managing IP addresses across your cloud resources. For more information, visit the [AWS EC2 IPAMResourceDiscoveryAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic IPAM resource discovery association with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const IpamResourceDiscoveryAssociation = await AWS.EC2.IPAMResourceDiscoveryAssociation("MyIpamResourceDiscoveryAssociation", {
  IpamId: "ipam-12345678",
  IpamResourceDiscoveryId: "discovery-87654321",
  Tags: [
    { Key: "Environment", Value: "production" }
  ]
});
```

## Advanced Configuration

Create an IPAM resource discovery association and adopt an existing resource if it already exists.

```ts
const AdvancedIpamResourceDiscoveryAssociation = await AWS.EC2.IPAMResourceDiscoveryAssociation("AdvancedIpamResourceDiscoveryAssociation", {
  IpamId: "ipam-12345678",
  IpamResourceDiscoveryId: "discovery-87654321",
  adopt: true,
  Tags: [
    { Key: "Project", Value: "NetworkOverhaul" },
    { Key: "Owner", Value: "TeamA" }
  ]
});
```

## Additional Use Case: Multiple Tags

Create an IPAM resource discovery association with multiple tags for better resource management.

```ts
const TaggedIpamResourceDiscoveryAssociation = await AWS.EC2.IPAMResourceDiscoveryAssociation("TaggedIpamResourceDiscoveryAssociation", {
  IpamId: "ipam-12345678",
  IpamResourceDiscoveryId: "discovery-87654321",
  Tags: [
    { Key: "Application", Value: "WebApp" },
    { Key: "Environment", Value: "staging" },
    { Key: "Team", Value: "DevOps" }
  ]
});
```