---
title: Managing AWS WAF IPSets with Alchemy
description: Learn how to create, update, and manage AWS WAF IPSets using Alchemy Cloud Control.
---

# IPSet

The IPSet resource allows you to manage [AWS WAF IPSets](https://docs.aws.amazon.com/waf/latest/userguide/) which are used to specify IP addresses that are allowed or blocked from accessing your web applications.

## Minimal Example

Create a basic IPSet with a name and a list of IPSet descriptors.

```ts
import AWS from "alchemy/aws/control";

const BasicIPSet = await AWS.WAF.IPSet("BasicIPSet", {
  Name: "BasicIPSet",
  IPSetDescriptors: [
    {
      Type: "IPV4",
      Value: "192.0.2.0/24"
    },
    {
      Type: "IPV6",
      Value: "2001:db8::/32"
    }
  ]
});
```

## Advanced Configuration

Configure an IPSet with additional descriptors to classify both IPv4 and IPv6 addresses.

```ts
const AdvancedIPSet = await AWS.WAF.IPSet("AdvancedIPSet", {
  Name: "AdvancedIPSet",
  IPSetDescriptors: [
    {
      Type: "IPV4",
      Value: "198.51.100.0/24"
    },
    {
      Type: "IPV4",
      Value: "203.0.113.0/24"
    },
    {
      Type: "IPV6",
      Value: "2001:db8:abcd:0012::/64"
    }
  ],
  adopt: true // This allows adopting an existing resource if it already exists
});
```

## Use Case: Blocking Malicious IPs

Create an IPSet specifically to block known malicious IP addresses.

```ts
const BlockMaliciousIPs = await AWS.WAF.IPSet("BlockMaliciousIPs", {
  Name: "BlockMaliciousIPs",
  IPSetDescriptors: [
    {
      Type: "IPV4",
      Value: "192.0.2.100"
    },
    {
      Type: "IPV4",
      Value: "203.0.113.50"
    }
  ]
});
```

## Use Case: Allowing Specific IP Ranges

Create an IPSet that allows traffic from a specific range of trusted IP addresses.

```ts
const AllowTrustedIPs = await AWS.WAF.IPSet("AllowTrustedIPs", {
  Name: "AllowTrustedIPs",
  IPSetDescriptors: [
    {
      Type: "IPV4",
      Value: "10.0.0.0/8" // Allow all IPs in the 10.0.0.0/8 range
    },
    {
      Type: "IPV6",
      Value: "fd00::/8" // Allow all IPs in the fd00::/8 range
    }
  ]
});
```