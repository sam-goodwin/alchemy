---
title: DHCPOptions
description: Learn how to create, update, and manage AWS EC2 DHCPOptions using Alchemy Cloud Control.
---


The DHCPOptions resource allows you to manage [AWS EC2 DHCPOptions](https://docs.aws.amazon.com/ec2/latest/userguide/) for configuring DHCP settings in your VPC.

## Minimal Example

Create a basic DHCPOptions resource with essential properties such as domain name and DNS servers.

```ts
import AWS from "alchemy/aws/control";

const dhcpOptions = await AWS.EC2.DHCPOptions("basicDhcpOptions", {
  DomainName: "example.local",
  DomainNameServers: ["192.168.1.1", "192.168.1.2"],
  Tags: [
    { Key: "Environment", Value: "Development" }
  ]
});
```

## Advanced Configuration

Configure a DHCPOptions resource with additional settings, including NTP servers and NetBIOS options.

```ts
const advancedDhcpOptions = await AWS.EC2.DHCPOptions("advancedDhcpOptions", {
  DomainName: "example.local",
  DomainNameServers: ["192.168.1.1", "192.168.1.2"],
  NtpServers: ["ntp.example.local"],
  NetbiosNameServers: ["192.168.1.3"],
  NetbiosNodeType: 8,
  Ipv6AddressPreferredLeaseTime: 300,
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Department", Value: "IT" }
  ]
});
```

## Custom DHCP Options

Demonstrate how to create a DHCPOptions resource with custom NetBIOS settings.

```ts
const customNetbiosDhcpOptions = await AWS.EC2.DHCPOptions("customNetbiosDhcpOptions", {
  DomainName: "custom.local",
  DomainNameServers: ["10.0.0.1"],
  NetbiosNameServers: ["10.0.0.2"],
  NetbiosNodeType: 4,
  Tags: [
    { Key: "Project", Value: "Migration" }
  ]
});
```

## Adoption of Existing DHCP Options

Show how to adopt existing DHCPOptions instead of creating a new one.

```ts
const adoptExistingDhcpOptions = await AWS.EC2.DHCPOptions("existingDhcpOptions", {
  DomainName: "existing.local",
  DomainNameServers: ["10.0.1.1"],
  adopt: true
});
```
