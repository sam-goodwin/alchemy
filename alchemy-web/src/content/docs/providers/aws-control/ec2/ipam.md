---
title: IPAM
description: Learn how to create, update, and manage AWS EC2 IPAMs using Alchemy Cloud Control.
---


The IPAM (IP Address Manager) resource allows you to manage your IP address allocations and configurations within AWS EC2. For more details, refer to the [AWS EC2 IPAMs documentation](https://docs.aws.amazon.com/ec2/latest/userguide/).

## Minimal Example

Create a basic IPAM resource with required properties and a description.

```ts
import AWS from "alchemy/aws/control";

const simpleIpam = await AWS.EC2.IPAM("simpleIpam", {
  Description: "Basic IPAM for managing IP addresses",
  Tier: "standard",
  EnablePrivateGua: true
});
```

## Advanced Configuration

Configure an IPAM with additional options such as operating regions and tags.

```ts
const advancedIpam = await AWS.EC2.IPAM("advancedIpam", {
  Description: "Advanced IPAM for multi-region management",
  Tier: "standard",
  EnablePrivateGua: true,
  OperatingRegions: [{
    RegionName: "us-west-1"
  }, {
    RegionName: "us-east-1"
  }],
  Tags: [{
    Key: "Project",
    Value: "Networking"
  }, {
    Key: "Environment",
    Value: "Production"
  }]
});
```

## Resource Discovery Exclusions

Create an IPAM with specific exclusions for resource discovery within organizational units.

```ts
const ipamWithExclusions = await AWS.EC2.IPAM("ipamWithExclusions", {
  Description: "IPAM with organizational unit exclusions",
  Tier: "standard",
  EnablePrivateGua: true,
  DefaultResourceDiscoveryOrganizationalUnitExclusions: [{
    OrganizationalUnitId: "ou-12345678"
  }]
});
```

## Adoption of Existing Resources

Initialize an IPAM that adopts existing resources instead of failing if a resource already exists.

```ts
const adoptedIpam = await AWS.EC2.IPAM("adoptedIpam", {
  Description: "IPAM that adopts existing resources",
  Tier: "standard",
  EnablePrivateGua: true,
  adopt: true
});
```
