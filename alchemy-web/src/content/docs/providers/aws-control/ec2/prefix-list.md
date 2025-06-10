---
title: PrefixList
description: Learn how to create, update, and manage AWS EC2 PrefixLists using Alchemy Cloud Control.
---


The PrefixList resource allows you to manage [AWS EC2 PrefixLists](https://docs.aws.amazon.com/ec2/latest/userguide/) that are used to specify a list of IP address ranges. This is useful for simplifying security group and route table configurations.

## Minimal Example

Create a basic PrefixList with required properties and a common optional property.

```ts
import AWS from "alchemy/aws/control";

const prefixList = await AWS.EC2.PrefixList("myPrefixList", {
  PrefixListName: "MyPrefixList",
  AddressFamily: "IPv4",
  MaxEntries: 100
});
```

## Advanced Configuration

Configure a PrefixList with entries and tags for better organization.

```ts
const advancedPrefixList = await AWS.EC2.PrefixList("advancedPrefixList", {
  PrefixListName: "AdvancedPrefixList",
  AddressFamily: "IPv4",
  MaxEntries: 50,
  Entries: [
    {
      Cidr: "10.0.0.0/24",
      Description: "Office Network"
    },
    {
      Cidr: "192.168.1.0/24",
      Description: "Home Network"
    }
  ],
  Tags: [
    {
      Key: "Environment",
      Value: "Development"
    },
    {
      Key: "Project",
      Value: "Alpha"
    }
  ]
});
```

## Example with Multiple CIDR Blocks

Create a PrefixList that includes multiple CIDR blocks for different environments.

```ts
const multiCidrPrefixList = await AWS.EC2.PrefixList("multiCidrPrefixList", {
  PrefixListName: "MultiCIDRPrefixList",
  AddressFamily: "IPv4",
  Entries: [
    {
      Cidr: "172.16.0.0/16",
      Description: "Corporate Network"
    },
    {
      Cidr: "10.1.1.0/24",
      Description: "Testing Network"
    }
  ]
});
```

## Adoption of Existing Resource

If you want to adopt an existing PrefixList instead of creating a new one, you can set the `adopt` property to true.

```ts
const adoptExistingPrefixList = await AWS.EC2.PrefixList("existingPrefixList", {
  PrefixListName: "ExistingPrefixList",
  AddressFamily: "IPv4",
  adopt: true
});
```
