---
title: Managing AWS NetworkManager LinkAssociations with Alchemy
description: Learn how to create, update, and manage AWS NetworkManager LinkAssociations using Alchemy Cloud Control.
---

# LinkAssociation

The LinkAssociation resource lets you create and manage [AWS NetworkManager LinkAssociations](https://docs.aws.amazon.com/networkmanager/latest/userguide/) using AWS Cloud Control API.

http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-networkmanager-linkassociation.html

## Minimal Example

```ts
import AWS from "alchemy/aws/control";

const linkassociation = await AWS.NetworkManager.LinkAssociation("linkassociation-example", {
  GlobalNetworkId: "example-globalnetworkid",
  DeviceId: "example-deviceid",
  LinkId: "example-linkid",
});
```

