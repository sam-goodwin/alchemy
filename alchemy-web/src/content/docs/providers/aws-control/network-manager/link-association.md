---
title: LinkAssociation
description: Learn how to create, update, and manage AWS NetworkManager LinkAssociations using Alchemy Cloud Control.
---


The LinkAssociation resource lets you manage [AWS NetworkManager LinkAssociations](https://docs.aws.amazon.com/networkmanager/latest/userguide/) for linking devices and links in your global network.

## Minimal Example

This example demonstrates creating a basic LinkAssociation with required properties.

```ts
import AWS from "alchemy/aws/control";

const linkAssociation = await AWS.NetworkManager.LinkAssociation("linkAssociation1", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  DeviceId: "device-12345678",
  LinkId: "link-abcdef01"
});
```

## Advanced Configuration

In this example, we adopt an existing LinkAssociation if it already exists, showcasing the optional `adopt` property.

```ts
const linkAssociationWithAdopt = await AWS.NetworkManager.LinkAssociation("linkAssociation2", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  DeviceId: "device-23456789",
  LinkId: "link-fedcba10",
  adopt: true
});
```

## Updating LinkAssociation

This example illustrates how to update an existing LinkAssociation by providing the same `id` and new properties.

```ts
const updatedLinkAssociation = await AWS.NetworkManager.LinkAssociation("linkAssociation1", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  DeviceId: "device-12345678",
  LinkId: "link-98765432" // Updating to a new LinkId
});
```

## Retrieving LinkAssociation Details

This example shows how to retrieve details of an existing LinkAssociation, including its ARN and timestamps.

```ts
const linkAssociationDetails = await AWS.NetworkManager.LinkAssociation("linkAssociation1", {
  GlobalNetworkId: "gn-0123456789abcdef0",
  DeviceId: "device-12345678",
  LinkId: "link-abcdef01"
});

// Accessing additional properties
console.log("ARN:", linkAssociationDetails.Arn);
console.log("Created At:", linkAssociationDetails.CreationTime);
console.log("Last Updated At:", linkAssociationDetails.LastUpdateTime);
```
