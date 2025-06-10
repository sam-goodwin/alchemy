---
title: IPSet
description: Learn how to create, update, and manage AWS WAF IPSets using Alchemy Cloud Control.
---


The IPSet resource lets you manage [AWS WAF IPSets](https://docs.aws.amazon.com/waf/latest/userguide/) for controlling access to your web applications based on IP addresses.

## Minimal Example

Create a basic IPSet with a name and a couple of IPSetDescriptors.

```ts
import AWS from "alchemy/aws/control";

const basicIPSet = await AWS.WAF.IPSet("basicIPSet", {
  name: "BasicIPSet",
  IPSetDescriptors: [
    { Type: "IPV4", Value: "192.0.2.0/24" },
    { Type: "IPV4", Value: "203.0.113.0/24" }
  ]
});
```

## Advanced Configuration

Configure an IPSet with multiple types of IP addresses including IPv6.

```ts
const advancedIPSet = await AWS.WAF.IPSet("advancedIPSet", {
  name: "AdvancedIPSet",
  IPSetDescriptors: [
    { Type: "IPV4", Value: "198.51.100.0/24" },
    { Type: "IPV6", Value: "2001:db8::/32" }
  ],
  adopt: true // Adopt existing resource if it already exists
});
```

## Integration with Web ACL

Create an IPSet and integrate it with a Web ACL to block traffic from specific IP addresses.

```ts
import AWS from "alchemy/aws/control";

const ipSetForWebACL = await AWS.WAF.IPSet("ipSetForWebACL", {
  name: "WebACLBlockIPSet",
  IPSetDescriptors: [
    { Type: "IPV4", Value: "10.0.0.0/8" },
    { Type: "IPV4", Value: "172.16.0.0/12" }
  ]
});

const webACL = await AWS.WAF.WebACL("webACL", {
  name: "MyWebACL",
  defaultAction: { Type: "ALLOW" },
  rules: [
    {
      Name: "BlockBadIPs",
      Priority: 1,
      Action: { Type: "BLOCK" },
      RuleId: ipSetForWebACL.id,
      VisibilityConfig: {
        SampledRequestsEnabled: true,
        CloudWatchMetricsEnabled: true,
        MetricName: "BlockBadIPsMetric"
      }
    }
  ]
});
``` 

This example demonstrates how to create an IPSet and associate it with a Web ACL that blocks traffic from specific IP ranges.
