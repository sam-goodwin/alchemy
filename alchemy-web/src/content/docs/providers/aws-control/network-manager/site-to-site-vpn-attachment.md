---
title: SiteToSiteVpnAttachment
description: Learn how to create, update, and manage AWS NetworkManager SiteToSiteVpnAttachments using Alchemy Cloud Control.
---


The SiteToSiteVpnAttachment resource allows you to manage AWS NetworkManager Site-to-Site VPN attachments, enabling secure communication between your on-premises networks and AWS. For more details, refer to the [AWS NetworkManager SiteToSiteVpnAttachments documentation](https://docs.aws.amazon.com/networkmanager/latest/userguide/).

## Minimal Example

Create a basic Site-to-Site VPN attachment with required properties and one optional tag.

```ts
import AWS from "alchemy/aws/control";

const vpnAttachment = await AWS.NetworkManager.SiteToSiteVpnAttachment("vpnAttachment", {
  CoreNetworkId: "cn-0123456789abcdef0",
  VpnConnectionArn: "arn:aws:ec2:us-west-2:123456789012:vpn-connection/vpn-0123456789abcdef0",
  Tags: [
    {
      Key: "Environment",
      Value: "Production"
    }
  ]
});
```

## Advanced Configuration

Configure a Site-to-Site VPN attachment with proposed segment changes and a network function group name.

```ts
const advancedVpnAttachment = await AWS.NetworkManager.SiteToSiteVpnAttachment("advancedVpnAttachment", {
  CoreNetworkId: "cn-0123456789abcdef0",
  VpnConnectionArn: "arn:aws:ec2:us-west-2:123456789012:vpn-connection/vpn-0123456789abcdef0",
  ProposedSegmentChange: {
    SegmentName: "Segment1",
    NewSegmentName: "Segment2"
  },
  NetworkFunctionGroupName: "NetworkFunctionGroupA"
});
```

## Adoption of Existing Resource

Demonstrate how to adopt an existing Site-to-Site VPN attachment without failing if it already exists.

```ts
const adoptExistingVpnAttachment = await AWS.NetworkManager.SiteToSiteVpnAttachment("existingVpnAttachment", {
  CoreNetworkId: "cn-0123456789abcdef0",
  VpnConnectionArn: "arn:aws:ec2:us-west-2:123456789012:vpn-connection/vpn-0123456789abcdef0",
  adopt: true // Set to true to adopt an existing resource
});
```
