---
title: Managing AWS NetworkManager SiteToSiteVpnAttachments with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager SiteToSiteVpnAttachments using Alchemy Cloud Control.
---

# SiteToSiteVpnAttachment

The SiteToSiteVpnAttachment resource lets you create and manage [AWS NetworkManager SiteToSiteVpnAttachments](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-sitetositevpnattachment.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const sitetositevpnattachment = await AWS.NetworkManager.SiteToSiteVpnAttachment(
  "sitetositevpnattachment-example",
  {
    CoreNetworkId: "example-corenetworkid",
    VpnConnectionArn: "example-vpnconnectionarn",
    Tags: { Environment: "production", ManagedBy: "Alchemy" },
  }
);
```

## Advanced Configuration

Create a sitetositevpnattachment with additional configuration:

```ts
import AWS from "alchemy/aws/control";

const advancedSiteToSiteVpnAttachment = await AWS.NetworkManager.SiteToSiteVpnAttachment(
  "advanced-sitetositevpnattachment",
  {
    CoreNetworkId: "example-corenetworkid",
    VpnConnectionArn: "example-vpnconnectionarn",
    Tags: {
      Environment: "production",
      Team: "DevOps",
      Project: "MyApp",
      CostCenter: "Engineering",
      ManagedBy: "Alchemy",
    },
  }
);
```

