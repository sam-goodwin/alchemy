---
title: Managing AWS EC2 DHCPOptionss with Alchemy
description: Learn how to create, update, and manage AWS EC2 DHCPOptionss using Alchemy Cloud Control.
---

# DHCPOptions

The DHCPOptions resource lets you manage [AWS EC2 DHCPOptions](https://docs.aws.amazon.com/ec2/latest/userguide/) for configuring DHCP settings in your virtual private cloud (VPC).

## Minimal Example

Create a basic DHCPOptions resource with required properties and some common optional settings.

```ts
import AWS from "alchemy/aws/control";

const basicDhcpOptions = await AWS.EC2.DHCPOptions("BasicDhcpOptions", {
  DomainName: "example.com",
  DomainNameServers: ["8.8.8.8", "8.8.4.4"],
  NtpServers: ["169.254.169.123"],
  Tags: [
    { Key: "Environment", Value: "Development" },
    { Key: "Project", Value: "WebApp" }
  ]
});
```

## Advanced Configuration

Configure a DHCPOptions resource with advanced settings such as NetBIOS and IPv6 lease time.

```ts
const advancedDhcpOptions = await AWS.EC2.DHCPOptions("AdvancedDhcpOptions", {
  DomainName: "advanced-example.com",
  DomainNameServers: ["8.8.8.8", "8.8.4.4"],
  NetbiosNameServers: ["192.168.1.1"],
  NetbiosNodeType: 8,
  NtpServers: ["169.254.169.123"],
  Ipv6AddressPreferredLeaseTime: 600, // Lease time in seconds
  Tags: [
    { Key: "Environment", Value: "Production" },
    { Key: "Team", Value: "Networking" }
  ]
});
```

## Adoption of Existing DHCP Options

If you want to adopt existing DHCPOptions instead of creating a new one, set the adopt property to true.

```ts
const adoptedDhcpOptions = await AWS.EC2.DHCPOptions("AdoptedDhcpOptions", {
  DomainName: "existing-domain.com",
  DomainNameServers: ["8.8.8.8"],
  adopt: true // This will adopt an existing resource
});
```

## Use Case for Custom NTP Servers

This example demonstrates how to create DHCPOptions with custom NTP servers to synchronize time across instances.

```ts
const customNtpDhcpOptions = await AWS.EC2.DHCPOptions("CustomNtpDhcpOptions", {
  DomainName: "custom-time-example.com",
  NtpServers: ["time.google.com", "time.windows.com"],
  Tags: [
    { Key: "UseCase", Value: "Time Synchronization" },
    { Key: "Environment", Value: "Testing" }
  ]
});
```