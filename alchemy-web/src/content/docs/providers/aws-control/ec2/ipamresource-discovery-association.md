---
title: IPAMResourceDiscoveryAssociation
description: Learn how to create, update, and manage AWS EC2 IPAMResourceDiscoveryAssociations using Alchemy Cloud Control.
---


The IPAMResourceDiscoveryAssociation resource allows you to associate an IPAM (IP Address Manager) resource discovery with your AWS EC2 resources. This resource is important for managing IP addresses across your AWS account. For more detailed information, refer to the [AWS EC2 IPAMResourceDiscoveryAssociations documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic IPAM resource discovery association using required properties and a common optional tag.

```ts
import AWS from "alchemy/aws/control";

const ipamAssociation = await AWS.EC2.IPAMResourceDiscoveryAssociation("basicIpamAssociation", {
  IpamId: "ipam-12345678",
  IpamResourceDiscoveryId: "discovery-12345678",
  Tags: [{
    Key: "Environment",
    Value: "Development"
  }]
});
```

## Advanced Configuration

Configure an IPAM resource discovery association to adopt existing resources if they already exist.

```ts
const advancedIpamAssociation = await AWS.EC2.IPAMResourceDiscoveryAssociation("advancedIpamAssociation", {
  IpamId: "ipam-87654321",
  IpamResourceDiscoveryId: "discovery-87654321",
  adopt: true,
  Tags: [{
    Key: "Project",
    Value: "Migration"
  }]
});
```

## Specific Use Case: Multiple Tags

Create an IPAM resource discovery association with multiple tags for better resource management and organization.

```ts
const taggedIpamAssociation = await AWS.EC2.IPAMResourceDiscoveryAssociation("taggedIpamAssociation", {
  IpamId: "ipam-abcdef12",
  IpamResourceDiscoveryId: "discovery-abcdef12",
  Tags: [
    {
      Key: "Owner",
      Value: "TeamA"
    },
    {
      Key: "CostCenter",
      Value: "CC123"
    }
  ]
});
```
