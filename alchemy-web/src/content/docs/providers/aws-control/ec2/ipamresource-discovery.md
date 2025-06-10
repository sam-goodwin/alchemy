---
title: IPAMResourceDiscovery
description: Learn how to create, update, and manage AWS EC2 IPAMResourceDiscoverys using Alchemy Cloud Control.
---


The IPAMResourceDiscovery resource allows you to manage IP Address Management (IPAM) resource discovery settings in AWS EC2. For more information, refer to the [AWS EC2 IPAMResourceDiscoverys documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic IPAM resource discovery with a description and tags.

```ts
import AWS from "alchemy/aws/control";

const basicIpamResourceDiscovery = await AWS.EC2.IPAMResourceDiscovery("basicIpamDiscovery", {
  Description: "Basic IPAM Resource Discovery for managing IP allocations",
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "IPManagement" }
  ]
});
```

## Advanced Configuration

Configure an IPAM resource discovery with organizational unit exclusions and operating regions.

```ts
const advancedIpamResourceDiscovery = await AWS.EC2.IPAMResourceDiscovery("advancedIpamDiscovery", {
  Description: "Advanced IPAM Resource Discovery with exclusions",
  OrganizationalUnitExclusions: [
    { OrganizationalUnitId: "ou-12345678" },
    { OrganizationalUnitId: "ou-87654321" }
  ],
  OperatingRegions: [
    { RegionName: "us-west-2" },
    { RegionName: "us-east-1" }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" }
  ]
});
```

## Adoption of Existing Resources

Use the adopt option to allow the creation of a resource that already exists.

```ts
const adoptExistingResource = await AWS.EC2.IPAMResourceDiscovery("existingIpamDiscovery", {
  Description: "This resource adopts an existing IPAM Resource Discovery",
  adopt: true,
  Tags: [
    { Key: "Environment", Value: "Staging" }
  ]
});
```

## Multi-Region Configuration

Configure an IPAM resource discovery that spans multiple regions.

```ts
const multiRegionIpamResourceDiscovery = await AWS.EC2.IPAMResourceDiscovery("multiRegionIpamDiscovery", {
  Description: "Multi-region IPAM Resource Discovery",
  OperatingRegions: [
    { RegionName: "eu-west-1" },
    { RegionName: "ap-south-1" }
  ],
  Tags: [
    { Key: "Global", Value: "true" }
  ]
});
```
