---
title: Managing AWS EC2 PrefixLists with Alchemy
description: Learn how to create, update, and manage AWS EC2 PrefixLists using Alchemy Cloud Control.
---

# PrefixList

The PrefixList resource lets you manage [AWS EC2 PrefixLists](https://docs.aws.amazon.com/ec2/latest/userguide/) which are used to group CIDR blocks for easier security group and route table management.

## Minimal Example

Create a basic PrefixList with required properties and a common optional property for tagging.

```ts
import AWS from "alchemy/aws/control";

const simplePrefixList = await AWS.EC2.PrefixList("SimplePrefixList", {
  PrefixListName: "MyPrefixList",
  AddressFamily: "IPv4",
  MaxEntries: 10,
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Advanced Configuration

Configure a PrefixList with specific entries and a larger maximum number of entries.

```ts
import AWS from "alchemy/aws/control";

const advancedPrefixList = await AWS.EC2.PrefixList("AdvancedPrefixList", {
  PrefixListName: "AdvancedPrefixList",
  AddressFamily: "IPv4",
  MaxEntries: 50,
  Entries: [
    { Cidr: "192.168.1.0/24" },
    { Cidr: "10.0.0.0/16" },
    { Cidr: "172.16.0.0/12" }
  ],
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Security" }
  ]
});
```

## Using Entries for Security Groups

Create a PrefixList specifically for use in security groups to simplify ingress and egress rules.

```ts
import AWS from "alchemy/aws/control";

const securityGroupPrefixList = await AWS.EC2.PrefixList("SecurityGroupPrefixList", {
  PrefixListName: "WebServers",
  AddressFamily: "IPv4",
  MaxEntries: 5,
  Entries: [
    { Cidr: "203.0.113.0/24" }, // Example public IP range for web servers
    { Cidr: "198.51.100.0/24" }  // Example public IP range for application servers
  ],
  Tags: [
    { Key: "Environment", Value: "Staging" },
    { Key: "Team", Value: "WebOps" }
  ]
});
```